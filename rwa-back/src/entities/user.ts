import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DreamTeam } from "./dreamteam";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    name: string;
    @Column()
    surname: string;
    @Column()   
    email: string;
    @Column()
    password: string;
    @Column()
    role: string;
    @OneToMany(() => DreamTeam, (dreamteam) => dreamteam.creator) 
    dreamteams: DreamTeam[]; 
    
}