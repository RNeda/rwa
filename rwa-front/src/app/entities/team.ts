import { Game } from "./game";
import { Player } from "./player";

export class Team{
    id:number;
    name:string;
    players:Player[];
    games:Game[];

    constructor(id:number, name:string,p:Player[], g:Game[]){
        this.id=id;
        this.name=name;
        this.players=p;
        this.games=g;
    }
}