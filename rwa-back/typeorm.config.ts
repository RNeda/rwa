import { DreamTeam } from "src/entities/dreamteam";
import { Game } from "src/entities/game";
import { Player } from "src/entities/player";
import { Team } from "src/entities/team";
import { User } from "src/entities/user";
import { ConnectionOptions } from "typeorm";


export const typeOrmConfig: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'anja', //mysecretpassword
    database:'platform',
    entities: [User, Player, Game, Team, DreamTeam],
    synchronize: true,
}