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

            // 1. Carrega o conteúdo do HTML
            await page.setContent(content, { waitUntil: 'networkidle0' });

            // 2. INJETA CSS de impressão: Garante que as regras @media print sejam ativadas
            await page.addStyleTag({
                content: `
                    @media print {
                        .slide-container, .slide, .w-full.min-h-screen {
                            /* ESSENCIAL: impede a quebra interna */
                            page-break-inside: avoid !important;
                            /* Garante que o elemento ocupe a largura completa no modo de impressão */
                            width: 1280px !important; 
                            /* Altura será definida pelo PDF, mas largura é fixa */
                        }
                    }
                `
            });

            // 3. CÁLCULO DE ALTURA MAIS PRECISO
            // Usa o body ou o contêiner principal para capturar a altura total do conteúdo.
            // Usaremos o body pois ele se ajusta ao slide-container/slide
            const slideHeight = await page.evaluate(() => {
                // Calcula a altura da div do slide e adiciona margem de segurança (ex: 20px)
                const mainElement = document.querySelector('.slide-container') || document.querySelector('.slide') || document.querySelector('.w-full.min-h-screen');
                if (mainElement) {
                    // Retorna a altura real do elemento mais uma margem (padding) de segurança
                    return mainElement.scrollHeight + 20; 
                }
                // Retorna a altura do corpo como fallback
                return document.body.scrollHeight + 20; 
            });
            
            const tempPdfPath = path.join(tempDir, `${path.parse(file).name}.pdf`);

            // 4. GERAÇÃO DO PDF COM TAMANHO PERSONALIZADO
            await page.pdf({
                path: tempPdfPath,
                width: '1280px', // Largura fixa do seu slide
                height: `${slideHeight}px`, // ALTURA DINÂMICA
                printBackground: true,
                displayHeaderFooter: false,
                // Zero as margens da impressão para que o conteúdo preencha 100%
                margin: {
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                }
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