export class PlayerDto{
    name:string;
    age:number;
    picture:string;
    position:string;

    constructor(name:string, age:number, picture:string, position:string){
        this.name=name;
        this.age=age;
        this.picture=picture;
        this.position=position;
    }
}