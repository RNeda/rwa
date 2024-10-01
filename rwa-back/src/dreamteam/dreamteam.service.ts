import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DreamTeam } from 'src/entities/dreamteam';
import { DreamTeamDto } from 'src/entities/dreamteam.dto';
import { Player } from 'src/entities/player';
import { Team } from 'src/entities/team';
import { User } from 'src/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class DreamteamService {

    constructor(
        @InjectRepository(DreamTeam) private dreamteamRepository:Repository<DreamTeam>,
        @InjectRepository(Player) private playerRepository:Repository<Player>,
        @InjectRepository(User) private userRepository:Repository<User>,
){}

    async getAll():Promise<DreamTeam[]>{
        return await this.dreamteamRepository.find({
            relations:['players','creator'],
        });
    }

    async getBiId(id:number):Promise<DreamTeam>{
        return await this.dreamteamRepository.findOne({
            where:{id},
            relations:['players','creator'],
        });
    }

    async create(team:DreamTeamDto):Promise<DreamTeam>{
        
        const{name, playerids, creatorid} = team;
       
        const newteam = this.dreamteamRepository.create({name});
        if(playerids && playerids.length>0){
            const players = await this.playerRepository.findByIds(playerids);
            if(players.length!==playerids.length){
                throw new NotFoundException("some players are not found");
            }
            newteam.players=players;
        }
        //dodajemo usera koji je kreator
        const cr = await this.userRepository.findOne({
            where:{id:creatorid},
        });
        newteam.creator=cr;
        //postavi random lkikes i dislikes
        newteam.likes=(Math.floor(Math.random()*10));
        newteam.dislikes = (Math.floor(Math.random() * 10)); 
        await this.dreamteamRepository.save(newteam);
        return newteam;
    }

    async update(id:number, dreamteam:DreamTeamDto):Promise<DreamTeam>{
        //changes name, adds players
        const newteam=await this.dreamteamRepository.findOne({
            where:{id},
            relations:['players'],
        });
        newteam.name=dreamteam.name;

        //update likes and dislikes
        if(dreamteam.likes===1){
            newteam.likes++;
        }else{
            if(dreamteam.likes===2){
                newteam.dislikes++;
            }
        }
        if(dreamteam.playerids && dreamteam.playerids.length !== 0){
            const newPlayers = await this.playerRepository.findByIds(dreamteam.playerids); 
            newteam.players = [...newteam.players, ...newPlayers];
            await this.dreamteamRepository.save(newteam);
        }
        else{
            await this.dreamteamRepository.save(newteam); 
        }
        return newteam;
    }

    async delete(id:number):Promise<DreamTeam>{
        const team =  await this.dreamteamRepository.findOne({
            where:{id},
            relations:['players', 'creator'],
        });
        return await this.dreamteamRepository.remove(team);
    }

    async removePlayers(teamid:number, playerids:number[]):Promise<DreamTeam>{
        const team = await this.dreamteamRepository.findOne({
            where: { id: teamid },
            relations: ['players'],  
        });

        const pl = await this.playerRepository.findByIds(playerids);
        pl.forEach(pid=>{
            team.players=team.players.filter(player=>player.id!==pid.id);
        });
        await this.playerRepository.save(pl);
        return await this.dreamteamRepository.save(team);
    }
}
