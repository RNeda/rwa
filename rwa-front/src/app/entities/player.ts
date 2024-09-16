import { DreamTeam } from "./dreamteam";
import { Team } from "./team";

export class Player{
    id:number;
    name:string;
    age:number;
    picture:string;
    position:string;
    team:Team;
    dreamTeams:DreamTeam[];

    constructor(id:number,name:string,age:number,picture:string,position:string,team:Team,dt:DreamTeam[]){
        this.id=id;
        this.name=name;
        this.age=age;
        this.picture=picture;
        this.position=position;
        this.team=team;
        this.dreamTeams=dt;
    }
}
