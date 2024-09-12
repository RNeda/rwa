import { Game } from "./game";
import { Player } from "./player";

export class TeamDto{
    name:string;
    playerids: number[]; //niz idjeva igraca koji se u service metodama prebacuje u player entitet
    //games:Game[];//ako mi ovo trewba uopste u dto? NE!!!
    //upcomingGames: Game[];
    //playedGames:Game[];
}