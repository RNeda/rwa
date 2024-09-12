import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { DreamteamModule } from 'src/dreamteam/dreamteam.module';
import { DreamTeam } from 'src/entities/dreamteam';

@Module({
    imports:[TypeOrmModule.forFeature([User, DreamTeam]),
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1h' },
    }),
    forwardRef(()=>DreamteamModule),],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
