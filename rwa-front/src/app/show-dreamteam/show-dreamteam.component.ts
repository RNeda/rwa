import { Component, Input, OnInit } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { DreamTeam } from '../entities/dreamteam';
import { selectDreamTeamById, selectSingleDreamTeam } from '../store/dreamteam.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { loadDreamTeam, updateDreamTeam } from '../store/dreamteam.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { DreamTeamDto } from '../entities/dreamteam.dto';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmUpdateDialogComponent } from '../confirm-update-dialog/confirm-update-dialog.component';

@Component({
  selector: 'app-show-dreamteam',
  templateUrl: './show-dreamteam.component.html',
  styleUrl: './show-dreamteam.component.scss'
})
export class ShowDreamteamComponent implements OnInit{
  @Input() dreamTeam: DreamTeam | null = null;
  dreamTeam$: Observable<DreamTeam | null> = this.store.select(selectSingleDreamTeam);
  dtId: number | null = null;
  updateddt:DreamTeam|null=null;
  creatorName:string="";
  creatorId:number=0;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router:Router, public dialog:MatDialog) {}

  ngOnInit(): void {
   
    if(this.dreamTeam){
      this.creatorName=this.dreamTeam.creator.name;
      this.creatorId=this.dreamTeam.creator.id;
    }
    if (!this.dreamTeam) {
      // ako nije iz input, ucitaj iz query params
      this.route.queryParams.subscribe(params => {
        if (params['dtId']) {
          this.dtId = +params['dtId']; 
          this.store.dispatch(loadDreamTeam({ id: this.dtId })); 
        }
      });
    }

    this.route.paramMap.pipe(
      map(params => params.get('id')), 
      switchMap(id => {
        if (id) {
          this.store.dispatch(loadDreamTeam({ id: +id })); 
        }
        return this.dreamTeam$; 
      })
    ).subscribe();

  }

  changeLikes():void{
    if (this.dreamTeam) {
      const updates = new DreamTeamDto(1, this.dreamTeam.name, [], this.creatorId);
      //console.log("likes before: "+this.dreamTeam.likes);
      this.store.dispatch(updateDreamTeam({ id: this.dreamTeam.id, updates }));
      const dt=this.store.select(selectDreamTeamById(this.dreamTeam.id)).subscribe((data) => {
        if(data){this.updateddt = data}
        this.dreamTeam=this.updateddt;
        //console.log([this.updateddt?.creator.name])
        });
      //console.log("likes after: "+this.dreamTeam.likes);
    }
  }

  changeDislikes():void{
    if (this.dreamTeam) {
      const updates = new DreamTeamDto(2, this.dreamTeam.name, [], this.creatorId);
      //console.log("dislikes before: "+this.dreamTeam.dislikes);

      this.store.dispatch(updateDreamTeam({ id: this.dreamTeam.id, updates }));
      const dt=this.store.select(selectDreamTeamById(this.dreamTeam.id)).subscribe((data) => {
        if(data){this.updateddt = data}
        this.dreamTeam=this.updateddt;
        //console.log([this.updateddt?.creator.name])
        });
      //console.log("dislikes after: "+this.dreamTeam.dislikes);

    }
  }
  
  updateDT(dreamTeamId:number){
    this.router.navigate(['update-dreamteam'], { queryParams: { dtId: dreamTeamId } });
  }
  goBackToProfile(){
    this.router.navigate(['/my-profile']);
  }
}
