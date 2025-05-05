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
 
         // Mostrar dados do usuário no front
         DataToFront(data)
         
     })
 
     // Caso ocorreu outro erro
     .catch(error => {
         console.error('Erro:', error);
     });
});

function DataToFront(dados)
{
    // Mostrar nick do usuário
    document.getElementById("nome_usuario").innerText = `Olá ${dados.username}!`;

    // Mostrar email do usuario
    document.getElementById("email_usuario").innerText = `Email Cadastrado ${dados.email}`;

    // Mostrar jogo favorito
    document.getElementById("jogo_favorito").innerText = `Seu jogo favorito é ${dados.jogo_favorito}!`;
}

function VerificarSaida()
{
   // Apagar o token de usuário
   localStorage.setItem('token_name', null);
   localStorage.setItem('token_user', null);

   // Retornar usuário para o login
   window.location.href = "../login/login.html";
}