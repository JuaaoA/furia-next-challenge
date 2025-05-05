using furia_next_api.Infra;
using furia_next_api.Model;
using Microsoft.AspNetCore.Mvc;

namespace furia_next_api.Controllers
{
    [ApiController]
    [Route("/furia/next/noticias/")]
    public class NoticiasController : ControllerBase
    {
        // Contexto do banco de dados
        private UserDbContext _context;

        // Construtor
        public NoticiasController(UserDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        // Métodos
        [HttpGet]
        public IActionResult Get(string? jogo_filtro, string token)
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

            // Pegar as notícias
            List<Noticias>? noticias = DataManipulator.Get.GetNoticias(_context, jogo_filtro);

            // Enviar
            return Ok(noticias);
        }
    }
}
