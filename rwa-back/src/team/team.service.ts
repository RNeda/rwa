;import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/entities/game';
import { Player } from 'src/entities/player';
import { Team } from 'src/entities/team';
import { TeamDto } from 'src/entities/team.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {

    constructor(
        @InjectRepository(Team) private teamRepository:Repository<Team>,
        @InjectRepository(Player) private playerRepository: Repository<Player>,
        @InjectRepository(Game) private gameRepository:Repository<Game>,
    ){}

    async getAll():Promise<Team[]>{
        return await this.teamRepository.find({
            relations:['players', 'games'],
        });
    }

    async getBiId(id:number):Promise<Team>{
        return await this.teamRepository.findOne({
            where:{id},
            relations:['players', 'games'],
        });
    }

    async create(team:TeamDto):Promise<Team>{
        //PALYERS MORAJU DA POSTOJE DA BI SE KREIROA TEAM, GAME NE on se dodaje kasnije
        const{name, playerids} = team;
        const newteam = this.teamRepository.create({name});
        if(playerids && playerids.length>0){
            const players = await this.playerRepository.findByIds(playerids);
            if(players.length!==playerids.length){
                throw new NotFoundException("some players are not found");
            }
            newteam.players=players;

        }
        await this.teamRepository.save(newteam);
        
        //DODAJ DEO DA SE PLAYERIMA POSTAVI TEAM U KOJI SU DODATI
        const players = await this.playerRepository.findByIds(playerids);
        players.forEach(player =>{
            player.team=newteam;
        })
        await this.playerRepository.save(players);

        return newteam;
    }

    async update(id:number, team:TeamDto):Promise<Team>{
        //changes name, adds players
        const newteam=await this.teamRepository.findOne({
            where:{id},
            relations:['players'],
        });
        newteam.name=team.name;

        if(team.playerids && team.playerids.length !== 0){
            const newPlayers = await this.playerRepository.findByIds(team.playerids); 
            newteam.players = [...newteam.players, ...newPlayers];
            await this.teamRepository.save(newteam);
            
        }
        else{
            await this.teamRepository.save(newteam);
        }
        

        return newteam;
    }

    async delete(id:number):Promise<Team>{
        const team =  await this.teamRepository.findOne({
            where:{id},
            relations:['players', 'games'],
        });
        //delete team from players
        const players = team.players;
        players.forEach(p=>{
            p.team=null;
        })
        await this.playerRepository.save(players);
        //delete games for team
        //treba da obrise games ya ovaj team, ali i da ih iybaci iz games drugog tima
        const games = team.games;
        let otherteams:Team[]=[];//protivnicki timovi u games
        games.forEach(g=>{
            g.teams=g.teams.filter(t=>t.id!==id);
            otherteams = [...otherteams, ...g.teams];
        })
        games.forEach(g=>{
            otherteams.forEach(t=>{
                t.games=t.games.filter(gamee=>gamee.id!==g.id);
            })
        })
        await this.teamRepository.save(otherteams);
        await this.gameRepository.remove(games);
        return await this.teamRepository.remove(team);
    }

    async removePlayers(teamid:number, playerids:number[]):Promise<Team>{
        const team = await this.teamRepository.findOne({
            where: { id: teamid },
            relations: ['players'],  
        });
        
        const pl = await this.playerRepository.findByIds(playerids);
        console.log(pl);
        pl.forEach(pid=>{
            team.players = team.players.filter(player => player.id!==pid.id);
            pid.team=null;
        });

        await this.playerRepository.save(pl);

        return await this.teamRepository.save(team);
    }

}
