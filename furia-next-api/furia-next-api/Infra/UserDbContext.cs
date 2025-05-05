using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using furia_next_api.Model;

namespace furia_next_api.Infra
{
	public class UserDbContext : DbContext
	{
		// Configurações da API
		private IConfiguration _configuration;

		// Modelos de tabelas usadas
		public DbSet<Users> Users { get; set; }
		public DbSet<Tokens> Tokens { get; set; }
		public DbSet<Noticias> Noticias { get; set; }

		// Construtor
		public UserDbContext(IConfiguration configuration, DbContextOptions options) : base(options)
		{
			_configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
		}

		// Override para configuração do banco de dados
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
			// Pegar o connectionString com o banco de dados padrão no appsettings.js
			var connectionString = _configuration.GetConnectionString("default");

			// Iniciar conexão
			optionsBuilder.UseMySQL(connectionString);
        }
    }
}

