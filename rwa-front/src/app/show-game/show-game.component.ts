import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../entities/game';
import { map, Observable, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { SelectSingleGame } from '../store/game.selectors';
import { AppState } from '../app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { deleteGame, loadGame } from '../store/game.actions';
import { selectUserData } from '../store/user.selectors';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-show-game',
  templateUrl: './show-game.component.html',
  styleUrl: './show-game.component.scss'
})
export class ShowGameComponent implements OnInit{
  @Input() game: Game|null=null;
  @Input() fromHP:boolean=false;
  game$:Observable<Game|null>=this.store.select(SelectSingleGame);
  showteams:boolean=false;
  buttonText:string[]=["Show details", "Hide details"];
  currText:string=this.buttonText[0];
  isAdmin:boolean=false;
  profileToDisplay: any;
  isLive:boolean=false;


  constructor(
    private store: Store<AppState>, 
    private route: ActivatedRoute, 
    private router:Router,
    public dialog:MatDialog,
  ) {}

  ngOnInit(): void {

    this.store.select(selectUserData).subscribe((data) => {
      this.profileToDisplay = data;
    });
    if(this.profileToDisplay.role==="admin"){
      this.isAdmin=true;
    }
    
    this.route.paramMap.pipe(
      map(params => params.get('id')), 
      switchMap(id => {
        if (id) {
          this.store.dispatch(loadGame({ id: +id })); 
        }
        return this.game$; 
      })
    ).subscribe();
    if(this.game?.resTeam1!==3 && this.game?.resTeam2!==3){
      this.isLive=true;
    }
    
  }

  showTeams(){
    if(this.showteams===true){
      this.currText=this.buttonText[1];
      this.showteams=false;
      this.currText=this.buttonText[0];
    }
    else{
      if(this.showteams===false){
        this.currText=this.buttonText[0];
        this.showteams=true;
        this.currText=this.buttonText[1];
      }
    }
  }
  
  deleteGame(id:number){
    this.store.dispatch(deleteGame({id:id}));
  }

  openDeleteDialog(id:number): void {
    //whatAction:
    //1-deleteProfile()
    //2-deleteDreamteam()
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteGame(id);
      } else {
        console.log('Delete cancelled');
      }
    });
  }

  openSimulation(gameid:number){
    this.router.navigate(['/simulacija'],{ queryParams: { id: gameid }});
  }
}
