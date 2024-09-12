import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "./game";
import { Player } from "./player";

@Entity()
export class Team{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @OneToMany(() => Player, (player) => player.team) 
    players: Player[]; 
    @ManyToMany(() => Game, (game) => game.teams)
    games:Game[];
    
}