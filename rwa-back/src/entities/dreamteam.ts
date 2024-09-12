import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./player";
import { User } from "./user";

@Entity()
export class DreamTeam{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    likes:number;
    @Column()
    dislikes:number;
    @Column()
    name:string;
    @ManyToMany(() => Player, (player) => player.dreamTeams)
    @JoinTable()
    players:Player[];
    @ManyToOne(() => User, (user) => user.dreamteams)
    creator:User;
}