export class UserDto {
    username: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    role: string;  //korisnik ili admin
    dreamteamids:number[];

    constructor( username:string, name:string, surname:string, email:string,password:string, role:string, dt:number[]){
        this.username=username;
        this.name=name;
        this.surname=surname;
        this.email=email;
        this.password=password;
        this.role=role;
        this.dreamteamids=dt;
    }
}