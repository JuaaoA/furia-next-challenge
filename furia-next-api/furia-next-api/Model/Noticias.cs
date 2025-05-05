using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace furia_next_api.Model
{
    [Table("noticias")]
    public class Noticias
    {
        public Noticias(string titulo, string link_imagem, string jogo)
        {
            this.titulo = titulo;
            this.link_imagem = link_imagem;
            this.jogo = jogo;
        }

        [Key]
        public int id_noticia { get; set; }
        public string titulo { get; set; }
        public string link_imagem { get; set; }
        public string jogo { get; set; }
    }
}

