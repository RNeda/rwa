import { forwardRef, Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/entities/team';
//import { PlayerModule } from 'src/player/player.module';
import { GameModule } from 'src/game/game.module';
import { PlayerModule } from 'src/player/player.module';
import { Player } from 'src/entities/player';
import { Game } from 'src/entities/game';

@Module({
  imports:[TypeOrmModule.forFeature([Team,Player,Game]),
          forwardRef(()=>GameModule),
          forwardRef(()=>PlayerModule)],
  providers: [TeamService],
  controllers: [TeamController],
  exports:[TeamService]
})
export class TeamModule {}
