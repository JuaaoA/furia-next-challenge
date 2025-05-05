import data from '../../../appsettings.json' with { type: 'json' };
import { EncontrarFotoJogoPeloID } from '../script_foto_jogo_id/script_foto_jogo_id.js';

// Ao carregar
document.addEventListener('DOMContentLoaded', function() {

    // Pegar parâmetros do URL
    const params = new URLSearchParams(window.location.search);

    // Pegar o parâmetro do time
    const time = params.get("time");

    // Pedir a api os detalhes do time
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
    fetch(link_completo_api + `/furia/next/pandascore/time?time_id=${time}&token=${token_stored}`)
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

// Pegar os dados e trazer para o frontend
function DataToFront(dados)
{
    // Definir o nome do time
    document.getElementById("nome_time").innerText = dados["name"];

    // Definir foto do time
    document.getElementById("foto_time").src = dados['image_url'];

    // Definir nacionalidade do time
    document.getElementById("nacao_time").innerText = `Nacionalidade: ${PaisParaEmoji(dados['location'])}`;

    // Colocar os dados dos jogadores do time
    var players_container = document.getElementById("jogadores_time_container");
    dados['players'].forEach(jogador => {
        // Criar uma div
        const jogadorDiv = document.createElement("div");
        
        // Adicionar a classe jogador a esta div
        jogadorDiv.classList.add("jogador");

        // Adicionar informações a essa div
        jogadorDiv.innerHTML = `<a class="jogador_nome_item" href="../detalhes_jogador/detalhes_jogador.html?jogador_id=${jogador['id']}">${PaisParaEmoji(jogador['nationality'])} ${jogador['name']}</a>`;

        // Definir essa div como filha do container que mostra todos os jogadores
        players_container.appendChild(jogadorDiv);
    });

    // Colocar os dados dos jogos que o time participa no cenário
    var games_container = document.getElementById("jogos_time_container");

    // Criar uma div
    const jogoDiv = document.createElement("div");

    // Adicionar a classe do jogo a esta div
    jogoDiv.classList.add("jogo");

    // Adicionar informações a essa div
    jogoDiv.innerHTML = `
        <img class="icone_jogo_time" src="${EncontrarFotoJogoPeloID(dados['current_videogame']['id'])}">

        <span>${dados['current_videogame']['name']}</span>
    `;

    // Definir essa div como filha do container dos jogos
    games_container.appendChild(jogoDiv);

}

// Transforma um codigo de país com 2 dígitos para um emoji do país
function PaisParaEmoji(nacionalidade) {
    const OFFSET = 127397; // regional indicator symbol offset
    return [...nacionalidade.toUpperCase()]
      .map(c => String.fromCodePoint(c.charCodeAt(0) + OFFSET))
      .join('');
  }