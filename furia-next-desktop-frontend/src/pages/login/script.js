import data from '../../../appsettings.json' with { type: 'json' };

// Ao carregar
document.addEventListener('DOMContentLoaded', function() {
    
    // Pegar token armazenado
    const token_stored = localStorage.getItem('token_name');
    const token_user_stored = localStorage.getItem('token_user');

    // Se não tiver token
    if (token_stored == null || token_user_stored == null)
    {
        // Não continuar
        return;
    }

    // Fazer o link completo
    const link_completo_api = data['local-backend-server'] + data['local-backend-server-port']

    // Realizar uma requisição para a API para verificar se o usuário está logado
    fetch(link_completo_api + `/furia/next/usuarios/token?token=${token_stored}`)
    .then(response => {
        // Se deu algum erro
        if (!response.ok) {
            throw new Error('Resposta com erro:' + response.body);
        }

        return response.json(); // Transformar resposta em JSON
    })

    // Se tudo deu certo
    .then(data => {
        console.log('Token recebido do servidor backend:', data);

        // Verificar se o ID do token é igual ao ID recebido
        if (token_user_stored == data.id)
        {
            // LOGIN FEITO COM SUCESSO
            // Ir para página inicial
            window.location.href = '../home/index.html';
        }
        else
        {
            // Se não (pode haver uma coincidencia enorme aqui que o token gerado foi o mesmo guardado)
            // Apagar token daqui
            localStorage.setItem('token_name', null)
            localStorage.setItem('token_user', null)
        }
    })

    // Caso ocorreu outro erro
    .catch(error => {
        console.error('Erro:', error);
    });
});


// Pegar o ID do formulário e ouvir o evento de enviar
document.getElementById('formLogin').addEventListener('submit', function(event) {
    // Evitar de enviar normalmente
    event.preventDefault();

    // Pegar os valores dos inputs
    const username_login = document.getElementById("username_field").value;
    const senha_login = document.getElementById("senha_field").value;

    // Fazer o link completo
    const link_completo_api = data['local-backend-server'] + data['local-backend-server-port']

    // Enviar a requisição para a API
    fetch(link_completo_api + `/furia/next/login?username=${username_login}&password=${senha_login}`)
    .then(async response => {
        // Se deu algum erro
        if (!response.ok) {

            // Reportar o erro
            const motivo = await response.text();
            ReportErrorFields(motivo);

            throw new Error('Resposta com erro:' + response.body);
        }

        return response.json(); // Transformar resposta em JSON
    })

    // Se tudo deu certo
    .then(data => {
        console.log('Token recebido do servidor backend:', data);

        // Guardar o dado do token
        localStorage.setItem('token_name', data.nome)
        localStorage.setItem('token_user', data.usuario)

        // Transportar usuário para a página inicial
        window.location.href = '../home/index.html';
    })

    // Caso ocorreu outro erro
    .catch(error => {
        console.error('Erro:', error);
    });
});

// Caso os inputs não estejam corretos, reportar ao usuário oque está acontecendo
function ReportErrorFields(erro)
{
    // Elemento erro
    var error = document.getElementById("reporte_erro");

    // Indicar o erro
    error.textContent = erro;

    error.style.display = "flex";

    // Mostrar o erro e Esperar um pouco
    setTimeout(() => {
        // Esconder o erro
        error.style.display = "none";
    }, 3000);
}

