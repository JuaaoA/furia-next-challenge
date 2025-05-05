using System;
using Microsoft.AspNetCore.Mvc;
using furia_next_api.Infra;
using furia_next_api.Model;

namespace furia_next_api.Controllers
{
	[ApiController]
	[Route("/furia/next/usuarios/")]
	public class UserController : ControllerBase
	{
		// Contexto do banco de dados
		private UserDbContext _context;

		// Construtor
		public UserController(UserDbContext context)
		{
			_context = context ?? throw new ArgumentNullException(nameof(context));
		}

		// Métodos
		[HttpPost]
		public IActionResult Add(Users user)
		{
			// Retirar espaços nos cantos
			user.email = user.email.Trim();
			user.username = user.username.Trim();
			user.jogo_favorito = user.jogo_favorito.Trim();

			// Verificar algumas coisas antes de continuar
			// Username
			if (!DataVerifier.User.IsUniqueUsername(_context, user.username)) return StatusCode(400, "Username já está cadastrado");

			// Email
			if (!DataVerifier.User.IsValidEmail(user.email)) return StatusCode(400, "Email invalido");
			if (!DataVerifier.User.IsUniqueEmail(_context, user.email)) return StatusCode(400, "Email já está cadastrado");

			// Senha
			if (!DataVerifier.User.IsValidPassword(user.senha)) return StatusCode(400, "Senha possui menos de 8 caracteres");

			// Adicionar novo usuário
			var users = _context.Users.Add(user);

			// Salvar mudanças
			_context.SaveChanges();

			// Enviar que está tudo certo
			return Ok(users.Entity);
		}
	}

	[ApiController]
	[Route("/furia/next/usuarios/token")]
	public class UserTokenController : ControllerBase
	{
        // Contexto do banco de dados
        private UserDbContext _context;

        // Construtor
        public UserTokenController(UserDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

		// Métodos
		[HttpGet]
		public IActionResult GetUserByToken(string token)
		{
			// Verificar se esse token existe no banco de dados
			if (!DataVerifier.Token.Exists(_context, token)) return StatusCode(400, "Token não encontrado");

			// Se passou daqui, o token existe
			// Pegar o usuário
			Users? userFound = DataManipulator.Get.GetUserByToken(_context, token);

			// Caso não tenha encontrado o usuário
			if (userFound == null)
			{
				return StatusCode(400, "Usuário não encontrado com esse token");
			}

			// Esconder senha
			userFound.senha = "hidden";

			// Retornar o usuário encontrado
			return Ok(userFound);
		}
    }
}

