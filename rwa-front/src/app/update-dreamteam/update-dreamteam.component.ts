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
import { selectPlayerById } from '../store/player.selectors';

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
  //dreamTeamService: any;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router:Router, private dialog: MatDialog,) {}

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
        this.playersToAdd.push(playerToAdd.name);
        this.playersToAddIds.push(playerToAdd.id);
      }
    }
  }

  removePlayer(playerId: number): void {
    //this.dreamTeam.players = this.dreamTeam.players.filter(player => player.id !== playerId);
    if(playerId){
      this.playersToRemove.push(playerId);
      this.store.dispatch(removePlayer({teamId:this.dreamTeam.id, playerIds:this.playersToRemove}));
      this.dreamTeam.players =this.dreamTeam.players.filter(p=>p.id!==playerId);
      this.playersToRemove=[];
      
    
      //console.log("players after remove: ", [this.dreamTeam.players]);
    }
  }

  onSubmit(): void {
    
      const dto: DreamTeamDto = new DreamTeamDto(0, this.dreamTeam.name, this.playersToAddIds, this.dreamTeam.creator.id);
      console.log("dto", [dto]);
      //console.log("dreamTeam to update id: "+this.dreamTeam.id);
      if(this.dtId) {this.store.dispatch(updateDreamTeam({ id: this.dtId, updates: dto }));}
      this.router.navigate(['/my-profile'],{ queryParams: { dtId:this.dtId } });

      this.dialog.open(ConfirmUpdateDialogComponent, {
        width: '250px',
      });
    
  }

  cancelUpdate(){
    this.router.navigate(['/my-profile']);
  }

}
