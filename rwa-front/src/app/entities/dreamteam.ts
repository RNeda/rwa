import { Player } from "./player";
import { User } from "./user";

export class DreamTeam{
    id:number;
    likes:number;
    dislikes:number; 
    name:string;
    players:Player[];
    creator:User;

    constructor(id:number,likes:number,dislikes:number,name:string,players:Player[],creator:User){
        this.id=id;
        this.likes=likes;
        this.dislikes=dislikes;
        this.name=name;
        this.players=players;
        this.creator=creator;
    }
}