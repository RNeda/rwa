import { forwardRef, Module } from '@nestjs/common';
import { DreamteamService } from './dreamteam.service';
import { DreamteamController } from './dreamteam.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DreamTeam } from 'src/entities/dreamteam';
import { PlayerModule } from 'src/player/player.module';
import { UserModule } from 'src/user/user.module';
import { Player } from 'src/entities/player';
import { User } from 'src/entities/user';

@Module({
  imports:[TypeOrmModule.forFeature([DreamTeam,Player, User]),
            forwardRef(()=>PlayerModule),
            forwardRef(()=>UserModule)],
  providers: [DreamteamService],
  controllers: [DreamteamController],
  exports:[DreamteamService]
})
export class DreamteamModule {}
