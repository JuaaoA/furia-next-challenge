using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace furia_next_api.Model
{
	[Table("usuarios")]
	public class Users
	{
        public Users(string username, string email, string senha, string jogo_favorito)
        {
			this.username = username ?? throw new ArgumentNullException("Username vazio");
			this.email = email ?? throw new ArgumentNullException("Email vazio");
			this.senha = senha ?? throw new ArgumentNullException("Senha vazia");
			this.jogo_favorito = jogo_favorito;
        }

        [Key]
		public int id { get; set; }
		public string username { get; set; }
		public string email { get; set; }
		public string senha { get; set; }
		public string jogo_favorito { get; set; }
	}
}

