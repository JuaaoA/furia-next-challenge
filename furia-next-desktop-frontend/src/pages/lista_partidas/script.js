import data from '../../../appsettings.json' with { type: 'json' };
import { EncontrarFotoJogoPeloID } from '../script_foto_jogo_id/script_foto_jogo_id.js';

// Ao carregar
document.addEventListener('DOMContentLoaded', function() {

    // Pegar parâmetros do URL
    const params = new URLSearchParams(window.location.search);

    // Pegar o parâmetro do time
    const filtro_time = params.get("filtro_time");

    // Pegar parâmetro do jogo
    const filtro_jogo = params.get("filtro_jogo");

    // Criar string para completar os espaços no request
    var completar_string_link = ""

    // Caso filtro time não seja vazio
    if (filtro_time != null)
    {
        completar_string_link += `id_time=${filtro_time}&`;
    }
    if (filtro_jogo != null)
    {
        completar_string_link += `id_jogo=${filtro_jogo}`
    }

    // Pedir a api os detalhes das partidas
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
    fetch(link_completo_api + `/furia/next/pandascore/partidas/multiplas?${completar_string_link}&token=${token_stored}`)
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
    // Mudar nome do titulo
    document.getElementById("titulo_lista_partidas").innerText = "Lista de partidas"

    // Procurar container que guarda as partidas
    var match_container = document.getElementById("lista_partidas_container")

    // Para cada partida nos dados
    dados.forEach(partida => {
        // Criar um link
        const partidaDiv = document.createElement("a");

        // Esse link é um item da lista de partidas
        partidaDiv.classList.add("lista_partidas_item")

        // Alterar Href do link
        partidaDiv.href = `../detalhes_partida/detalhes_partida.html?id_partida=${partida['id']}`;

        // Verificar o status da partida para mostrar
        var status;
        switch (partida['status'])
        {
            case "not_started":
                status = "Aguardando início"
                break;
            
            case "finished":
                status = "Finalizada"
                break;
            
            default:
                status = partida['status']
                break;
        }

        // Definir quem ganhou a partida
        var primeiro_time;
        var segundo_time;
        
        // Se a partida terminou
        if (partida['status'] == "finished")
        {
            // Ver quem ganhou
            if (partida['winner']['name'] == partida['opponents'][0]['opponent']['name'])
            {
                var primeiro_time = "vitoria"
                var segundo_time = "derrota"
            }
            else if (partida['winner']['name'] == partida['opponents'][1]['opponent']['name']) 
            {
                var primeiro_time = "derrota"
                var segundo_time = "vitoria"
            }
        }

        // Adicionar info
        partidaDiv.innerHTML = `
            <div class="jogo_partida_item">
                <img class="icone_jogo_partida" src="${EncontrarFotoJogoPeloID(partida['videogame']['id'])}">

                <div class="nome_jogo_partida">${partida['videogame']['name']}</div>
            </div>

            <div class="times_partida_item">

                <div class="time_divisao">
                    <img class="time_icone" src="${partida['opponents'][0]['opponent']['image_url']}">

                    <div class="nome_time_item" id="${primeiro_time}">${partida['opponents'][0]['opponent']['name']}</div>
                </div>
                
                <div class="divisor_times">X</div>

                <div class="time_divisao">
                    <img class="time_icone" src="${partida['opponents'][1]['opponent']['image_url']}">

                    <div class="nome_time_item" id="${segundo_time}">${partida['opponents'][1]['opponent']['name']}</div>
                </div>
            </div>

            <div class="andamento_partida_item">
                <div>${status}</div>
            </div>
        `

        match_container.appendChild(partidaDiv)
    });
    
}