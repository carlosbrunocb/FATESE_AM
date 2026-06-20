//Classe que estende HTMLElement
class InfoCard extends HTMLElement {
    constructor() {
        super();

        // Cria Shadow DOM
        const shadow = this.attachShadow({ mode: 'open' });

        // Cria elementos
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'info-card');

        // Obtém atributos ou usa valores padrão
        const titulo = this.getAttribute('titulo') || 'Título';

        // Define conteúdo
        wrapper.innerHTML = `
        <h3>${titulo}</h3>
        <slot></slot>
      `;

        // Aplica estilo
        const style = document.createElement('style');
        style.textContent = `
      .info-card {
        padding: 16px;
        background: #f0f9ff;
        border: 2px solid #3b82f6;
        border-radius: 8px;
        font-family: sans-serif;
      }
      h3 {
        margin-top: 0;
        color: #1e40af;
      }
    `;

        // Anexa ao Shadow DOM
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }
}

//Registra o elemento personalizado
customElements.define('info-card', InfoCard);