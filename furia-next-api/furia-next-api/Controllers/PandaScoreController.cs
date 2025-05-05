using System;
using Microsoft.AspNetCore.Mvc;
using furia_next_api.Infra;
using furia_next_api.Model;
using static furia_next_api.Infra.DataVerifier;

namespace furia_next_api.Controllers
{
    [ApiController]
    [Route("/furia/next/pandascore/time")]
    public class PandaScoreController : ControllerBase
    {
        // Configurações JSON
        private readonly IConfiguration _configuration;

        // Cliente HTTP
        private readonly HttpClient _httpClient;

        // Contexto do banco de dados
        private UserDbContext _context;

        // Construtor
        public PandaScoreController(IConfiguration configuration, UserDbContext context, IHttpClientFactory httpClient)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _configuration = configuration;

            // Criar cliente http
            _httpClient = httpClient.CreateClient();
        }

        // Métodos
        [HttpGet]
        public async Task<IActionResult> GetTime(string time_id, string token)
        {
            // Verificar se esse token existe no banco de dados
            if (!DataVerifier.Token.Exists(_context, token)) return StatusCode(401, "Token não encontrado");

            // Se passou daqui, o token existe
            // Pegar o usuário
            Users? userFound = DataManipulator.Get.GetUserByToken(_context, token);

            // Caso não tenha encontrado o usuário
            if (userFound == null)
            {
                return StatusCode(401, "Usuário não encontrado com esse token");
            }

            // Iniciar Request
            var request = new HttpRequestMessage
            {
                // Indicar que é GET
                Method = HttpMethod.Get,

                // Link request Pandascore
                RequestUri = new Uri(GetLink() + $"/teams/{time_id}")
            };

            // Adicionar headers para autenticação
            request.Headers.Add("Accept", "application/json");
            request.Headers.Add("Authorization", $" Bearer {GetAPI()}");
            
            // Enviar o request e esperar a resposta
            var response = await _httpClient.SendAsync(request);

            // Caso deu errado
            if (!response.IsSuccessStatusCode)
            {
                // Retornar o erro que o pandascore trouxe
                return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());
            }

            // Ler como string
            var conteudo = await response.Content.ReadAsStringAsync();

