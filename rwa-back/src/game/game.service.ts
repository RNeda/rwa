import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/entities/game';
import { GameDto } from 'src/entities/game.dto';
import { Team } from 'src/entities/team';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {

    constructor(
        @InjectRepository(Game) private gameRepository:Repository<Game>,
        @InjectRepository(Team) private teamRepository:Repository<Team>,
    ){}

    async getAll(): Promise<Game[]>{
        return await this.gameRepository.find({
            relations:['teams'],
        }
        );
    }

    async getById(id:number): Promise<Game>{
        return this.gameRepository.findOne({
            where:{ id },
            relations:['teams'],
        });
    }

    async create(game: GameDto):Promise<Game>{
        //TEAM MORA DA POSTOJI DA BI MOGAO DA SE KREIRA GAME!!!
        const { resTeam1, resTeam2, teamids } = game;
        console.log(teamids);
        const newgame = this.gameRepository.create({resTeam1,resTeam2});
        if(teamids && teamids.length>0 && teamids.length<3){
            const teams = await this.teamRepository.findByIds(teamids);
            if(teams.length!==teamids.length){
                throw new NotFoundException('some teams not found');
            }
            newgame.teams=teams;
        }
        await this.gameRepository.save(newgame);
        return newgame;
    }

    async updateRes(id:number, game:GameDto):Promise<Game>{
        const newGame = await this.gameRepository.findOne({
            where:{id},
        });
        newGame.resTeam1=game.resTeam1;
        newGame.resTeam2=game.resTeam2;
        return await this.gameRepository.save(newGame);
    }

    async delete(id:number):Promise<Game>{
        const game = await this.gameRepository.findOne({
            where:{id},
            relations:['teams'],
        });
        return await this.gameRepository.remove(game);
    }


}
