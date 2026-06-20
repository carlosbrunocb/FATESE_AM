import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import PDFMerger from 'pdf-merger-js';

// Nome da pasta de entrada e do arquivo de saída
const inputDir = 'slides_html';
const tempDir = 'slides_temp_pdf'; // Diretório para PDFs temporários
const outputPdf = 'apresentacao.pdf';

(async () => {
    let browser;
    try {
        if (!fs.existsSync(inputDir)) {
            console.error(`Erro: O diretório '${inputDir}' não foi encontrado.`);
            console.error('Certifique-se de que a pasta foi criada pelo script anterior.');
            process.exit(1);
        }

        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        browser = await puppeteer.launch();
        
        const merger = new PDFMerger();

        const htmlFiles = fs.readdirSync(inputDir)
            .filter(file => file.endsWith('.html'))
            .sort((a, b) => {
                const numA = parseInt(a.match(/\d+/)[0]);
                const numB = parseInt(b.match(/\d+/)[0]);
                return numA - numB;
            });
        
        console.log('Gerando PDF para cada slide...');

        for (const file of htmlFiles) {
            const page = await browser.newPage();
            const filePath = path.join(inputDir, file);
            const content = fs.readFileSync(filePath, 'utf8');

            await page.setContent(content, { waitUntil: 'networkidle0' });

            // --- Lógica para lidar com os dois padrões de HTML ---
            let slideHeight;
            const newPattern = await page.$('.w-full.min-h-screen');

            if (newPattern) {
                // Se encontrar o novo padrão, usa-o para calcular a altura.
                slideHeight = await page.$eval('.w-full.min-h-screen', element => element.scrollHeight);
            } else {
                // Caso contrário, usa os seletores do padrão antigo.
                slideHeight = await page.$eval('.slide-container, .slide', element => element.scrollHeight);
            }
            
            const tempPdfPath = path.join(tempDir, `${path.parse(file).name}.pdf`);

            await page.pdf({
                path: tempPdfPath,
                width: '1280px',
                height: `${slideHeight}px`,
                printBackground: true,
                displayHeaderFooter: false,
            });

            await page.close();
            console.log(`✅ PDF temporário para '${file}' gerado.`);
            await merger.add(tempPdfPath);
        }

        console.log('\nUnificando PDFs...');
        await merger.save(outputPdf);

        console.log('Limpando arquivos temporários...');
        fs.readdirSync(tempDir).forEach(file => fs.unlinkSync(path.join(tempDir, file)));
        fs.rmdirSync(tempDir);

        console.log(`\n🎉 PDF '${outputPdf}' com ${htmlFiles.length} slides gerado com sucesso!`);

    } catch (error) {
        console.error(`Ocorreu um erro: ${error.message}`);
        process.exit(1);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
})();