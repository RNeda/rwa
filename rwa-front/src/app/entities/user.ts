import { DreamTeam } from "./dreamteam";

export class User{
    id:number;
    username: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    role: string;
    dreamteams: DreamTeam[]; 

    constructor(id:number, username:string, name:string, surname:string, email:string,password:string, role:string, dt:DreamTeam[]){
        this.id=id;
        this.username=username;
        this.name=name;
        this.surname=surname;
        this.email=email;
        this.password=password;
        this.role=role;
        this.dreamteams=dt;
    }
}