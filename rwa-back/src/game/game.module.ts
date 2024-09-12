import { forwardRef, Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/entities/game';
import { TeamModule } from 'src/team/team.module';
import { Team } from 'src/entities/team';

@Module({
  imports:[TypeOrmModule.forFeature([Game, Team]), 
          forwardRef(()=>TeamModule)],
  controllers: [GameController],
  providers: [GameService],
  exports:[GameService]
})
export class GameModule {}
