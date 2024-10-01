import { Component, OnInit } from '@angular/core';
import { DreamTeam } from '../entities/dreamteam';
import { Player } from '../entities/player';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { DreamTeamDto } from '../entities/dreamteam.dto';
import { loadAvailablePlayers, loadDreamTeam, removePlayer, removePlayerFailure, removePlayerSuccess, updateDreamTeam } from '../store/dreamteam.actions';
import { selectAvailablePlayers, selectDreamTeamById, selectSingleDreamTeam } from '../store/dreamteam.selectors';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmUpdateDialogComponent } from '../confirm-update-dialog/confirm-update-dialog.component';
import { selectPlayerById, selectSinglePlayer } from '../store/player.selectors';
import { loadPlayer } from '../store/player.actions';

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
  playersToAdd:string[]=[];
  playersToRemove: number[] = [];
  creatorId:number=0;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router:Router, private dialog: MatDialog,) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['dtId']) {
        this.dtId = +params['dtId'];
        this.store.dispatch(loadDreamTeam({ id: this.dtId }));
      }
    });
    
    this.store.dispatch(loadAvailablePlayers());//vraca sve playere, dole se filtriraju

    this.store.select(selectSingleDreamTeam).subscribe((dreamTeam) => {
      if (dreamTeam) {
        this.dreamTeam = { ...dreamTeam };
      }
    });
    this.creatorId=this.dreamTeam.creator.id;
    this.store.select(selectAvailablePlayers).subscribe((players) => {
      this.allPlayers = players;
      this.filterAvailablePlayers();
      
    });
  }


  filterAvailablePlayers(): void {
    this.availablePlayers = this.allPlayers.filter(
      (player) => !this.dreamTeam.players.some((dtPlayer) => dtPlayer.id === player.id)
    );
  }

  addPlayer(): void {
    if (this.selectedPlayerId) {
      const playerToAdd = this.availablePlayers.find(player => player.id === Number(this.selectedPlayerId));
      if (playerToAdd && !this.dreamTeam.players.some(p => p.id === playerToAdd.id)) {
        this.playersToAdd.push(playerToAdd.name);
        this.playersToAddIds.push(playerToAdd.id);
      }
    }
  }

  removePlayer(playerId: number): void {
    if(playerId){
      this.playersToRemove.push(playerId);
      this.store.dispatch(removePlayer({teamId:this.dreamTeam.id, playerIds:this.playersToRemove}));
      this.dreamTeam.players =this.dreamTeam.players.filter(p=>p.id!==playerId);
      this.store.dispatch(loadPlayer({id: this.playersToRemove[0]}));
      this.store.select(selectSinglePlayer).subscribe((data)=>{
        //console.log("removed player from select:" , data)
        if(data) {this.availablePlayers.push(data);}
      });
      this.playersToRemove=[];
    }
  }

  onSubmit(): void {
    
      const dto: DreamTeamDto = new DreamTeamDto(0, this.dreamTeam.name, this.playersToAddIds, this.creatorId);
      if(this.dtId) {
        this.store.dispatch(updateDreamTeam({ id: this.dtId, updates: dto }));
      }
      this.router.navigate(['/my-profile'],{ queryParams: { dtId:this.dtId } });

      this.dialog.open(ConfirmUpdateDialogComponent, {
        width: '250px',
      });
    
  }

  cancelUpdate(){
    this.router.navigate(['/my-profile']);
  }

}
