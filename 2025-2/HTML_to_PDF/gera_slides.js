// const fs = require('fs');
// const path = require('path');
import fs from 'fs';
import path from 'path';

// Pega o nome do arquivo de entrada como o primeiro argumento da linha de comando
const inputFile = process.argv[2];

// Define o diretório de saída
const outputDir = 'slides_html';

// Verifica se o nome do arquivo foi fornecido
if (!inputFile) {
    console.error('Erro: Você precisa fornecer o nome do arquivo HTML como argumento.');
    console.error('Exemplo de uso: node gera_slides.js slides_html_code.txt');
    process.exit(1);
}

// Cria o diretório de saída se ele não existir
try {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        console.log(`Diretório '${outputDir}' criado com sucesso.`);
    }
} catch (error) {
    console.error(`Erro ao criar o diretório: ${error.message}`);
    process.exit(1);
}

// Caminho para o arquivo de entrada
const inputPath = path.resolve(inputFile);

try {
    // Lê o conteúdo do arquivo
    const content = fs.readFileSync(inputPath, 'utf8');

    // O separador entre os slides é a string "<!DOCTYPE html>"
    const slides = content.split('<!DOCTYPE html>').filter(Boolean);

    // Modifica e salva cada slide
    slides.forEach((slideContent, index) => {
        // Adiciona o DOCTYPE novamente
        let fullSlideHtml = `<!DOCTYPE html>${slideContent}`;

        // 1. Remove overflow: hidden do body e .slide-container
        fullSlideHtml = fullSlideHtml.replace(/overflow:\s*hidden;/g, '');

        // 2. Altera o min-height para auto no .slide-container
        fullSlideHtml = fullSlideHtml.replace(/min-height:\s*\d+px;/g, 'min-height: auto;');

        // Define o nome e o caminho do arquivo de saída dentro do novo diretório
        const outputFileName = `slide_${index + 1}.html`;
        const outputPath = path.join(outputDir, outputFileName);

        // Salva o arquivo modificado
        fs.writeFileSync(outputPath, fullSlideHtml, 'utf8');
        console.log(`✅ ${outputFileName} criado em '${outputDir}'.`);
    });

    console.log(`\n🎉 Processo concluído. ${slides.length} slides gerados.`);

} catch (error) {
    console.error(`Ocorreu um erro: ${error.message}`);
    process.exit(1);
}