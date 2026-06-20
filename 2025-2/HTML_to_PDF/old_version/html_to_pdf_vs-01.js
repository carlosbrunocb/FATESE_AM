const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Lê o conteúdo do arquivo HTML
  const htmlContent = fs.readFileSync('sua_pagina.html', 'utf8');

  // Define o HTML da página
  await page.setContent(htmlContent);

  // Usa page.$eval para obter o estilo computado do elemento .slide-container
  const dimensions = await page.$eval('.slide-container', element => {
    const style = window.getComputedStyle(element);
    return {
      width: style.width,
      height: style.minHeight
    };
  });

  // Converte os valores para números, removendo o "px"
  const width = parseInt(dimensions.width, 10);
  const height = parseInt(dimensions.height, 10);

  // Define as dimensões da janela de visualização
  await page.setViewport({ width: width, height: height });

  // Gera o PDF com as dimensões obtidas
  await page.pdf({
    path: 'slide_dinamico.pdf',
    width: `${width}px`,
    height: `${height}px`,
    printBackground: true,
    pageRanges: '1'
  });

  await browser.close();
  console.log(`PDF do slide gerado com sucesso! Dimensões: ${width}x${height}`);
})();