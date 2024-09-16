export class TeamDto{
    name:string;
    playerids: number[];

    constructor(name:string,pids:number[]){
        this.name=name;
        this.playerids=pids;
    }
}