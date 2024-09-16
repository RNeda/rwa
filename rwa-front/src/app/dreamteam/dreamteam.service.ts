import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Observable } from 'rxjs';
import { DreamTeam } from '../entities/dreamteam';
import { url } from '../../../environment/environment.dev';
import { Player } from '../entities/player';
import { DreamTeamDto } from '../entities/dreamteam.dto';

@Injectable({
  providedIn: 'root'
})
export class DreamteamService {

  constructor(private http: HttpClient, private store:Store<AppState>) { }

  getDreamTeams(): Observable<DreamTeam[]> {
    return this.http.get<DreamTeam[]>(`${url}/dreamteam`);
  }

  getDreamTeam(id: number): Observable<DreamTeam> {
    console.log("get dt service id: "+id);
    return this.http.get<DreamTeam>(`${url}/dreamteam/${id}`);
  }

  getDreamTeamsByUserId(userId: number): Observable<DreamTeam[]> {
    return this.http.get<DreamTeam[]>(`${url}/users/${userId}/dreamteams`);
  }

  getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${url}/player`);
  }

  createDreamTeam(dreamTeam: DreamTeamDto): Observable<DreamTeam> {
    return this.http.post<DreamTeam>(`${url}/dreamteam`, dreamTeam);
  }

  deleteDreamTeam(id: number): Observable<void> {
    return this.http.delete<void>(`${url}/dreamteam/${id}`);
  }

  updateDreamTeam(id: number, updates: DreamTeamDto): Observable<DreamTeam> {
    return this.http.put<DreamTeam>(`${url}/dreamteam/${id}`, updates);
  }

}
