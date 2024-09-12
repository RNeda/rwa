import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Team } from "./team";

@Entity()
export class Game{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    resTeam1:number;
    @Column()
    resTeam2:number;
    @ManyToMany(() => Team, (team) => team.games, { eager: true })
    @JoinTable()
    teams:Team[];
    
}