import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { catchError, map, Observable, of } from 'rxjs';
import { Game } from '../entities/game';
import { url } from '../../../environment/environment.dev';
import { loadGamesFailure, loadGamesSuccess } from '../store/game.actions';
import { GameDto } from '../entities/game.dto';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http:HttpClient, private store:Store<AppState>) { } //, private store:Store<AppState>

 // Method to get all games and dispatch action
  getGames(): Observable<Game[]> { //<Game[]>
    return this.http.get<Game[]>(`${url}/game`);
  }

  getGameById(id:number): Observable<Game>{
    return this.http.get<Game>(url+`/game/${id}`);
  }

  createGame(game: GameDto): Observable<Game> {
    return this.http.post<Game>(url+"/game", game);
  }
  
  deleteGame(id:number):Observable<void>{
    return this.http.delete<void>(`${url}/game/${id}`);
  }

}
