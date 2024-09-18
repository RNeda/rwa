import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Observable } from 'rxjs';
import { Game } from '../entities/game';
import { selectAllGames } from '../store/game.selectors';
import { DreamTeam } from '../entities/dreamteam';
import { selectAllDreamTeams } from '../store/dreamteam.selectors';
import { loadGames, selectGame } from '../store/game.actions';
import { loadDreamTeams } from '../store/dreamteam.actions';
import { Router } from '@angular/router';
import { Team } from '../entities/team';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{

  games$: Observable<Game[]> = this.store.select(selectAllGames);
  dreamTeams$: Observable<DreamTeam[]> = this.store.select(selectAllDreamTeams);
  
  // childShowTeams:boolean |null=null;

  constructor(private store:Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(loadGames());
    this.store.dispatch(loadDreamTeams());
  }
  onSelectGame(): void {
    //this.store.dispatch(selectGame({ gameId }));
    //this.showteams=true;
  }

  onSelectTeam(): void {
    // Navigate to the team details route and pass the team id (or entire team object if necessary)
    //this.router.navigate(['/show-team'], { state: { team: team } });
    //this.showteams=true;
  }

  
  // changeFromChild(value:boolean){
  //   this.childShowTeams=value;
  //   this.showteams=this.childShowTeams;
  // }
}
