// weather_app.js

// URL base da API Open-Meteo
const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * Retorna as coordenadas de latitude e longitude do usuário.
 * @returns {Promise<{latitude: number, longitude: number}>} Uma Promise que resolve com as coordenadas.
 * @throws {Error} Lança um erro se a geolocalização não for suportada ou se o usuário negar a permissão.
 */
async function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        // Verifica se o navegador suporta a API de Geolocation
        if (!navigator.geolocation) {
            reject(new Error("Geolocation não é suportada pelo seu navegador."));
            return;
        }

        // Solicita a posição atual do usuário
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Sucesso na obtenção da localização
                const { latitude, longitude } = position.coords;
                resolve({ latitude, longitude });
            },
            (error) => {
                // Erro na obtenção da localização
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        reject(new Error("Permissão de localização negada pelo usuário."));
                        break;
                    case error.POSITION_UNAVAILABLE:
                        reject(new Error("Informação de localização não disponível."));
                        break;
                    case error.TIMEOUT:
                        reject(new Error("Tempo limite excedido ao tentar obter a localização."));
                        break;
                    default:
                        reject(new Error("Ocorreu um erro desconhecido ao obter a localização."));
                        break;
                }
            }
        );
    });
}

/**
 * Busca dados de previsão do tempo da API Open-Meteo usando as coordenadas do usuário.
 * @returns {Promise<any>} Uma Promise que resolve com os dados da previsão do tempo.
 * @throws {Error} Lança um erro se a requisição falhar.
 */
async function fetchWeatherData() {
    try {
        // Obtém as coordenadas do usuário
        const { latitude, longitude } = await getCurrentLocation();

        // Constrói a URL da requisição com as coordenadas
        const url = `${BASE_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&hourly=temperature_2m&current_weather=true`;

        // Faz a requisição à API
        const response = await fetch(url);

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        // Retorna os dados em formato JSON
        const data = await response.json();
        return data;
    } catch (error) {
        throw error; // Propaga o erro para quem chamar a função
    }
}

/**
 * Função principal para buscar e exibir os dados do tempo.
 */
async function getWeatherAndDisplay() {
    const resultDiv = document.getElementById('weather-info');
    const button = document.getElementById('get-weather-btn');
    const loading = document.getElementById('loading');

    // Limpa o conteúdo anterior
    resultDiv.innerHTML = '';
    // Mostra o spinner de carregamento
    loading.style.display = 'block';
    // Desabilita o botão para evitar cliques múltiplos
    button.disabled = true;

    try {
        const data = await fetchWeatherData();
        const { temperature, weathercode, windspeed, is_day } = data.current_weather;
        const latitude = data.latitude;
        const longitude = data.longitude;

        const weatherInfo = {
            temperature: temperature,
            weatherCode: weathercode,
            latitude: latitude,
            longitude: longitude
        };

        displayWeatherInfo(weatherInfo);

    } catch (error) {
        resultDiv.innerHTML = `<p class="error-message">Erro: ${error.message}</p>`;
    } finally {
        // Esconde o spinner de carregamento
        loading.style.display = 'none';
        // Habilita o botão
        button.disabled = false;
    }
}

/**
 * Exibe as informações do tempo na página.
 * @param {object} info - Objeto contendo as informações do tempo.
 */
function displayWeatherInfo(info) {
    const resultDiv = document.getElementById('weather-info');

    const weatherDescriptions = {
        0: { icon: '☀️', text: 'Céu limpo' },
        1: { icon: '🌤️', text: 'Principalmente céu limpo' },
        2: { icon: '⛅', text: 'Parcialmente nublado' },
        3: { icon: '☁️', text: 'Nublado' },
        45: { icon: '🌫️', text: 'Névoa' },
        48: { icon: '🌫️', text: 'Névoa de deposição de geada' },
        51: { icon: '💧', text: 'Chuvisco leve' },
        53: { icon: '💧', text: 'Chuvisco moderado' },
        55: { icon: '💧', text: 'Chuvisco denso' },
        56: { icon: '🥶💧', text: 'Chuvisco congelante leve' },
        57: { icon: '🥶💧', text: 'Chuvisco congelante denso' },
        61: { icon: '🌧️', text: 'Chuva leve' },
        63: { icon: '🌧️', text: 'Chuva moderada' },
        65: { icon: '🌧️', text: 'Chuva intensa' },
        66: { icon: '🥶🌧️', text: 'Chuva congelante leve' },
        67: { icon: '🥶🌧️', text: 'Chuva congelante intensa' },
        71: { icon: '🌨️', text: 'Queda de neve leve' },
        73: { icon: '🌨️', text: 'Queda de neve moderada' },
        75: { icon: '🌨️', text: 'Queda de neve intensa' },
        77: { icon: '❄️', text: 'Grãos de neve' },
        80: { icon: '🌦️', text: 'Pancadas de chuva leve' },
        81: { icon: '🌧️', text: 'Pancadas de chuva moderadas' },
        82: { icon: '⛈️', text: 'Pancadas de chuva violentas' },
        85: { icon: '🌨️', text: 'Pancadas de neve leves' },
        86: { icon: '🌨️', text: 'Pancadas de neve intensas' },
        95: { icon: '⛈️', text: 'Tempestade' },
        96: { icon: '⛈️', text: 'Tempestade com granizo leve' },
        99: { icon: '⛈️', text: 'Tempestade com granizo forte' },
    };

    const weatherDescription = weatherDescriptions[info.weatherCode] || { icon: '❓', text: 'Código de tempo desconhecido' };

    const htmlContent = `
    <div class="weather-result">
      <h2>${weatherDescription.icon} ${weatherDescription.text}</h2>
      <p class="temperature">${info.temperature}°C</p>
      <p class="location">Localização: Latitude ${info.latitude.toFixed(2)}, Longitude ${info.longitude.toFixed(2)}</p>
    </div>
  `;

    resultDiv.innerHTML = htmlContent;
}


