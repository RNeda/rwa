import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../entities/player';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { url } from '../../../environment/environment.dev';
import { PlayerDto } from '../entities/player.dto';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  getPlayer(id:number):Observable<Player>{
    return this.http.get<Player>(`${url}/player/${id}`);
  }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${url}/player`);
  }
  createPlayer(player: PlayerDto): Observable<Player> {
    return this.http.post<Player>(`${url}/player`, player);
  }

  deletePlayer(id: number): Observable<void> {
    return this.http.delete<void>(`${url}/player/${id}`);
  }
}
