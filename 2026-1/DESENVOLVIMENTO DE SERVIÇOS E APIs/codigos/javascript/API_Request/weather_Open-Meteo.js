/**
 * Faz uma requisição para a API Open-Meteo para buscar dados de clima.
 * Esta função é para ser usada em ambientes Node.js (terminal).
 *
 * @param {string} latitude A latitude da localização.
 * @param {string} longitude A longitude da localização.
 * @returns {Promise<object | null>} Uma promessa que resolve com os dados do clima ou null em caso de erro.
 */
async function fetchWeather(latitude, longitude) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  try {
    console.log(`Fazendo requisição para: ${apiUrl}`);
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Erro HTTP! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Dados do clima recebidos com sucesso.');
    return data;
  } catch (error) {
    console.error('Falha ao buscar dados do clima:', error.message);
    return null;
  }
}

/**
 * Ponto de entrada do script. Lê os argumentos da linha de comando
 * e chama a função de busca de clima.
 */
async function main() {
  // O array process.argv contém os argumentos da linha de comando.
  // process.argv[0] é o caminho do Node.js, process.argv[1] é o caminho do arquivo.
  // Os argumentos reais começam no índice 2.
  const latitude = process.argv[2];
  const longitude = process.argv[3];

  if (!latitude || !longitude) {
    console.error('Uso: node terminal_weather.js <latitude> <longitude>');
    console.error('Exemplo: node terminal_weather.js 52.52 13.41');
    return;
  }

  const weatherData = await fetchWeather(latitude, longitude);

  if (weatherData) {
    console.log('\n--- Dados do Clima ---');
    console.log('Latitude:', weatherData.latitude);
    console.log('Longitude:', weatherData.longitude);
    console.log('Temperatura atual:', `${weatherData.current_weather.temperature}°C`);
    console.log('Velocidade do vento:', `${weatherData.current_weather.windspeed} km/h`);
    console.log('---');
  } else {
    console.log('Não foi possível obter os dados do clima.');
  }
}

// Executa a função principal.
main();