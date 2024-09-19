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
import { selectUserData } from '../store/user.selectors';
import { User } from '../entities/user';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{

  games$: Observable<Game[]> = this.store.select(selectAllGames);
  dreamTeams$: Observable<DreamTeam[]> = this.store.select(selectAllDreamTeams);
  user:any;
  alldreamteams:DreamTeam[]=[];
  othersdts:DreamTeam[]=[];
  hpfleg:boolean=true;
  // childShowTeams:boolean |null=null;

  constructor(private store:Store<AppState>, private router: Router) { }

  ngOnInit(): void {

    this.store.select(selectUserData).subscribe((data)=>{
      this.user=data;
    });

    this.store.dispatch(loadGames());
    this.store.dispatch(loadDreamTeams());
    this.store.select(selectAllDreamTeams).subscribe((dts)=>{
      this.alldreamteams=dts;
    })
    this.filterDreamTeams();
  }
  
  filterDreamTeams(){
    this.othersdts=this.alldreamteams.filter(
      (dt)=>dt.creator.id!==this.user.id
    )
  }

}
