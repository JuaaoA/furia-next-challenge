import data from '../../../appsettings.json' with { type: 'json' };

// Ao carregar
document.addEventListener('DOMContentLoaded', function() {

    // Pegar parâmetros do URL
    const params = new URLSearchParams(window.location.search);

    // Pegar o parâmetro do time
    const jogo = params.get("jogo");

    // Pedir a api os detalhes do time
    // Pegar token armazenado
    const token_stored = localStorage.getItem('token_name');

    // Se não tiver token
    if (token_stored == null)
    {
        // Não continuar
        return;
    }

    // Completar o link
    var string_link = `token=${token_stored}&`;
    if (jogo != null)
    {
        string_link += `jogo_filtro=${jogo}`
    }

    // Fazer o link completo
    const link_completo_api = data['local-backend-server'] + data['local-backend-server-port']
    console.log(link_completo_api + `/furia/next/pandascore/time?${string_link}`)

    // Realizar uma requisição para a API para verificar se o usuário está logado
    fetch(link_completo_api + `/furia/next/noticias?${string_link}`)
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

// Pegar as notícias que foram trazidas do backend e usar no front
function DataToFront(dados)
{
    // Pegar container de noticias
    var noticias_container = document.getElementById("area_noticias");

    // Contador para impedir mais de 3 noticias dentro de uma pagina
    var contador = 0;
    // Para cada noticia
    dados.forEach(noticia => {
        // Parar caso contador exceda
        if (contador > 2)
            {
                // Parar
                return;
            }
    
        // Adicionar um ao contador
        contador += 1;

        // Criar uma div dos itens de noticia
        const noticiaDiv = document.createElement("div");

        // Essa div é um item das noticias
        noticiaDiv.classList.add("noticias_item");

        // Criar item de notícia
        noticiaDiv.innerHTML = `
            <img class="noticia_imagem" src="${noticia['link_imagem']}">

            <div class="noticia_titulo">${noticia['titulo']}</div>

            <div class="noticia_jogo">${noticia['jogo']}</div>
        `;

        // Trazer para dentro do container
        noticias_container.appendChild(noticiaDiv);
    });
}