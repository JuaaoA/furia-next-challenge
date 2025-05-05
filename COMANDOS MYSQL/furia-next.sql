create database furia_next;
use furia_next;

create table usuarios (
	id int auto_increment primary key,
    username varchar(40) not null unique,
    email varchar(30) not null unique,
    senha varchar(50) not null,
    jogo_favorito varchar(30)
);

create table tokens(
	token_id int auto_increment primary key,
    nome varchar(20) not null unique,
    usuario int,
    foreign key(usuario) references usuarios(id)
);

create table noticias(
	id_noticia int auto_increment primary key,
    titulo varchar(80) not null,
    link_imagem varchar(650) not null,
    jogo varchar(30) not null
);

drop table noticias;

insert into usuarios (username, email, senha, jogo_favorito) values ("furiagg", "teste@furiagg.com", "123456789", "cs");


insert into noticias (titulo, link_imagem, jogo) values ("Novo Post no instagram da furia LoL!", "https://noticias.maisesports.com.br/wp-content/uploads/2025/01/furia-lol-lta-sul-2025-1120x630.jpg", "LoL");
insert into noticias (titulo, link_imagem, jogo) values ("Atualização 10.08 do VALORANT", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/f4a95503636b477770b7cc4d8ca2bd9fe369f4f4-1920x1080.jpg?auto=format&fit=crop&q=80&h=270&w=480&crop=center", "Valorant");
insert into noticias (titulo, link_imagem, jogo) values ("Trailer de estreia do Ato 3", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/cca62b2e455a4af408090a83907ff7b085725b58-1920x1080.jpg?auto=format&fit=crop&q=80&h=270&w=480&crop=center", "Valorant");
insert into noticias (titulo, link_imagem, jogo) values ("Comemoração dos 5 anos do VALORANT", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/0a5a04311d3566c4fe19fadb7b03f3c82bf0facd-1920x1080.jpg?auto=format&fit=crop&q=80&h=270&w=480&crop=center", "Valorant");
insert into noticias (titulo, link_imagem, jogo) values ("Y10S1.3 PATCH NOTES", "https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7lLYOpqZt63Sn40epoxgaD/50ec391f059af2a8598851a7191aae4e/PATCHNOTES_Y10S1.3_960x540.jpg", "R6");
insert into noticias (titulo, link_imagem, jogo) values ("Rainbow Six Siege X será lançado em 10 de junho", "https://www.acidadeon.com/tudoep/wp-content/uploads/sites/10/2025/03/image003_2025-03-13_19-35-43_png_2025-03-13_19-35-43.webp", "R6");
insert into noticias (titulo, link_imagem, jogo) values ("Y10S1.2 PATCH NOTES", "https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5obhNry0naMX0dXoOUPP12/a4958e299f1ab0502bc47d03ef24c4e9/PATCHNOTES_Y10S1.2_960x540.jpg", "R6");
insert into noticias (titulo, link_imagem, jogo) values ("Trailer de Lançamento Ato 1", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/5db785557e1a511e9cf21db134e1ca83b9f68adc-1280x720.jpg?auto=format&fit=crop&q=80&h=270&w=480&crop=center", "LoL");
insert into noticias (titulo, link_imagem, jogo) values ("Notas da Atualização 14.3 do Teamfight Tactics (2025)", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/e30d91bdb78f2f31a35f4efc63167a3ca2ebbb57-1280x720.jpg?auto=format&fit=crop&q=80&h=270&w=480&crop=center", "LoL");
insert into noticias (titulo, link_imagem, jogo) values ("A temporada 2 já começou", "https://clan.akamai.steamstatic.com/images/3381077/4d8798eefa51cfd7286981047bf4490d121c658a.png", "CS");
insert into noticias (titulo, link_imagem, jogo) values ("Venha a primavera", "https://clan.akamai.steamstatic.com/images/3381077/e29c263c209cdc7d1da7fc9f4543ef6c3ec0c4cd.png", "CS");
insert into noticias (titulo, link_imagem, jogo) values ("FURIA confirma adição de YEKINDAR", "https://static.draft5.gg/news/2024/05/10191241/Liquid-YEKINDAR-ESL-Pro-League-S191.jpg", "CS");


select * from usuarios;
select * from tokens;
select * from noticias;
