const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Pega o nome do arquivo HTML como o primeiro argumento da linha de comando
const htmlFileName = process.argv[2];

// Verifica se o nome do arquivo foi fornecido
if (!htmlFileName) {
  console.error('Erro: Você precisa fornecer o nome do arquivo HTML como argumento.');
  console.error('Exemplo de uso: node convert.js sua_pagina.html');
  process.exit(1); // Sai do script com um erro
}

// Cria o caminho completo para o arquivo HTML
const htmlFilePath = path.resolve(htmlFileName);

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Lê o conteúdo do arquivo HTML
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

    // Define o HTML da página
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Usa page.$eval para obter o estilo computado do elemento .slide-container
    // ... (código anterior)

    // Usa page.$eval para obter o estilo computado do elemento .slide-container
    const dimensions = await page.$eval('.slide-container', element => {
      const style = window.getComputedStyle(element);
      // Para a largura, pegamos do style.width
      // Para a altura, pegamos a altura real de rolagem do elemento,
      // que representa a altura necessária para o conteúdo completo.
      return {
        width: style.width,
        height: element.scrollHeight + 'px' // Pega a altura real do conteúdo
      };
    });

    // Converte os valores para números, removendo o "px"
    const width = parseInt(dimensions.width, 10);
    const height = parseInt(dimensions.height, 10); // Agora 'height' virá de scrollHeight

    // Define as dimensões da janela de visualização
    await page.setViewport({ width: width, height: height });

    // Define o nome do arquivo de saída
    const outputFileName = `${path.basename(htmlFileName, '.html')}.pdf`;

    // Gera o PDF com as dimensões obtidas
    await page.pdf({
      path: outputFileName,
      width: `${width}px`,
      height: `${height}px`,
      printBackground: true,
      pageRanges: '1'
    });

    await browser.close();
    console.log(`PDF "${outputFileName}" gerado com sucesso! Dimensões: ${width}x${height}`);

  } catch (error) {
    console.error(`Ocorreu um erro: ${error.message}`);
    process.exit(1);
  }
})();