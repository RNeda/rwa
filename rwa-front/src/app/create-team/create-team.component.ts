import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { selectAllPlayers } from '../store/team.selectors';
import { createTeam, loadPlayers } from '../store/team.actions';
import { TeamDto } from '../entities/team.dto';
import { Player } from '../entities/player';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrl: './create-team.component.scss'
})
export class CreateTeamComponent implements OnInit{

  //players$ = this.store.select(selectAllPlayers);
  selectedPlayers: number[] = [];
  teamName: string = "";
  allPlayers:Player[] = [];
  availablePlayers:Player[]=[];
  @Output() teamCreated = new EventEmitter<boolean>();
  @Output() cancelCreation = new EventEmitter<boolean>();

  constructor(private store: Store<AppState>,private router:Router,private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.store.dispatch(loadPlayers());

    this.store.select(selectAllPlayers).subscribe((players)=>{
      this.allPlayers=players;
      this.filterPlayersWithNoTeam();
    });
  }

  togglePlayerSelection(playerId: number): void {
    const index = this.selectedPlayers.indexOf(playerId);
    if (index > -1) {
      this.selectedPlayers.splice(index, 1); // Remove player ID from the array
    } else {
      this.selectedPlayers.push(playerId); // Add player ID to the array
    }
  }

  createTeam():void{
    const newTeam:TeamDto={name:this.teamName, playerids:this.selectedPlayers};
    this.store.dispatch(createTeam({team:newTeam}));
    const created:boolean=true;
    this.teamCreated.emit(created);
    //this.router.navigate(['/my-profile']);
  }

  cancelTeam():void{
    const cncl:boolean=true;
    this.cancelCreation.emit(cncl);
  }

  filterPlayersWithNoTeam(){
    this.availablePlayers=this.allPlayers.filter(
      (player) => player.team === null
    );
    console.log("Available players: "+ this.availablePlayers);
  }

}
