import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { catchError, map, Observable, of } from 'rxjs';
import { Game } from '../entities/game';
import { url } from '../../../environment/environment.dev';
import { loadGamesFailure, loadGamesSuccess } from '../store/game.actions';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http:HttpClient, private store:Store<AppState>) { } //, private store:Store<AppState>

 // Method to get all games and dispatch action
 getGames(): Observable<Game[]> { //<Game[]>
  //console.log("usao u get games"+ url);
  return this.http.get<Game[]>(`${url}/game`);
  // this.http.get<Game[]>(url).pipe(
  //   map(games => this.store.dispatch(LoadGamesSuccess({ games }))),
  //   catchError(error => {
  //     this.store.dispatch(loadGamesFailure({ error }));
  //     return of([]);
  //   })
  // ).subscribe(); // Subscribe to execute the observable
}

  getGameById(id:number): Observable<Game>{
    return this.http.get<Game>(url+`/game/${id}`);
  }

  createGame(game: Game): Observable<Game> {
    return this.http.post<Game>(url+"/game", game);
  }
  // // Method to create a new game and dispatch action
  // createGame(game: Game): void {
  //   this.http.post<Game>(url, game).pipe(
  //     map(newGame => this.store.dispatch(createGameSuccess({ game: newGame }))),
  //     catchError(error => {
  //       this.store.dispatch(createGameFailure({ error }));
  //       return of(null);
  //     })
  //   ).subscribe(); // Subscribe to execute the observable
  // }

  // // Method to update an existing game and dispatch action
  // updateGame(game: Game): void {
  //   this.http.put<Game>(`${this.apiUrl}/${game.id}`, game).pipe(
  //     map(updatedGame => this.store.dispatch(updateGameSuccess({ game: updatedGame }))),
  //     catchError(error => {
  //       this.store.dispatch(updateGameFailure({ error }));
  //       return of(null);
  //     })
  //   ).subscribe(); // Subscribe to execute the observable
  // }

  // // Method to delete a game by ID and dispatch action
  // deleteGame(id: number): void {
  //   this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
  //     map(() => this.store.dispatch(deleteGameSuccess({ id }))),
  //     catchError(error => {
  //       this.store.dispatch(deleteGameFailure({ error }));
  //       return of();
  //     })
  //   ).subscribe(); // Subscribe to execute the observable
  // }
}
