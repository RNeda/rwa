import { Component, Input, OnInit } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { DreamTeam } from '../entities/dreamteam';
import { selectSingleDreamTeam } from '../store/dreamteam.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { loadDreamTeam, updateDreamTeam } from '../store/dreamteam.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { DreamTeamDto } from '../entities/dreamteam.dto';

@Component({
  selector: 'app-show-dreamteam',
  templateUrl: './show-dreamteam.component.html',
  styleUrl: './show-dreamteam.component.scss'
})
export class ShowDreamteamComponent implements OnInit{
  @Input() dreamTeam: DreamTeam | null = null;
  dreamTeam$: Observable<DreamTeam | null> = this.store.select(selectSingleDreamTeam);
  dtId: number | null = null;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
    // const dreamTeamId = 1; // Replace with the actual ID or use route params
    // this.store.dispatch(loadDreamTeam({ id: dreamTeamId }));
    // if(this.dreamTeam===null){
    //   this.route.queryParams.subscribe(params=>{
    //     this.dtId=params['dtId'];
    //   })
    //   this.store.dispatch(loadDreamTeam({id: +this.dtId}));
    // }
    if (!this.dreamTeam) {
      // If no input, try to load it from the query params
      this.route.queryParams.subscribe(params => {
        if (params['dtId']) {
          this.dtId = +params['dtId']; // Get the dtId from query params
          this.store.dispatch(loadDreamTeam({ id: this.dtId })); // Dispatch to load DreamTeam
        }
      });
    }

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

  changeLikes():void{
    if (this.dreamTeam) {
      const updates = new DreamTeamDto(1, this.dreamTeam.name, [], this.dreamTeam.creator.id);
      this.store.dispatch(updateDreamTeam({ id: this.dreamTeam.id, updates }));
      console.log("userid after like: "+ this.dreamTeam.creator.id);
    }
  }

  changeDislikes():void{
    if (this.dreamTeam) {
      const updates = new DreamTeamDto(2, this.dreamTeam.name, [], this.dreamTeam.creator.id);
      this.store.dispatch(updateDreamTeam({ id: this.dreamTeam.id, updates }));
    }
  }
  
  updateDT(dreamTeamId:number){
    this.router.navigate(['update-dreamteam'], { queryParams: { dtId: dreamTeamId } });

  }
  goBackToProfile(){
    this.router.navigate(['/my-profile']);
  }

}