            return Content(conteudo, "application/json");
        }

        // Método para pegar API do Pandascore
        private string GetAPI()
        {
            return _configuration["PandascoreApiKey"];
        }

        private string GetLink()
        {
            return _configuration["PandascoreLink"];
        }
    }

    [ApiController]
    [Route("/furia/next/pandascore/partidas/multiplas")]
    public class PandaScoreMatchController : ControllerBase
    {
        // Configurações JSON
        private readonly IConfiguration _configuration;

        // Cliente HTTP
        private readonly HttpClient _httpClient;

        // Contexto do banco de dados
        private UserDbContext _context;

        // Construtor
        public PandaScoreMatchController(IConfiguration configuration, UserDbContext context, IHttpClientFactory httpClient)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _configuration = configuration;

            // Criar cliente http
            _httpClient = httpClient.CreateClient();
        }

        // Métodos
        [HttpGet]
        public async Task<IActionResult> GetPartidasFiltro(string? id_time, string? id_jogo, string token)
        {
            // Verificar se esse token existe no banco de dados
            if (!DataVerifier.Token.Exists(_context, token)) return StatusCode(401, "Token não encontrado");

            // Se passou daqui, o token existe
            // Pegar o usuário
            Users? userFound = DataManipulator.Get.GetUserByToken(_context, token);

            // Caso não tenha encontrado o usuário
            if (userFound == null)
            {
                return StatusCode(401, "Usuário não encontrado com esse token");
            }

            // Definir o filtro
            string filterString = "";

            // Definir o que fazer de acordo com os filtros que chegar
            if (id_time != null)
            {
                filterString += $"filter[opponent_id]={id_time}&";
            }

            if (id_jogo != null)
            {
                filterString += $"filter[videogame]={id_jogo}";
            }


            // Iniciar Request
            var request = new HttpRequestMessage
            {
                // Indicar que é GET
                Method = HttpMethod.Get,

                // Link request Pandascore
                RequestUri = new Uri(GetLink() + $"/matches?{filterString}&page[size]=6")
            };

            // Adicionar headers para autenticação
            request.Headers.Add("Accept", "application/json");
            request.Headers.Add("Authorization", $" Bearer {GetAPI()}");

            // Enviar o request e esperar a resposta
            var response = await _httpClient.SendAsync(request);

            // Caso deu errado
            if (!response.IsSuccessStatusCode)
            {
                // Retornar o erro que o pandascore trouxe
                return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());
            }

            // Ler como string
            var conteudo = await response.Content.ReadAsStringAsync();

            return Content(conteudo, "application/json");
        }

        // Método para pegar API do Pandascore
        private string GetAPI()
        {
            return _configuration["PandascoreApiKey"];
        }

        private string GetLink()
        {
            return _configuration["PandascoreLink"];
        }
    }

    [ApiController]
    [Route("/furia/next/pandascore/partidas/unica")]
    public class PandaScoreMatchSingleController : ControllerBase
    {
        // Configurações JSON
        private readonly IConfiguration _configuration;

        // Cliente HTTP
        private readonly HttpClient _httpClient;

        // Contexto do banco de dados
        private UserDbContext _context;

        // Construtor
        public PandaScoreMatchSingleController(IConfiguration configuration, UserDbContext context, IHttpClientFactory httpClient)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _configuration = configuration;

            // Criar cliente http
            _httpClient = httpClient.CreateClient();
        }

        // Métodos
        [HttpGet]
        public async Task<IActionResult> GetPartida(string id_partida, string token)
        {
            // Verificar se esse token existe no banco de dados
            if (!DataVerifier.Token.Exists(_context, token)) return StatusCode(401, "Token não encontrado");

            // Se passou daqui, o token existe
            // Pegar o usuário
            Users? userFound = DataManipulator.Get.GetUserByToken(_context, token);

            // Caso não tenha encontrado o usuário
            if (userFound == null)
            {
                return StatusCode(401, "Usuário não encontrado com esse token");
            }

            // Iniciar Request
            var request = new HttpRequestMessage
            {
                // Indicar que é GET
                Method = HttpMethod.Get,

                // Link request Pandascore
                RequestUri = new Uri(GetLink() + $"/matches/{id_partida}")
            };

            // Adicionar headers para autenticação
            request.Headers.Add("Accept", "application/json");
            request.Headers.Add("Authorization", $" Bearer {GetAPI()}");

            // Enviar o request e esperar a resposta
            var response = await _httpClient.SendAsync(request);

            // Caso deu errado
            if (!response.IsSuccessStatusCode)
            {
                // Retornar o erro que o pandascore trouxe
                return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());
            }

            // Ler como string
            var conteudo = await response.Content.ReadAsStringAsync();

            return Content(conteudo, "application/json");
        }

        // Método para pegar API do Pandascore
        private string GetAPI()
        {
            return _configuration["PandascoreApiKey"];
        }

        private string GetLink()
        {
            return _configuration["PandascoreLink"];
        }
    }

    [ApiController]
    [Route("/furia/next/pandascore/jogador")]
    public class PandaScorePlayerController : ControllerBase
    {
        // Configurações JSON
        private readonly IConfiguration _configuration;

        // Cliente HTTP
        private readonly HttpClient _httpClient;

        // Contexto do banco de dados
        private UserDbContext _context;

        // Construtor
        public PandaScorePlayerController(IConfiguration configuration, UserDbContext context, IHttpClientFactory httpClient)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _configuration = configuration;

            // Criar cliente http
            _httpClient = httpClient.CreateClient();
        }

        // Métodos
        [HttpGet]
        public async Task<IActionResult> GetJogador(string jogador_id, string token)
        {
            // Verificar se esse token existe no banco de dados
            if (!DataVerifier.Token.Exists(_context, token)) return StatusCode(401, "Token não encontrado");

            // Se passou daqui, o token existe
            // Pegar o usuário
            Users? userFound = DataManipulator.Get.GetUserByToken(_context, token);

            // Caso não tenha encontrado o usuário
            if (userFound == null)
            {
                return StatusCode(401, "Usuário não encontrado com esse token");
            }

            // Iniciar Request
            var request = new HttpRequestMessage
            {
                // Indicar que é GET
                Method = HttpMethod.Get,

                // Link request Pandascore
                RequestUri = new Uri(GetLink() + $"/players/{jogador_id}")
            };

            // Adicionar headers para autenticação
            request.Headers.Add("Accept", "application/json");
            request.Headers.Add("Authorization", $" Bearer {GetAPI()}");

            // Enviar o request e esperar a resposta
            var response = await _httpClient.SendAsync(request);

            // Caso deu errado
            if (!response.IsSuccessStatusCode)
            {
                // Retornar o erro que o pandascore trouxe
                return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());
            }

            // Ler como string
            var conteudo = await response.Content.ReadAsStringAsync();

            return Content(conteudo, "application/json");
        }

        // Método para pegar API do Pandascore
        private string GetAPI()
        {
            return _configuration["PandascoreApiKey"];
        }

        private string GetLink()
        {
            return _configuration["PandascoreLink"];
        }
    }
}
