import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { DreamteamService } from './dreamteam.service';
import { DreamTeamDto } from 'src/entities/dreamteam.dto';
import { DreamTeam } from 'src/entities/dreamteam';

@Controller('dreamteam')
export class DreamteamController {

    constructor(public dreamteamService:DreamteamService){}

    @Post()
    create(@Body() team:DreamTeamDto):Promise<DreamTeam>{
        return this.dreamteamService.create(team);
    }

    @Get()
    getAll():Promise<DreamTeam[]>{
        return this.dreamteamService.getAll();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe)id:number):Promise<DreamTeam>{
        return this.dreamteamService.getBiId(id);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe)id:number):Promise<DreamTeam>{
        return this.dreamteamService.delete(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe)id:number, @Body() team:DreamTeamDto):Promise<DreamTeam>{
        return this.dreamteamService.update(id,team);
    }

    @Put(':teamid/player')
    removePlayers(@Param('teamid', ParseIntPipe) teamid: number, @Body() body: {playerids: number[]}): Promise<DreamTeam> {
        const {playerids} = body;
        return this.dreamteamService.removePlayers(teamid, playerids);
    }
}
