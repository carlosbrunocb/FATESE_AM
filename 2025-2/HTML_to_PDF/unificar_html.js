// Importa os módulos essenciais do Node.js.
// 'fs/promises' é a versão assíncrona do módulo fs.
import fs from 'fs/promises';
import path from 'path';
import process from 'process';

// --- Função principal assíncrona ---
async function unificarConteudoHTML() {
  // 1. Obtém o nome da pasta do terceiro argumento da linha de comando (process.argv[2]).
  const nomeDaPasta = process.argv[2];

  // Verifica se o usuário forneceu o nome da pasta.
  if (!nomeDaPasta) {
    console.error('Erro: Por favor, forneça o nome da pasta como argumento. Ex: node unificar_html.js "nome_da_pasta"');
    process.exit(1);
  }

  // Define os caminhos da pasta de entrada e do arquivo de saída.
  const caminhoDaPasta = path.join(process.cwd(), nomeDaPasta);
  const nomeDoArquivoSaida = 'conteudo_unificado.txt';
  const caminhoDoArquivoSaida = path.join(process.cwd(), nomeDoArquivoSaida);

  try {
    // 2. Lê todos os arquivos e pastas no diretório fornecido.
    const arquivosDoDiretorio = await fs.readdir(caminhoDaPasta);

    // 3. Filtra apenas os arquivos com a extensão .html.
    const arquivosHTML = arquivosDoDiretorio.filter(arquivo => 
      path.extname(arquivo).toLowerCase() === '.html'
    );

    // Verifica se há arquivos HTML para processar.
    if (arquivosHTML.length === 0) {
      console.warn(`Aviso: Nenhum arquivo .html encontrado na pasta "${nomeDaPasta}".`);
      return;
    }

    let conteudoTotal = '';

    // 4. Lê e concatena o conteúdo de cada arquivo HTML.
    for (const arquivo of arquivosHTML) {
      const caminhoCompletoDoArquivo = path.join(caminhoDaPasta, arquivo);
      const conteudoDoArquivo = await fs.readFile(caminhoCompletoDoArquivo, 'utf8');

      // Adiciona um separador claro entre os conteúdos de cada arquivo.
      conteudoTotal += `\n\n<!-- Conteúdo do Arquivo: ${arquivo} -->\n\n`;
      conteudoTotal += conteudoDoArquivo;
    }

    // 5. Salva todo o conteúdo em um novo arquivo .txt.
    await fs.writeFile(caminhoDoArquivoSaida, conteudoTotal);
    console.log(`Sucesso! O conteúdo de ${arquivosHTML.length} arquivos .html foi unificado em "${nomeDoArquivoSaida}".`);

  } catch (error) {
    // 6. Trata possíveis erros, como a pasta não existir.
    if (error.code === 'ENOENT') {
      console.error(`Erro: A pasta "${nomeDaPasta}" não foi encontrada. Verifique o caminho.`);
    } else {
      console.error('Ocorreu um erro inesperado:', error.message);
    }
  }
}

// Executa a função principal para iniciar o processo.
unificarConteudoHTML();