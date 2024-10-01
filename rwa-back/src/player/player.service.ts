import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DreamTeam } from 'src/entities/dreamteam';
import { Player } from 'src/entities/player';
import { PlayerDto } from 'src/entities/player.dto';
import { Team } from 'src/entities/team';
import { Repository } from 'typeorm';

@Injectable()
export class PlayerService {

    constructor(
        @InjectRepository(Player) private playerRepository:Repository<Player>,
        @InjectRepository(Team) private teamRepository:Repository<Team>,
        @InjectRepository(DreamTeam) private dreamteamRepository:Repository<DreamTeam>,
    ){}

    async getAll():Promise<Player[]>{
        return await this.playerRepository.find({
            relations:['team','dreamTeams'],
        });
    }

    async getById(id:number):Promise<Player>{
        return await this.playerRepository.findOne({
            where:{id},
            relations:['team', 'dreamTeams'],
        });
    }

    async create(player:PlayerDto):Promise<Player>{
        const newplayer = new Player();
        newplayer.name=player.name;
        newplayer.age=player.age;
        newplayer.picture=player.picture;
        newplayer.position=player.position;
        return await this.playerRepository.save(newplayer);
    }

    async update(id:number, player:PlayerDto):Promise<Player>{
        const newplayer=await this.playerRepository.findOne({
            where:{id},
            relations:['team', 'dreamTeams'],
        });

        newplayer.name=player.name;
        newplayer.age=player.age;
        newplayer.picture=player.picture;
        newplayer.position=player.position;
        return await this.playerRepository.save(newplayer);
    }

    async delete(id:number):Promise<Player>{
        const pl = await this.playerRepository.findOne({
            where:{id},
            relations:['team','dreamTeams'],
        });
        return await this.playerRepository.remove(pl);
    }
}
