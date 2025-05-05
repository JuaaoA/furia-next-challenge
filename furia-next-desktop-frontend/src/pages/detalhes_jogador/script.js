import data from '../../../appsettings.json' with { type: 'json' };
import { EncontrarFotoJogoPeloID } from '../script_foto_jogo_id/script_foto_jogo_id.js';

// Ao carregar
document.addEventListener('DOMContentLoaded', function() {

    // Pegar parâmetros do URL
    const params = new URLSearchParams(window.location.search);

    // Pegar o parâmetro do jogador
    const jogador = params.get("jogador_id");

    // Pedir a api os detalhes do jogador
    // Pegar token armazenado
    const token_stored = localStorage.getItem('token_name');

    // Se não tiver token
    if (token_stored == null)
    {
        // Não continuar
        return;
    }

    // Fazer o link completo
    const link_completo_api = data['local-backend-server'] + data['local-backend-server-port']

    // Realizar uma requisição para a API para verificar se o usuário está logado
    fetch(link_completo_api + `/furia/next/pandascore/jogador?jogador_id=${jogador}&token=${token_stored}`)
    .then(response => {
        // Se deu algum erro
        if (!response.ok) {
            throw new Error('Resposta com erro:' + response.body);
        }

        return response.json(); // Transformar resposta em JSON
    })

    // Se tudo deu certo
    .then(data => {
        console.log('Time recebido do backend:', data);

        // Trazer dados para o frontend
        DataToFront(data);
    })

    // Caso ocorreu outro erro
    .catch(error => {
        console.error('Erro:', error);
    });
});

// Traz os dados do backend + pandascore e leva para o front
function DataToFront(dados)
{
    // Colocar o nick do jogador no título
    document.getElementById("nick_jogador_info").innerText = dados['name']

    // Adicionar foto do jogador
    const jogadorImg = document.getElementById("foto_jogador");
    if (dados['image_url'] != null)
    {
        // Definir a imagem do jogador aqui
        jogadorImg.src = dados['image_url']
    }

    // Definir a nacionalidade do jogador / e também o nome
    document.getElementById("nacao_jogador").innerHTML = `${PaisParaEmoji(dados['nationality'])} ${dados['first_name']} ${dados['last_name']}`

    // Colocar os dados do jogo que o jogador participa no cenário
    var game_container = document.getElementById("jogos_jogador_container");

    // Criar uma div
    const jogoDiv = document.createElement("div");
 
    // Adicionar a classe do jogo a esta div
    jogoDiv.classList.add("jogo");
 
    // Adicionar informações a essa div
    jogoDiv.innerHTML = `
        <img class="icone_jogo_jogador" src="${EncontrarFotoJogoPeloID(dados['current_videogame']['id'])}">
 
        <span>${dados['current_videogame']['name']}</span>
    `;
 
    // Definir essa div como filha do container do jogo
    game_container.appendChild(jogoDiv);

    // Colocar o time do jogador
    if (dados['current_team'] == null)
    {
        // Impedir de continuar caso o jogador não tenha time
        return;
    }

    // Caso tenha
    var team_container = document.getElementById("time_jogador_container");

    // Criar div do time
    const timeDiv = document.createElement("div");

    // Adicionar classe do time
    timeDiv.classList.add("time");

    // Adicionar botão do time atual
    timeDiv.innerHTML = `
        <a href="../detalhes_time/detalhes_time.html?time=${dados['current_team']['id']}" class="container_link_time">
            <img src="${dados['current_team']['image_url']}" class="imagem_time">

            <div class="nome_time_jogador">${dados['current_team']['name']}</div>
        </a>
    `

    //
    team_container.appendChild(timeDiv);

}

// Transforma um codigo de país com 2 dígitos para um emoji do país
function PaisParaEmoji(nacionalidade) {
    const OFFSET = 127397; // regional indicator symbol offset
    return [...nacionalidade.toUpperCase()]
      .map(c => String.fromCodePoint(c.charCodeAt(0) + OFFSET))
      .join('');
  }