export class DreamTeamDto{
    likes:number; //1 ako je like, 2 ako je dislike
    name:string;
    playerids:number[];
    creatorid:number;

    constructor(likes:number,name:string,playerids:number[],creatorid:number){
        this.likes=likes;
        this.name=name;
        this.playerids=playerids;
        this.creatorid=creatorid;
    }
}