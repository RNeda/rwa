import { Component, Input, OnInit } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { DreamTeam } from '../entities/dreamteam';
import { selectSingleDreamTeam } from '../store/dreamteam.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { loadDreamTeam } from '../store/dreamteam.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-dreamteam',
  templateUrl: './show-dreamteam.component.html',
  styleUrl: './show-dreamteam.component.scss'
})
export class ShowDreamteamComponent implements OnInit{
  @Input() dreamTeam: DreamTeam | null = null;
  dreamTeam$: Observable<DreamTeam | null> = this.store.select(selectSingleDreamTeam);

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // const dreamTeamId = 1; // Replace with the actual ID or use route params
    // this.store.dispatch(loadDreamTeam({ id: dreamTeamId }));
    this.route.paramMap.pipe(
      map(params => params.get('id')), // Get the 'id' parameter from the route
      switchMap(id => {
        if (id) {
          this.store.dispatch(loadDreamTeam({ id: +id })); // Dispatch the action with the ID
        }
        return this.dreamTeam$; // Return the observable to be used in the template
      })
    ).subscribe();
  }
}
