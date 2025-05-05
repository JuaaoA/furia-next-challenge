// Encontra a foto do jogo usando o id do jogo no pandascore
export function EncontrarFotoJogoPeloID(id)
{
    // Escolher o que fazer com o ID passado como parâmetro
    switch (id)
    {
        // Counter-Strike
        case 3:
            return "../../img/logo/counter_strike_logo.png";
        
        // CS 2
        case 13:
            return "../../img/logo/counter_strike_logo.png";

        // Valorant
        case 26:
            return "../../img/logo/valorant_logo.png";
        
        // Rainbow Six
        case 24:
            return "../../img/logo/rainbow_six_logo.png";
        
        // League Of legends
        case 1:
            return "../../img/logo/lol_logo.png";
        
        // Caso não exista
        default:
            return "../../img/logo/lol_logo.png";
    }
}