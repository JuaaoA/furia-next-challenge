using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace furia_next_api.Model
{
	[Table("tokens")]
	public class Tokens
	{
		public Tokens(string nome, int usuario)
		{
			this.nome = nome ?? throw new ArgumentOutOfRangeException("Nome token vazio");
			this.usuario = usuario;
		}

		[Key]
		public int token_id { get; set; }
		public string nome { get; set; }
		public int usuario { get; set; }
	}
}

