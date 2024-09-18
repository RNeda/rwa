import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../entities/game';
import { map, Observable, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { SelectSingleGame } from '../store/game.selectors';
import { AppState } from '../app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { loadGame } from '../store/game.actions';

@Component({
  selector: 'app-show-game',
  templateUrl: './show-game.component.html',
  styleUrl: './show-game.component.scss'
})
export class ShowGameComponent implements OnInit{
  @Input() game: Game|null=null;
  game$:Observable<Game|null>=this.store.select(SelectSingleGame);
  showteams:boolean=true;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')), // Get the 'id' parameter from the route
      switchMap(id => {
        if (id) {
          this.store.dispatch(loadGame({ id: +id })); // Dispatch the action with the ID
        }
        return this.game$; // Return the observable to be used in the template
      })
    ).subscribe();
    if(this.game){
      console.log("each game:" + [this.game.resTeam1]);

    }
  }

  showTeams(){
    this.showteams=true;
  }
  hideTeams(){
    this.showteams=false;
  }
}
