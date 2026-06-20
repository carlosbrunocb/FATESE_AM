const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Lê o conteúdo do arquivo HTML
  const htmlContent = fs.readFileSync('slide_01.html', 'utf8');

  // Define o HTML da página
  await page.setContent(htmlContent);

  // Gera o PDF
  await page.pdf({
    path: 'output.pdf',
    format: 'A4',
    printBackground: true
  });

  await browser.close();
  console.log('PDF gerado com sucesso!');
})();