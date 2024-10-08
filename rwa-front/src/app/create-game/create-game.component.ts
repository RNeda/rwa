import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { selectAllTeams } from '../store/team.selectors';
import { loadTeams } from '../store/team.actions';
import { GameDto } from '../entities/game.dto';
import { createGame } from '../store/game.actions';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmCreateDialogComponent } from '../confirm-create-dialog/confirm-create-dialog.component';
import { Team } from '../entities/team';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrl: './create-game.component.scss'
})
export class CreateGameComponent implements OnInit{

  teams$=this.store.select(selectAllTeams);
  allTeams:Team[]|null=null;
  selectedTeams:number[]=[];
  selectedTeam1:number|null=null;
  selectedTeam2:number|null=null;
  resTeam1:number=0;
  resTeam2:number=0;
  constructor(private store: Store<AppState>,private router:Router,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(loadTeams());
    this.teams$.subscribe((data)=>{
      this.allTeams=data;
      this.allTeams=this.allTeams.filter(t=>t.players.length>0);
    })
  }

  toggleTeamSelection(teamId: number, teamNumber: number): void {
    //ako smo neki tim selektovali za prvi, ne mzemo ga izabrati kao drugi
    if (teamNumber === 1) {
      this.selectedTeam1 = teamId;
    } else if (teamNumber === 2) {
      this.selectedTeam2 = teamId;
    }

    this.updateSelectedTeams();
  }

  updateSelectedTeams(): void {
    this.selectedTeams = [];

    if (this.selectedTeam1 !== null) {
      this.selectedTeams.push(this.selectedTeam1);
    }

    if (this.selectedTeam2 !== null) {
      this.selectedTeams.push(this.selectedTeam2);
    }

  }

  createGame(){
    const newGame:GameDto={
      resTeam1:this.resTeam1,
      resTeam2:this.resTeam2,
      teamids:this.selectedTeams,
    };
    this.store.dispatch(createGame({game:newGame}));
    this.router.navigate(['/my-profile']);
    this.createConfirm();
  }

  cancelGame(){
    this.router.navigate(['/my-profile']);
  }

  createConfirm(): void {
    const dialogRef = this.dialog.open(ConfirmCreateDialogComponent, {
      width: '300px',
    });

  }
}
