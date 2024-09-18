import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Team } from '../entities/team';
import { Observable } from 'rxjs';
import { url } from '../../../environment/environment.dev';
import { Player } from '../entities/player';
import { TeamDto } from '../entities/team.dto';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient, private store:Store<AppState>) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${url}/team`);
  }

  getTeam(id: number): Observable<Team> {
    //console.log("get dt service id: "+id);
    return this.http.get<Team>(`${url}/team/${id}`);
  }

  getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${url}/player`);
  }

  createTeam(team: TeamDto): Observable<Team> {
    return this.http.post<Team>(`${url}/team`, team);
  }

  deleteTeam(id: number): Observable<void> {
    return this.http.delete<void>(`${url}/team/${id}`);
  }

  getAvailablePlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${url}/player`);
    //ovo vraca sve playere
  }
}
