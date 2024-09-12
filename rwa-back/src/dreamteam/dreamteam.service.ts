import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DreamTeam } from 'src/entities/dreamteam';
import { DreamTeamDto } from 'src/entities/dreamteam.dto';
import { Player } from 'src/entities/player';
import { Team } from 'src/entities/team';
import { User } from 'src/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class DreamteamService {

    constructor(
        @InjectRepository(DreamTeam) private dreamteamRepository:Repository<DreamTeam>,
        @InjectRepository(Player) private playerRepository:Repository<Player>,
        @InjectRepository(User) private userRepository:Repository<User>,
){}

    async getAll():Promise<DreamTeam[]>{
        return await this.dreamteamRepository.find({
            relations:['players','creator'],
        });
    }

    async getBiId(id:number):Promise<DreamTeam>{
        return await this.dreamteamRepository.findOne({
            where:{id},
            relations:['players','creator'],
        });
    }

    async create(team:DreamTeamDto):Promise<DreamTeam>{
        
        const{name, playerids, creatorid} = team;
       
        const newteam = this.dreamteamRepository.create({name});
        if(playerids && playerids.length>0){
            const players = await this.playerRepository.findByIds(playerids);
            if(players.length!==playerids.length){
                throw new NotFoundException("some players are not found");
            }
            newteam.players=players;
        }
        //dodajemo usera koji je kreator
        const cr = await this.userRepository.findOne({
            where:{id:creatorid},
            //relations:['dreamteams'],
        });
        newteam.creator=cr;
        //postavi random lkikes i dislikes
        newteam.likes=(Math.floor(Math.random()*10));//int random do 10
        newteam.dislikes = (Math.floor(Math.random() * 10)); //int random do 10
        await this.dreamteamRepository.save(newteam);//ovde sam zavrsila sa editovanjem newteam, pa ga push da bi mogli ostali da ga dodaju
        //kreatoru dodjaemo ovaj dreamteam u listu
        // cr.dreamteams.push(newteam);
        // await this.userRepository.save(cr);
        //DODAJ DEO DA SE PLAYERIMA POSTAVI TEAM U KOJI SU DODATI
        // const players = await this.playerRepository.findByIds(playerids);
        // players.forEach(player =>{
        //     player.dreamTeams.push(newteam);
        // })
        // await this.playerRepository.save(players);
        
        return newteam;
    }//deluje ok

    async update(id:number, dreamteam:DreamTeamDto):Promise<DreamTeam>{
        //changes name, adds players
        const newteam=await this.dreamteamRepository.findOne({
            where:{id},
            relations:['players'],
        });
        newteam.name=dreamteam.name;

        // const newPlayers = await this.playerRepository.findByIds(dreamteam.playerids); // Fetch new players by their IDs

        // // Combine existing players with the new ones
        // newteam.players = [...newteam.players, ...newPlayers];

        //update likes and dislikes
        if(dreamteam.likes===1){
            newteam.likes++;
        }else{
            if(dreamteam.likes===2){
                newteam.dislikes++;
            }
        }
        if(dreamteam.playerids && dreamteam.playerids.length !== 0){
            const newPlayers = await this.playerRepository.findByIds(dreamteam.playerids); // Fetch new players by their IDs
            //console.log("new players: "+newPlayers);
            // Combine existing players with the new ones
            newteam.players = [...newteam.players, ...newPlayers];
            //console.log("after merge: "+ newteam.players);
            await this.dreamteamRepository.save(newteam);
            //kad dodam nove playere njima treba da se postavi tim
            // newPlayers.forEach(pl=>{
            //     pl.team=newteam;
            // })
            // await this.playerRepository.save(newPlayers);
        }
        else{
            await this.dreamteamRepository.save(newteam); 
        }
        
        
        //DODAJ DEO DA SE PLAYERIMA POSTAVI TEAM U KOJI SU DODATI
        //const players = await this.playerRepository.findByIds(playerids);
        // newPlayers.forEach(player =>{
        //     player.dreamTeams.push(newteam);
        // })
        // await this.playerRepository.save(newPlayers);
        return newteam;
    }

    async delete(id:number):Promise<DreamTeam>{
        const team =  await this.dreamteamRepository.findOne({
            where:{id},
            relations:['players', 'creator'],
        });
        //brisemo dreamteam iy svakog playera
        // const players = team.players;
        // players.forEach(p=>{
        //     //p.team=null;
        //     p.dreamTeams=p.dreamTeams.filter(dt=>dt.id!==team.id);
        // })
        // await this.playerRepository.save(players);
        // //brisemo iy creatora ovaj dreamteam
        // const cr=team.creator;
        // cr.dreamteams=cr.dreamteams.filter(t=>t.id!==team.id);
        // await this.userRepository.save(cr);
        return await this.dreamteamRepository.remove(team);
    }

    async removePlayers(teamid:number, playerids:number[]):Promise<DreamTeam>{
        const team = await this.dreamteamRepository.findOne({
            where: { id: teamid },
            relations: ['players'],  
        });

        // 2. Filter out players with IDs that are in the playerIds list
        //team.players = team.players.filter(player => !playerids.includes(player.id));
        const pl = await this.playerRepository.findByIds(playerids);
        pl.forEach(pid=>{
            //console.log(pid.dreamTeams);
            team.players=team.players.filter(player=>player.id!==pid.id);
            //pid.dreamTeams=pid.dreamTeams.filter(dt=>dt.id!==teamid);
        });
        //kod tih igraca ogrisemo ovaj dreamteam
        //const players=await this.playerRepository.findByIds(playerids);
        // players.forEach(p=>{
        //     p.dreamTeams=p.dreamTeams.filter(dt=>dt.id!==team.id);
        // });
        await this.playerRepository.save(pl);
        // 3. Save the updated team with the players removed
        return await this.dreamteamRepository.save(team);
    }
}
