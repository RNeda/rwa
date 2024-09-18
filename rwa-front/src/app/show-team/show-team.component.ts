import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from '../entities/team';
import { map, Observable, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { loadTeam } from '../store/team.actions';
import { selectSingleTeam } from '../store/team.selectors';

@Component({
  selector: 'app-show-team',
  templateUrl: './show-team.component.html',
  styleUrl: './show-team.component.scss'
})
export class ShowTeamComponent implements OnInit{

  @Input() team: Team | null = null;
  team$: Observable<Team | null> = this.store.select(selectSingleTeam);
  //@Output() valueSent = new EventEmitter<boolean>();
  //tId: number | null = null;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
      
    // if (!this.team) {
    //   // If no input, try to load it from the query params
    //   this.route.queryParams.subscribe(params => {
    //     if (params['tId']) {
    //       this.tId = +params['tId']; // Get the dtId from query params
    //       this.store.dispatch(loadTeam({ id: this.tId })); // Dispatch to load DreamTeam
    //     }
    //   });
    // }

    this.route.paramMap.pipe(
      map(params => params.get('id')), // Get the 'id' parameter from the route
      switchMap(id => {
        if (id) {
          this.store.dispatch(loadTeam({ id: +id })); // Dispatch the action with the ID
        }
        return this.team$; // Return the observable to be used in the template
      })
    ).subscribe();
  }

  // goBack(){
  //   //this.router.navigate(['/home-page']);
  //   const valuetoSend=false;
  //   this.valueSent.emit(valuetoSend);
  // }

}
