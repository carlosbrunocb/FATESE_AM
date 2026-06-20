// Espera o DOM carregar para anexar os eventos
document.addEventListener('DOMContentLoaded', () => {

    const resultsEl = document.getElementById('results');
    const API_URL = '/api/users'; // Caminho relativo da API

    // Função helper para exibir resultados
    const displayResults = (data, status = 200) => {
        const response = {
            status: status,
            data: data
        };
        resultsEl.textContent = JSON.stringify(response, null, 2);
        if (status >= 400) {
            resultsEl.style.borderColor = '#d9534f';
        } else {
            resultsEl.style.borderColor = '#5cb85c';
        }
    };

    // Função helper para tratar erros
    const handleError = async (response) => {
        const errorData = await response.json();
        displayResults(errorData, response.status);
    };

    // 1. GET All
    document.getElementById('btn-get-all').addEventListener('click', async () => {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error(res.statusText);
            const data = await res.json();
            displayResults(data, res.status);
        } catch (err) {
            displayResults({ success: false, message: err.message }, 500);
        }
    });

    // 2. GET by ID
    document.getElementById('btn-get-id').addEventListener('click', async () => {
        const id = document.getElementById('input-get-id').value;
        if (!id) {
            displayResults({ success: false, message: 'ID é obrigatório' }, 400);
            return;
        }
        try {
            const res = await fetch(`${API_URL}/${id}`);
            if (!res.ok) {
                handleError(res);
                return;
            }
            const data = await res.json();
            displayResults(data, res.status);
        } catch (err) {
            displayResults({ success: false, message: err.message }, 500);
        }
    });

    // 3. POST (Create)
    document.getElementById('btn-create').addEventListener('click', async () => {
        const name = document.getElementById('input-create-name').value;
        // 1. recupera o valor do campo de email
        const email = document.getElementById('input-create-email').value;

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    name: name, 
                    email: email 
                })
            });

            if (!res.ok) {
                // Se der erro (ex: 400 Bad Request), pegamos a mensagem do backend
                const errorData = await res.json();
                throw new Error(errorData.message || res.statusText);
            }
            
            const data = await res.json();
            displayResults(data, res.status);
            
            // Opcional: Limpar os campos após criar
            document.getElementById('input-create-name').value = '';
            document.getElementById('input-create-email').value = '';

        } catch (err) {
            displayResults({ success: false, message: err.message }, 400);
        }
    });

    // 4. PUT (Update) - (Vai falhar, como esperado)
    document.getElementById('btn-update').addEventListener('click', async () => {
        const id = document.getElementById('input-update-id').value;
        const name = document.getElementById('input-update-name').value;

        resultsEl.textContent = 'Aguardando implementação do back-end (PUT /api/users/:id)...';
        resultsEl.style.borderColor = '#f0ad4e';

        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name })
            });
            // O servidor responderá 404 Not Found, pois a rota não existe
            handleError(res);
        } catch (err) {
            displayResults({ success: false, message: err.message }, 500);
        }
    });

    // 5. DELETE - (Vai falhar, como esperado)
    document.getElementById('btn-delete').addEventListener('click', async () => {
        const id = document.getElementById('input-delete-id').value;

        resultsEl.textContent = 'Aguardando implementação do back-end (DELETE /api/users/:id)...';
        resultsEl.style.borderColor = '#f0ad4e';

        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            // O servidor responderá 404 Not Found, pois a rota não existe
            handleError(res);
        } catch (err) {
            displayResults({ success: false, message: err.message }, 500);
        }
    });

});