import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { selectAllTeams } from '../store/team.selectors';
import { loadTeams } from '../store/team.actions';
import { GameDto } from '../entities/game.dto';
import { createGame } from '../store/game.actions';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrl: './create-game.component.scss'
})
export class CreateGameComponent implements OnInit{

  teams$=this.store.select(selectAllTeams);
  selectedTeams:number[]=[];
  selectedTeam1:number|null=null;
  selectedTeam2:number|null=null;
  resTeam1:number=0;
  resTeam2:number=0;
  constructor(private store: Store<AppState>,private router:Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(loadTeams());
  }

  // toggleTeamSelection(teamId:number):void{
  //   const index = this.selectedTeams.indexOf(teamId);
  //   if(index>-1){
  //     this.selectedTeams.splice(index,1);
  //   }else{
  //     this.selectedTeams.push(teamId);
  //   }
  // }

  toggleTeamSelection(teamId: number, teamNumber: number): void {
    if (teamNumber === 1) {
      this.selectedTeam1 = teamId;
    } else if (teamNumber === 2) {
      this.selectedTeam2 = teamId;
    }

    // Update the `selectedTeams` array with the current selections
    this.updateSelectedTeams();
  }

  // Add both selected teams (if any) to the `selectedTeams` array
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

  }

  cancelGame(){
    this.router.navigate(['/my-profile']);
  }
}
