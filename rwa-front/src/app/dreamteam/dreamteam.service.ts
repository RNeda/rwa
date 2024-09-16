import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Observable } from 'rxjs';
import { DreamTeam } from '../entities/dreamteam';
import { url } from '../../../environment/environment.dev';

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
}
