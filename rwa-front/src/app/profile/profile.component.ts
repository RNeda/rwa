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
import { deleteDreamteam, loadDreamTeam, loadUserDreamTeams } from '../store/dreamteam.actions';
import { selectDreamTeamById, selectSingleDreamTeam, selectUserDreamTeams } from '../store/dreamteam.selectors';
import { DreamteamService } from '../dreamteam/dreamteam.service';
import { Team } from '../entities/team';
import { TeamService } from '../team/team.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { ConfirmUpdateDialogComponent } from '../confirm-update-dialog/confirm-update-dialog.component';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy{

  profileToDisplay: any;
  dreamTeams$: Observable<DreamTeam[]>=this.store.select(selectUserDreamTeams);

  @Input()
  isMe: boolean = false;

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
  //deleteDT:boolean=false;

  
  constructor(
    private userService: UserService,
    private dreamteamService: DreamteamService,
    private teamService:TeamService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route:ActivatedRoute,
    public dialog:MatDialog,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
   
    this.store.select(selectUserData).subscribe((data) => {
    this.profileToDisplay = data;
    //console.log([this.profileToDisplay.dreamteams])
    });
   
    this.dreamTeams$.subscribe(dreamTeams => {
      this.fulldts = dreamTeams || []; 
      
      console.log('DreamTeams:', [this.fulldts]); 
      this.route.queryParams.subscribe(params => {
          if (params['dtId']) {
            this.updatedDtId = +params['dtId']; // Get the dtId from query params
            this.store.dispatch(loadDreamTeam({ id: this.updatedDtId })); // Dispatch to load DreamTeam
            this.store.select(selectSingleDreamTeam).subscribe((updatedDreamTeam)=>{
              if (updatedDreamTeam) {
                this.fulldts = this.fulldts.map(dt => 
                  dt.id === this.updatedDtId ? updatedDreamTeam : dt
                );
                
                console.log("Updated DreamTeams list:", this.fulldts);
              }
            });
          }
        });
    });

    //this.getFullDts();

    if(this.profileToDisplay.role==="admin"){
      this.isAdmin=true;
    }

    
  }
  ngOnDestroy(): void {
  }

  //buttons
  deleteProfile() {
   this.store.dispatch(deleteUser({ id: this.profileToDisplay.id }));
   this.router.navigateByUrl('/sign-in');
  }
  showDt(dreamTeamId: number):void{
    this.router.navigate(['show-dreamteam'],{queryParams:{dtId: dreamTeamId}});
  }
  updateDt(dreamTeamId:number){
    this.router.navigate(['update-dreamteam'], { queryParams: { dtId: dreamTeamId } });
  }

  deleteDreamteam(id:number){
    //if(this.deleteDT){
    this.store.dispatch(deleteDreamteam({id:id}));
    this.router.navigate(['/my-profile']);

    this.store.dispatch(login({email:this.profileToDisplay.email, password:this.profileToDisplay.password}));
    //}
  }

  showTeamsBtn(){
    this.teamService.getTeams().subscribe((teamss)=>{
        this.allTeams=teamss;
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

  newDreamTeam(){
    this.createDtFlag=true;
    //this.router.navigate(['/create-dreamteam'], { queryParams: { creatorId: this.profileToDisplay.id, creatoremail: this.profileToDisplay.email, creatorpass:this.profileToDisplay.password } });
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
        //this.deleteDT=true;
      } else {
        console.log('Delete cancelled');
      }
    });
  }

  
  //handle outputs
  handleTeamCreated(created:boolean): void {
    this.createTeamflag=!created;
  }
  handleDreamTeamCreated(created:boolean): void {
    console.log("from profile: "+created);
    this.createDtFlag=!created;
    this.store.dispatch(login({email:this.profileToDisplay.email, password:this.profileToDisplay.password}));

    
  }
  handleTeamDeleted(deleted:boolean){
    if(deleted===true){
      this.teamService.getTeams().subscribe((teamss)=>{
        this.allTeams=teamss;
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

  
  getFullDts(){
    
    this.fulldts.forEach(dt => {
      this.dreamteamService.getDreamTeam(dt.id).subscribe(novi2 => {
        this.novi.push(novi2);  
      });
    });
    console.log(this.novi);
  }


}
