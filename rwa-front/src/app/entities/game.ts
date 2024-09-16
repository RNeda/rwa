import { Team } from "./team";

export class Game{
    id:number;
    resTeam1:number;
    resTeam2:number;
    teams:Team[];

    constructor(id:number,res1:number, res2:number, teams:Team[]){
        this.id=id;
        this.resTeam1=res1;
        this.resTeam2=res2;
        this.teams=teams;
    }
}