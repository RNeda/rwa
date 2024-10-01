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
  allGames:Game[]=[];
  alldreamteams:DreamTeam[]=[];
  othersdts:DreamTeam[]=[];
  hpfleg:boolean=true;
  searchTermFlag:boolean=false;
  termToSearch:string="";
  stopSearch:boolean=false;
  filteredGames$: Observable<Game[]>=this.games$.pipe(startWith([]));
  filteredGames:Game[]=[];
  fromprofile:boolean=false;


  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {

    this.store.select(selectUserData).subscribe((data)=>{
      this.user=data;
    });
    
    this.store.dispatch(loadGames());
    this.games$.subscribe((data)=>{
      this.allGames=data;
      this.allGames=this.sortGames(this.allGames);
      //console.log("all games: ", this.allGames);
    });
   
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
    //console.log("user:" + this.user.name+"filtered dts:" + this.othersdts);
  }

  handleTermToSearch(term:string):void{
    this.searchTermFlag=true;
    this.stopSearch=true;
    let termToUpper=term;
    this.termToSearch=termToUpper.charAt(0).toUpperCase() + termToUpper.slice(1);
    //console.log("term to search "+ this.termToSearch);
    //ako imam pretragu po nazivu tima
    if(this.termToSearch!==""){

      this.filteredGames$ = this.games$;
      this.filteredGames$=this.filteredGames$.pipe(
        map(games => games.filter(game => 
          
          game.teams.some(team => team.name === this.termToSearch), 
        )),
        tap(filteredGames => console.log('Filtered Games:', filteredGames))
      );
      this.filteredGames$.subscribe((data)=>this.filteredGames=data);
      this.filteredGames=this.sortGames(this.filteredGames);
    }
  }

  handleStopSearch(stop:boolean){
    this.stopSearch=stop;
    this.searchTermFlag=false;
  }

  sortGames(forSort:Game[]):Game[]{
    let games:Game[] = [];
    forSort.forEach(g=>{
      if(g.resTeam1!==3 && g.resTeam2!==3){
        games.push(g);
      }
    });
    forSort.forEach(g=>{
      if(!games.some(game=>game.id===g.id)){
        games.push(g);
      }
    });
    forSort=games;
    return forSort;
  }

}
