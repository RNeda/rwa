import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { GameService } from './game.service';
import { GameDto } from 'src/entities/game.dto';
import { Game } from 'src/entities/game';

@Controller('game')
export class GameController {

    constructor(public gameService: GameService){}

    @Post()
    create(@Body() game:GameDto):Promise<Game>{
        return this.gameService.create(game);
    }//radi 

    @Get()
    getAll():Promise<Game[]>{
        return this.gameService.getAll();
    }//radi

    @Get(':id')
    getById(@Param('id', ParseIntPipe)id:number):Promise<Game>{
        return this.gameService.getById(id);
    }//radi

    @Put(':id')
    updateRes(@Param('id',ParseIntPipe) id:number, @Body() game:GameDto):Promise<Game>{
        return this.gameService.updateRes(id,game);
    }//radi

    @Delete(':id')
    delete(@Param('id', ParseIntPipe)id:number):Promise<Game>{
        return this.gameService.delete(id);
    }//radi
}
