import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { map, Observable, startWith, tap } from 'rxjs';
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
  searchTermFlag:boolean=false;
  termToSearch:string="";
  filteredGames$: Observable<Game[]>=this.games$.pipe(startWith([]));//, tap(filteredGames => console.log('Filtered Games Before:', filteredGames)));
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
      this.filterDreamTeams();

    })
   
    
  }
  
  filterDreamTeams(){
    this.othersdts=this.alldreamteams.filter(
      (dt)=>dt.creator.id!==this.user.id
    )
    console.log("user:" + this.user.name+"filtered dts:" + this.othersdts);
  }

  handleTermToSearch(term:string):void{
    this.searchTermFlag=true;
    this.termToSearch=term;
    //console.log("term to search "+ this.termToSearch);
    //ako imam pretragu po nazivu tima
    if(this.termToSearch!==""){

      this.filteredGames$ = this.games$.pipe(
        map(games => games.filter(game => 
          
          game.teams.some(team => team.name === this.termToSearch), // Check if any team matches the team name
          //console.log("term to search:"+ this.termToSearch),
        )),
        tap(filteredGames => console.log('Filtered Games:', filteredGames))
        // ,startWith([])
      );
    }
  }

}
