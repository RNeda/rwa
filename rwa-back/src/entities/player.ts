import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Team } from "./team";
import { DreamTeam } from "./dreamteam";

@Entity()
export class Player{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    age:number;
    @Column()
    picture:string;
    @Column()
    position:string;
    @ManyToOne(() => Team, (team) => team.players, { nullable: true })
    team:Team;
    @ManyToMany(() => DreamTeam, (dreamTeam) => dreamTeam.players)
    dreamTeams: DreamTeam[];
}