using System;
using Microsoft.AspNetCore.Mvc;
using furia_next_api.Infra;
using furia_next_api.Model;

namespace furia_next_api.Controllers
{
	[ApiController]
	[Route("/furia/next/login")]
	public class TokenController : ControllerBase
	{
		// Contexto do banco de dados
		private UserDbContext _context;

		// Construtor
		public TokenController(UserDbContext context)
		{
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

		// Métodos
		[HttpGet]
		public IActionResult TryLogin(string username, string password)
		{
			// Verificar se existe algum usuário com esse nick e senha
			Users? usr = DataVerifier.User.UserExistsPassword(_context, username, password);

			// Verificar se não existe usuário
			if (usr == null)
			{
				// Reportar erro
				return StatusCode(400, "Usuário ou senha incorretos!");
			}

			// Se passou dessa parte, o usuário existe
			// Criar token com esse usuário
			Tokens newToken = DataManipulator.Create.Token(_context, usr.id);

			// Adicionar token para o banco de dados
			var tokenAdded = _context.Tokens.Add(newToken);

			// Salvar mudanças
			_context.SaveChanges();

			// Retornar o token
            return Ok(tokenAdded.Entity);
		}
	}
}

