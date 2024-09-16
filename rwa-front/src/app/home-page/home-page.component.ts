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

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{

  games$: Observable<Game[]> = this.store.select(selectAllGames);
  dreamTeams$: Observable<DreamTeam[]> = this.store.select(selectAllDreamTeams);
  
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadGames());
    this.store.dispatch(loadDreamTeams());
  }
  onSelectGame(gameId: number): void {
    this.store.dispatch(selectGame({ gameId }));
  }
}
