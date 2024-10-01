import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { selectUserData } from '../store/user.selectors';
import { deleteUser, login } from '../store/user.actions';
import { Observable } from 'rxjs';
import { DreamTeam } from '../entities/dreamteam';
import { deleteDreamteam, loadDreamTeam, loadDreamTeams, loadUserDreamTeams } from '../store/dreamteam.actions';
import { selectAllDreamTeams, selectDreamTeamById, selectSingleDreamTeam, selectUserDreamTeams } from '../store/dreamteam.selectors';
import { DreamteamService } from '../dreamteam/dreamteam.service';
import { Team } from '../entities/team';
import { TeamService } from '../team/team.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { ConfirmUpdateDialogComponent } from '../confirm-update-dialog/confirm-update-dialog.component';
import { selectAllTeams } from '../store/team.selectors';
import { loadTeams } from '../store/team.actions';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  profileToDisplay: any;
  @Input() isMe: boolean = false;
  isAdmin:boolean=false;
  createTeamflag:boolean=false;
  createDtFlag:boolean=false;
  createPlayerflag:boolean=false;
  showTeams:boolean=false;
  allTeams:Team[]=[];
  fulldts:DreamTeam[]=[];
  showteamsbtn:string[]=["Show teams", "Hide teams"];
  showteamsbtntext:string=this.showteamsbtn[0];
  novi: DreamTeam[]=[];
  updatedDtId:number=0;
  fromprofile:boolean=true;

  
  constructor(
    private router: Router,
    private route:ActivatedRoute,
    public dialog:MatDialog,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
   
    this.store.select(selectUserData).subscribe((data) => {
    this.profileToDisplay = data;
    });
    this.store.dispatch(loadDreamTeams());
    this.store.select(selectAllDreamTeams).subscribe(dreamTeams => {
      this.fulldts = dreamTeams.filter(dt=>dt.creator.id===this.profileToDisplay.id); 
      
      //console.log('DreamTeams from fulldts:', [this.fulldts]); 
      //kupi id dreamteam-a koji je update-ovan
      this.route.queryParams.subscribe(params => {
          if (params['dtId']) {
            this.updatedDtId = +params['dtId']; 
            this.store.dispatch(loadDreamTeam({ id: this.updatedDtId })); 
            this.store.select(selectSingleDreamTeam).subscribe((updatedDreamTeam)=>{
              if (updatedDreamTeam) {
                this.fulldts = this.fulldts.map(dt => 
                  dt.id === this.updatedDtId ? updatedDreamTeam : dt
                );
              }
            });
          }
        });
    });
    if(this.profileToDisplay.role==="admin"){
      this.isAdmin=true;
    } 
  }
 

  deleteProfile() {
   this.store.dispatch(deleteUser({ id: this.profileToDisplay.id }));
   this.router.navigateByUrl('/sign-in');
  }

  //dreamteam
  showDt(dreamTeamId: number):void{
    this.router.navigate(['show-dreamteam'],{queryParams:{dtId: dreamTeamId}});
  }
  updateDt(dreamTeamId:number){
    this.router.navigate(['update-dreamteam'], { queryParams: { dtId: dreamTeamId } });
  }
  newDreamTeam(){
    this.createDtFlag=true;
  }
  deleteDreamteam(id:number){
    this.store.dispatch(deleteDreamteam({id:id}));
    this.store.dispatch(loadDreamTeams());
    this.store.select(selectAllDreamTeams).subscribe((data)=>{
      this.fulldts=data.filter(dt=>dt.creator.id===this.profileToDisplay.id);
    })
  }


  //team
  showTeamsBtn(){
    this.store.dispatch(loadTeams());
    this.store.select(selectAllTeams).subscribe((data)=>{
      this.allTeams=[...data];
      this.allTeams=this.allTeams.filter(t=>t.players.length>0);
    })
    if(this.showTeams===true){
      this.showteamsbtntext=this.showteamsbtn[1];
      this.showTeams=false;
      this.showteamsbtntext=this.showteamsbtn[0];
    }
    else{
      if(this.showTeams===false){
        this.showteamsbtntext=this.showteamsbtn[0];
        this.showTeams=true;
        this.showteamsbtntext=this.showteamsbtn[1];
      }
    }
  }
  newTeam(){
    this.createTeamflag=true;
  }


  newGame(){
    this.router.navigate(['/create-game']);
  }
  newPlayer(){
    this.createPlayerflag=true;
  }

  //confirm dialogs
  openDeleteDialog(id:number,whatAction:number): void {
    //whatAction:
    //1-deleteProfile()
    //2-deleteDreamteam()
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        switch(whatAction){
          case 1:
            this.deleteProfile();
            break;
          case 2:
            this.deleteDreamteam(id);
            break;
          default:
            console.log('Unknown status');
        }
      } else {
        console.log('Delete cancelled');
      }
    });
  }

  
  //handle outputs
  handleTeamCreated(created:boolean): void {
    this.createTeamflag=!created;
    this.store.select(selectAllTeams).subscribe((data)=>{
      this.allTeams=[...data];
    }) 
  }

  handleDreamTeamCreated(created:boolean): void {
    console.log("from profile: "+created);
    this.createDtFlag=!created;
    this.store.dispatch(loadDreamTeams());
    this.store.select(selectAllDreamTeams).subscribe((data)=>{
      this.fulldts=data.filter(dt=>dt.creator.id===this.profileToDisplay.id);
    })
  }

  handleTeamDeleted(deleted:boolean){
    if(deleted===true){
      this.store.select(selectAllTeams).subscribe((data)=>{
        this.allTeams=[...data];
      })
    }
  }

  handleCancelCreation(cncl:boolean):void{
    this.createTeamflag=!cncl;
  }
  handleCancelDreamTeamCreation(cncl:boolean):void{
    this.createDtFlag=!cncl;
  }

  handlePlayerCreated(created:boolean):void{
    this.createPlayerflag=!created;
  }
  handleCancelPlayerCreation(cncl:boolean):void{
    this.createPlayerflag=!cncl;
  }
}
