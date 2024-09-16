import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { selectAllGames,  } from '../store/game.selectors';
import { loadGames, selectGame } from '../store/game.actions';

@Component({
  selector: 'app-guest-page',
  templateUrl: './guest-page.component.html',
  styleUrl: './guest-page.component.scss'
})
export class GuestPageComponent implements OnInit{

  constructor(private store:Store<AppState>){}
  
  //selectedGame$ = this.store.select(selectSelectedGame);
  games$ = this.store.select(selectAllGames);
  

  ngOnInit(): void {
    
    this.store.dispatch(loadGames());
  }

  onSelectGame(gameId: number): void {
    this.store.dispatch(selectGame({ gameId }));
  }

}
