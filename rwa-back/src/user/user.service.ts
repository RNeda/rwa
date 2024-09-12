import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DreamTeam } from 'src/entities/dreamteam';
import { User } from 'src/entities/user';
import { UserDto } from 'src/entities/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

   constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(DreamTeam) private dreamteamRepository:Repository<DreamTeam>,
){}

    async getAll(): Promise<User[]>{
        return await this.userRepository.find({
            relations:['dreamteams'],
        });
    }

    
    async getById(id: number): Promise<User> {
        return await this.userRepository.findOne({
            where: { id },
            relations:['dreamteams'],
        });
    }

    async getByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({
            where: { email },
            relations:['dreamteams'],
        });
    }

    async create(user: UserDto): Promise<User> {
        const newUser = new User();
        newUser.name = user.name;
        newUser.surname = user.surname;
        newUser.username = user.username;
        newUser.email = user.email;
        newUser.password = user.password;
        //da li bi trebalo da se role osmah postavlja na korisnika?? 
        //posto cu da imam samo jednog admina rucno napravljenog
        newUser.role = "korisnik";
        return await this.userRepository.save(newUser);
    }

    async update(id: number, user: UserDto): Promise<User> {
        const newUser = await this.userRepository.findOne({
            where: { id },
        });
        newUser.name = user.name;
        newUser.surname = user.surname;
        newUser.username = user.username;
        newUser.email = user.email;
        newUser.password = user.password;
        //da li bi trebalo da se role osmah postavlja na korisnika?? 
        //posto cu da imam samo jednog admina rucno napravljenog
        //newUser.role = user.role;
        return await this.userRepository.save(newUser);
    }
    
    async delete(id: number): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations:['dreamteams'],
        });
        if (user.dreamteams.length > 0) {
            await this.dreamteamRepository.remove(user.dreamteams);
        }
        //ybog cascade:true u user entitetu trebalo bi da se brisu i dreamtimovi
        return await this.userRepository.remove(user);
    }

    // async addDreamTeam(userid:number, dreamteamid:number):Promise<User>{
    //     const user = await this.userRepository.findOne({
    //         where:{id:userid},
    //         relations:['dreamteams']
    //     });
    //     const dteam = await this.dreamteamRepository.findOne({
    //         where:{id:dreamteamid},
    //     });
    //     if (user.dreamteams.some(dt => dt.id === dreamteamid)) {
    //         throw new BadRequestException(`DreamTeam with ID ${dreamteamid} is already associated with this user`);
    //     }
    //     user.dreamteams.push(dteam);
    //     return await this.userRepository.save(user);
    // }
}
