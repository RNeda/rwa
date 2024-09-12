import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamDto } from 'src/entities/team.dto';
import { Team } from 'src/entities/team';

@Controller('team')
export class TeamController {

    constructor(public teamService:TeamService){}

    @Post()
    create(@Body() team:TeamDto):Promise<Team>{
        return this.teamService.create(team);
    }

    @Get()
    getAll():Promise<Team[]>{
        return this.teamService.getAll();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe)id:number):Promise<Team>{
        return this.teamService.getBiId(id);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe)id:number):Promise<Team>{
        return this.teamService.delete(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe)id:number, @Body() team:TeamDto):Promise<Team>{
        return this.teamService.update(id,team);
    }

    //http://localhost:3000/team/1/addgame/2 primer poziva
    // @Put(':teamid/addgame/:gameid')
    // addGame(@Param('teamid', ParseIntPipe)teamid:number, @Param('gameid',ParseIntPipe)gameid:number):Promise<Team>{
    //     return this.teamService.addGame(teamid,gameid);
    // }

    // @Put(':teamid/removegame/:gameid')
    // removeGame(@Param('teamid', ParseIntPipe)teamid:number, @Param('gameid',ParseIntPipe)gameid:number):Promise<Team>{
    //     return this.teamService.removeGame(teamid,gameid);
    // }

    @Put(':teamid/player')
    async removePlayers(@Param('teamid', ParseIntPipe) teamid: number, @Body() body: { playerids: number[] }): Promise<Team> {
        const{playerids}  =body;
        console.log(playerids);
        return this.teamService.removePlayers(teamid, playerids);
    }
}
