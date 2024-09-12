import { forwardRef, Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { Player } from 'src/entities/player';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamModule } from 'src/team/team.module';
import { DreamteamModule } from 'src/dreamteam/dreamteam.module';
import { Team } from 'src/entities/team';
import { DreamTeam } from 'src/entities/dreamteam';

@Module({
  imports:[TypeOrmModule.forFeature([Player,Team,DreamTeam]),
          forwardRef(()=>TeamModule),
          forwardRef(()=>DreamteamModule)],
  providers: [PlayerService],
  controllers: [PlayerController],
  exports:[PlayerService]
})
export class PlayerModule {}
