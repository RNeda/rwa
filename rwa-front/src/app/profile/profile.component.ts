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
  //dreamTeams$: Observable<DreamTeam[]>=this.store.select(selectAllDreamTeams);

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
  fromprofile:boolean=true;

  
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
    // this.store.dispatch(loadDreamTeams());
    // dreamTeams$ = this.store.select(selectAllDreamTeams).subscribe((data)=>{
    //   this.fulldts=data.filter(dt=>dt.creator.id===this.profileToDisplay.id);
    //  // console.log("fulldts after filter", this.fulldts);
    // })
    this.store.dispatch(loadDreamTeams());
    this.store.select(selectAllDreamTeams).subscribe(dreamTeams => {
      this.fulldts = dreamTeams.filter(dt=>dt.creator.id===this.profileToDisplay.id);//dreamTeams || []; 
      
      console.log('DreamTeams from fulldts:', [this.fulldts]); 
      //kupi id dreamteam-a koji je updateovan
      this.route.queryParams.subscribe(params => {
          if (params['dtId']) {
            this.updatedDtId = +params['dtId']; 
            this.store.dispatch(loadDreamTeam({ id: this.updatedDtId })); 
            this.store.select(selectSingleDreamTeam).subscribe((updatedDreamTeam)=>{
              if (updatedDreamTeam) {
                this.fulldts = this.fulldts.map(dt => 
                  dt.id === this.updatedDtId ? updatedDreamTeam : dt
                );
                
                //console.log("Updated DreamTeams list:", this.fulldts);
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
    this.store.dispatch(loadDreamTeams());
    this.store.select(selectAllDreamTeams).subscribe((data)=>{
      this.fulldts=data.filter(dt=>dt.creator.id===this.profileToDisplay.id);
     // console.log("fulldts after filter", this.fulldts);
    })
    //this.router.navigate(['/my-profile']);
    // this.store.select(selectAllDreamTeams).subscribe((data)=>{
    //   this.fulldts=[...data];
    // })
    //this.store.dispatch(login({email:this.profileToDisplay.email, password:this.profileToDisplay.password}));
    //}
  }

  showTeamsBtn(){
    // this.teamService.getTeams().subscribe((teamss)=>{
    //     this.allTeams=teamss;
    //   })
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
    this.store.select(selectAllTeams).subscribe((data)=>{
      this.allTeams=[...data];
    })
    
  }
  handleDreamTeamCreated(created:boolean): void {
    console.log("from profile: "+created);
    this.createDtFlag=!created;
    //this.store.dispatch(login({email:this.profileToDisplay.email, password:this.profileToDisplay.password}));
    //treba dodati dt useru!!!!
    // this.store.dispatch(loadUserDreamTeams());
    // //ovo vraca prethodne
    // this.store.select(selectUserDreamTeams).subscribe((data)=>{
    //   this.fulldts=[...data];
    //   console.log("user dts: ", this.fulldts);
    //   // if(data){
    //   //   this.fulldts=[...this.fulldts,data];
    //   // }
    // })
    this.store.dispatch(loadDreamTeams());
    this.store.select(selectAllDreamTeams).subscribe((data)=>{
      this.fulldts=data.filter(dt=>dt.creator.id===this.profileToDisplay.id);
      //console.log("fulldts after filter", this.fulldts);
    })
    
  }
  handleTeamDeleted(deleted:boolean){
    if(deleted===true){
      // this.teamService.getTeams().subscribe((teamss)=>{
      //   this.allTeams=teamss;
      // })
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

  
  // getFullDts(){
    
  //   this.fulldts.forEach(dt => {
  //     this.dreamteamService.getDreamTeam(dt.id).subscribe(novi2 => {
  //       this.novi.push(novi2);  
  //     });
  //   });
  //   console.log(this.novi);
  // }


}
