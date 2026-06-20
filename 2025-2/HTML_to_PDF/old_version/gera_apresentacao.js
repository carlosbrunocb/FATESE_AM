const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Nome da pasta de entrada e do arquivo de saída
const inputDir = 'slides_html';
const outputHtml = 'apresentacao_completa.html';
const outputPdf = 'apresentacao.pdf';

(async () => {
    let browser;
    try {
        // Verifica se a pasta de entrada existe
        if (!fs.existsSync(inputDir)) {
            console.error(`Erro: O diretório '${inputDir}' não foi encontrado.`);
            console.error('Certifique-se de que a pasta foi criada pelo script anterior.');
            process.exit(1);
        }

        browser = await puppeteer.launch();
        const page = await browser.newPage();

        // 1. Lê todos os arquivos HTML da pasta e os ordena
        const htmlFiles = fs.readdirSync(inputDir)
            .filter(file => file.endsWith('.html'))
            .sort((a, b) => {
                const numA = parseInt(a.match(/\d+/)[0]);
                const numB = parseInt(b.match(/\d+/)[0]);
                return numA - numB;
            });

        let fullHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8"/>
    <title>Apresentação Unificada</title>
    ${fs.readFileSync(path.join(inputDir, htmlFiles[0]), 'utf8').split('</head>')[0].split('<head>')[1]}
    <style>
        .page-break {
            page-break-after: always;
        }
    </style>
</head>
<body>
    <div id="slides-container">`;

        console.log('Juntando o conteúdo dos slides...');

        // 2. Concatena o conteúdo de todos os slides e adiciona a quebra de página
        htmlFiles.forEach((file, index) => {
            const filePath = path.join(inputDir, file);
            const content = fs.readFileSync(filePath, 'utf8');

            // Extrai apenas o conteúdo do <body> (o .slide-container)
            const bodyContent = content.split('<body>')[1].split('</body>')[0];

            // Adiciona o conteúdo do slide com a quebra de página
            fullHtml += bodyContent;

            // Adiciona a div de quebra de página, exceto no último slide
            if (index < htmlFiles.length - 1) {
                fullHtml += `<div class="page-break"></div>`;
            }
        });

        fullHtml += `
    </div>
</body>
</html>`;

        // 3. Salva o arquivo HTML unificado
        fs.writeFileSync(outputHtml, fullHtml, 'utf8');
        console.log(`✅ Arquivo HTML unificado '${outputHtml}' salvo com sucesso!`);

        // 4. Define o HTML completo na página para gerar o PDF
        await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

        // 5. Define a largura da janela de visualização para 1280px
        await page.setViewport({ width: 1280, height: 1 });

        // 6. Gera o PDF
        console.log('Gerando PDF... Isso pode levar alguns segundos.');
        await page.pdf({
            path: outputPdf,
            width: '1280px',
            printBackground: true,
            displayHeaderFooter: false,
        });

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