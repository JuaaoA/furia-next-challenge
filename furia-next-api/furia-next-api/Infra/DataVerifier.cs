using System;
using furia_next_api.Infra;
using furia_next_api.Model;

namespace furia_next_api.Infra
{
	public static class DataVerifier
	{
		// USUARIO
		public static class User
		{
			// Verificar Email
			public static bool IsValidEmail(string email)
			{
                // Se termina em .
                if (email.EndsWith("."))
                {
                    return false;
                }

                try
                {
                    // Verifica se o endereço faz sentido como um email
                    var enderecar = new System.Net.Mail.MailAddress(email);
                    return enderecar.Address == email;
                }
                catch
                {
                    // Se não for, voltar como false
                    return false;
                }
            }

            public static bool IsUniqueEmail(UserDbContext context, string email)
            {
                // Se já existir esse email no banco de dados, não é unico
                if (context.Users.FirstOrDefault(usr => usr.email == email) != null) return false;

                // Caso contrário, é unico
                return true;
            }

            // Verificar nome de usuário
            public static bool IsUniqueUsername(UserDbContext context, string username)
            {
                // Se já existir esse usuário no banco de dados, não é unico
                if (context.Users.FirstOrDefault(usr => usr.username == username) != null) return false;

                // Caso contrário, é unico
                return true;
            }

            // Verificar senha
            public static bool IsValidPassword(string password)
            {
                // Verificar se a senha possui 8 caracteres ou mais
                if (password.Length < 8) return false;

                // Caso contrário, senha válida
                return true;
            }

            // Usuário existe com senha
            public static Users? UserExistsPassword(UserDbContext context, string username, string password)
            {
                // Verificar se o usuário existe com essa senha
                return context.Users.FirstOrDefault(usr => usr.username == username && usr.senha == password);
            }
		}

        // TOKEN
        public static class Token
        {
            // Se token existe
            public static bool Exists(UserDbContext context, string name)
            {
                // Retornar se existe no banco de dados
                return context.Tokens.FirstOrDefault(tk => tk.nome == name) != null;
            }
        }
	}
}

