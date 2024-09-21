import { Component, OnInit } from '@angular/core';
import { DreamTeam } from '../entities/dreamteam';
import { Player } from '../entities/player';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { DreamTeamDto } from '../entities/dreamteam.dto';
import { loadAvailablePlayers, loadDreamTeam, removePlayer, removePlayerFailure, removePlayerSuccess, updateDreamTeam } from '../store/dreamteam.actions';
import { selectAvailablePlayers, selectDreamTeamById, selectSingleDreamTeam } from '../store/dreamteam.selectors';

@Component({
  selector: 'app-update-dreamteam',
  templateUrl: './update-dreamteam.component.html',
  styleUrl: './update-dreamteam.component.scss'
})
export class UpdateDreamteamComponent implements OnInit{

  dreamTeam: DreamTeam = { id: 0, name: '', likes: 0, dislikes: 0, players: [], creator:{id:0,username:"",name:"",surname:"",email:"",password:"",role:"",dreamteams:[]}  };
  selectedPlayerId: number | null = null;
  availablePlayers: Player[] = [];
  allPlayers:Player[] = [];
  dtId:number| null = null;
  playersToAddIds:number[]=[];
  playersToRemove: number[] = [];
  //dreamTeamService: any;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
    // Load DreamTeam and available players
    //const dreamTeamId = +this.route.snapshot.paramMap.get('id')!;
    this.route.queryParams.subscribe(params => {
      if (params['dtId']) {
        this.dtId = +params['dtId'];
        //console.log("Query Param dtId: " + this.dtId);
        this.store.dispatch(loadDreamTeam({ id: this.dtId }));
      }
    });
    
    this.store.dispatch(loadAvailablePlayers());//vraca sve playere, dole se filtriraju

    this.store.select(selectSingleDreamTeam).subscribe((dreamTeam) => {
      if (dreamTeam) {
        this.dreamTeam = { ...dreamTeam };
        //console.log("dt loaded: "+dreamTeam);
      }
    });

    this.store.select(selectAvailablePlayers).subscribe((players) => {
      this.allPlayers = players;
      this.filterAvailablePlayers();
      // this.allPlayers.forEach(p=>{
      //   //console.log("all players: "+ p.name);
      //   if(this.dreamTeam.players.some(pl=>pl.id!==p.id)){
      //     this.availablePlayers.push(p);
      //   }
      // })
      // console.log("available players: "+ this.availablePlayers);
    });
  }


  filterAvailablePlayers(): void {
    this.availablePlayers = this.allPlayers.filter(
      (player) => !this.dreamTeam.players.some((dtPlayer) => dtPlayer.id === player.id)
    );
    //console.log("Filtered available players: ", this.availablePlayers);
  }

  addPlayer(): void {
    if (this.selectedPlayerId) {
      console.log("selected player id:"+ this.selectedPlayerId+".");
      console.log("from available players:"+ this.availablePlayers[0].id+".");
      const playerToAdd = this.availablePlayers.find(player => player.id === Number(this.selectedPlayerId));
      console.log("player to add: "+ playerToAdd);
      if (playerToAdd && !this.dreamTeam.players.some(p => p.id === playerToAdd.id)) {
        //this.dreamTeam.players.push(playerToAdd);
        console.log("player to add id: " +playerToAdd.id);
        this.playersToAddIds.push(playerToAdd.id);
      }
    }
  }

  removePlayer(playerId: number): void {
    //this.dreamTeam.players = this.dreamTeam.players.filter(player => player.id !== playerId);
    if(playerId){
      this.playersToRemove.push(playerId);
      this.store.dispatch(removePlayer({teamId:this.dreamTeam.id, playerIds:this.playersToRemove}));
      this.playersToRemove=[];
    }
  }

  onSubmit(): void {
    const dto: DreamTeamDto = new DreamTeamDto(0, this.dreamTeam.name, this.playersToAddIds, this.dreamTeam.creator.id);
    console.log("dtoplayerids "+dto.playerids[0]);
    this.store.dispatch(updateDreamTeam({ id: this.dreamTeam.id, updates: dto }));
    //this.store.select(selectDreamTeamById(this.dreamTeam.id)).subscribe((data)=>{console.log("from update "+data)});
    this.router.navigate(['/my-profile'],{ queryParams: { dtId:this.dreamTeam.id } });
  }

}
