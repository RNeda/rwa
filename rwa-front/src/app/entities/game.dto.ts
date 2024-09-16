export class GameDto{
    resTeam1:number;
    resTeam2:number;
    teamids:number[];

    constructor(res1:number, res2:number, teamids:number[]){
        this.resTeam1=res1;
        this.resTeam2=res2;
        this.teamids=teamids;
    }
}