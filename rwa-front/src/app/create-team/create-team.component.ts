import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { selectAllPlayers } from '../store/team.selectors';
import { createTeam, loadPlayers } from '../store/team.actions';
import { TeamDto } from '../entities/team.dto';
import { Player } from '../entities/player';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmCreateDialogComponent } from '../confirm-create-dialog/confirm-create-dialog.component';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrl: './create-team.component.scss'
})
export class CreateTeamComponent implements OnInit{

  selectedPlayers: number[] = [];
  teamName: string = "";
  allPlayers:Player[] = [];
  availablePlayers:Player[]=[];
  @Output() teamCreated = new EventEmitter<boolean>();
  @Output() cancelCreation = new EventEmitter<boolean>();

  constructor(private store: Store<AppState>, private dialog:MatDialog) {}


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
      this.selectedPlayers.splice(index, 1); 
    } else {
      this.selectedPlayers.push(playerId); 
    }
  }

  createTeam():void{
    const newTeam:TeamDto={name:this.teamName, playerids:this.selectedPlayers};
    this.store.dispatch(createTeam({team:newTeam}));
    const created:boolean=true;
    this.teamCreated.emit(created);
    this.createConfirm();
  }

  cancelTeam():void{
    const cncl:boolean=true;
    this.cancelCreation.emit(cncl);
  }

  filterPlayersWithNoTeam():void{
    this.availablePlayers=this.allPlayers.filter(
      (player) => player.team === null
    );
    //console.log("Available players: "+ this.availablePlayers);
  }

  createConfirm(): void {
    const dialogRef = this.dialog.open(ConfirmCreateDialogComponent, {
      width: '300px',
    });

  }
}
