import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerDto } from 'src/entities/player.dto';
import { Player } from 'src/entities/player';

@Controller('player')
export class PlayerController {

    constructor(public playerService:PlayerService){}

    @Post()
    create(@Body() player:PlayerDto):Promise<Player>{
        return this.playerService.create(player);
    }

    @Get()
    getAll():Promise<Player[]>{
        return this.playerService.getAll();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe)id:number):Promise<Player>{
        return this.playerService.getById(id);
    }

    @Delete(':id')
    delete(@Param('id',ParseIntPipe)id:number):Promise<Player>{
        return this.playerService.delete(id);
    }

    @Put(':id')
    update(@Param('id',ParseIntPipe)id:number, @Body()player:PlayerDto):Promise<Player>{
        return this.playerService.update(id,player);
    }
}
