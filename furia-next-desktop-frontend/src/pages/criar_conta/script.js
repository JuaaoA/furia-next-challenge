import data from '../../../appsettings.json' with { type: 'json' };

// Pegar o ID do formulário e ouvir o evento de enviar
document.getElementById('form_criar_conta').addEventListener('submit', function(event) {
    // Evitar de enviar normalmente
    event.preventDefault();

    // Pegar os valores dos inputs
    const username_login = document.getElementById("username_field").value;
    const email_login = document.getElementById("email_field").value;
    const senha_login = document.getElementById("senha_field").value;
    const confirmar_senha_login = document.getElementById("confirmar_senha_field").value;

    // Verificar se os valores estão corretos
    if (!CheckInputFields(confirmar_senha_login, senha_login, email_login))
    {
        // Retornar impedindo de continuar para enviar para a api
        return;
    }

    // ENVIAR PARA A API
    // Fazer o link completo
    const link_completo_api = data['local-backend-server'] + data['local-backend-server-port']

    // Realizar uma requisição para a API para verificar se o usuário está logado
    fetch(link_completo_api + `/furia/next/usuarios`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            "username": `${username_login}`,
            "email": `${email_login}`,
            "senha": `${senha_login}`,
            "jogo_favorito": "cs"
        })
    })
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
        console.log('Resposta recebida do servidor backend:', data);

        // Ir para a página confirmando que a conta foi feita
        window.location.href = "../confirmacao_conta_criada/confirmacao_conta_criada.html";

    })

    // Caso ocorreu outro erro
    .catch(error => {
        console.error('Erro:', error);
    });
});

// Verificar se os inputs estão corretos
function CheckInputFields(confirmar_senha, senha, email)
{
    // Senha
    if (senha.length < 8)
    {
        // Reportar erro para o usuário
        ReportErrorFields("A senha precisa possuir pelo menos 8 caracteres!");

        // Retornar
        return false;
    }

    if (senha != confirmar_senha)
    {
        // Reportar erro para o usuário
        ReportErrorFields("Senhas não coincidem!");

        // Retornar
        return false;
    }

    // Email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Se o email não for valido
    if (!regex.test(email))
    {
        // Reportar erro para o usuário
        ReportErrorFields("Email não é valido!");

        // Retornar
        return false;
    }

    // Se deu tudo certo
    return true;
}

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