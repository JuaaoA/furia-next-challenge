using System;
using System.Net.NetworkInformation;
using System.Text.Json;
using furia_next_api.Infra;
using furia_next_api.Model;
using Swashbuckle.AspNetCore.SwaggerGen;
using static Org.BouncyCastle.Asn1.Cmp.Challenge;

namespace furia_next_api.Infra
{
	public static class DataManipulator
	{
        private static Random random = new Random();

        // Criar novos dados
        public static class Create
		{
			// Criar tokens
			public static Tokens Token(UserDbContext context, int user_id)
			{
				// Criar um token novo
				Tokens tk = new Tokens(GenerateNewTokenName(context, 20), user_id);

				// Retornar esse token para ser adicionado
				return tk;
			}

			// Gerar nome de token
			public static string GenerateNewTokenName(UserDbContext context, int size)
			{
                // Caracteres possíveis
                const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

				// Guardar string gerada
				string generated;

                // Loop
                while (true)
				{
					// Gerar uma sequência de caracteres
					generated = new string(Enumerable.Repeat(chars, size)
                    .Select(s => s[random.Next(s.Length)]).ToArray());

					// Verificar se esse token é unico
					if (context.Tokens.FirstOrDefault(tk => tk.nome == generated) == null)
					{
						// Parar loop
						break;
					}
                }

				// Retornar o token que foi gerado
				return generated;
            }
		}

		// Editar dados
		public static class Edit
		{

		}

		// Pegar dados
		public static class Get
		{
			// Pegar dados de usuário por token
			public static Users? GetUserByToken(UserDbContext context, string token)
			{
				// Guardar o usuário encontrado em uma variável
				Tokens? tk = context.Tokens.FirstOrDefault(tk => tk.nome == token);

				// Se não encontrou token
				if (tk == null)
				{
					throw new ArgumentNullException("Token não existe");
				}

				// Encontrar o usuário por id guardado no token
				Users? usr = context.Users.FirstOrDefault(usr => usr.id == tk.usuario);

				// Retornar usuário ou nulo caso não tenha encontrado
				return usr;
			}

			// Pegar as noticias por filtro
			public static List<Noticias>? GetNoticias(UserDbContext context, string? jogo_filter)
			{
				List<Noticias>? nt;
                // Caso não tenha filtro
                if (jogo_filter == null)
				{
					nt = context.Noticias.ToList();
				}
				else
				{
					nt = context.Noticias.Where(nt => nt.jogo == jogo_filter).ToList();
				}

				// retornar as noticias
				return nt;
			}
		}
	}
}

