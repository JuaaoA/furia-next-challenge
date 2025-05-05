import data from '../../../appsettings.json' with { type: 'json' };
import { EncontrarFotoJogoPeloID } from '../script_foto_jogo_id/script_foto_jogo_id.js';

// Ao carregar
document.addEventListener('DOMContentLoaded', function() {

    // Pegar parâmetros do URL
    const params = new URLSearchParams(window.location.search);

    // Pegar o parâmetro do id da partida
    const id_partida = params.get("id_partida");

    // Pedir a api os detalhes do das partidas
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
    fetch(link_completo_api + `/furia/next/pandascore/partidas/unica?id_partida=${id_partida}&token=${token_stored}`)
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

// Trazer dados para o frontend
function DataToFront(dados)
{
    // Alterar titulo
    document.getElementById("titulo_detalhes_partida").innerHTML = "Detalhes da partida";

    // Procurar container dos times
    var times_container = document.getElementById("times_container");

    // Criar item para os times
    const timesDiv = document.createElement("div");

    // Adicionar classes
    timesDiv.classList.add("times_participantes");

    // Definir time vencedor
    var primeiro_time;
    var segundo_time;
        
    // Se a partida terminou
    if (dados['status'] == "finished")
    {
        // Ver quem ganhou
        if (dados['winner']['name'] == dados['opponents'][0]['opponent']['name'])
        {
            var primeiro_time = "vitoria"
            var segundo_time = "derrota"
        }
        else if (dados['winner']['name'] == dados['opponents'][1]['opponent']['name']) 
        {
            var primeiro_time = "derrota"
            var segundo_time = "vitoria"
        }
    }

    // Adicionar html
    timesDiv.innerHTML = `
        <a class="time_divisao" href="../detalhes_time/detalhes_time.html?time=${dados['opponents'][0]['opponent']['id']}">
            <img class="time_icone" src="${dados['opponents'][0]['opponent']['image_url']}">

            <div class="nome_time_item" id="${primeiro_time}">${dados['opponents'][0]['opponent']['name']}</div>
        </a>
                
        <div class="divisor_times">X</div>

        <a class="time_divisao" href="../detalhes_time/detalhes_time.html?time=${dados['opponents'][1]['opponent']['id']}">
            <img class="time_icone" src="${dados['opponents'][1]['opponent']['image_url']}">

            <div class="nome_time_item" id="${segundo_time}">${dados['opponents'][1]['opponent']['name']}</div>
        </a>
    `;
    
    // Definir como filha do container
    times_container.appendChild(timesDiv)

    // Trazer os deltalhes da partida
    var detalhes_container = document.getElementById("detalhes_partida_container");

    // Div com os detalhes
    var detalhesDiv = document.createElement("div");

    // Adicionar classes
    detalhesDiv.classList.add("detalhes_partida");

    // Ajustar data inicio da partida
    const data_inicio = new Date(dados['begin_at']);
    const dia = String(data_inicio.getDate()).padStart(2, '0');
    const mes = String(data_inicio.getMonth() + 1).padStart(2, '0');
    const ano = data_inicio.getFullYear();

    const horas = String(data_inicio.getHours()).padStart(2, '0');
    const minutos = String(data_inicio.getMinutes()).padStart(2, '0');

    // Adicionar html
    detalhesDiv.innerHTML = `
        <div class="detalhes_partida_jogo">
            <img class="detalhes_partida_jogo_imagem" src="${EncontrarFotoJogoPeloID(dados['videogame']['id'])}">

            <div class="detalhes_partida_jogo_nome">${dados['videogame']['name']}</div>
        </div>

        <div class="detalhes_partida">Inicio: ${dia}/${mes}/${ano} as ${horas}:${minutos}</div>
    `;

    // Adicionar ao container
    detalhes_container.appendChild(detalhesDiv);
}
