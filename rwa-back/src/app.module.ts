import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { AuthModule } from './auth/auth.module';
import { PlayerModule } from './player/player.module';
import { TeamModule } from './team/team.module';
import { GameModule } from './game/game.module';
import { DreamteamModule } from './dreamteam/dreamteam.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(typeOrmConfig), AuthModule, PlayerModule, TeamModule, GameModule, DreamteamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
