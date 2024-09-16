import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { selectUserData } from '../store/user.selectors';
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';
import { deleteUser } from '../store/user.actions';
import { Observable } from 'rxjs';
import { DreamTeam } from '../entities/dreamteam';
import { deleteDreamteam, loadUserDreamTeams } from '../store/dreamteam.actions';
import { selectUserDreamTeams } from '../store/dreamteam.selectors';
import { DreamteamService } from '../dreamteam/dreamteam.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy{

  profileToDisplay: any;
  dreamTeams$: Observable<DreamTeam[]>=this.store.select(selectUserDreamTeams);
  //isViewProfile: boolean = false;
  //amSubscribed: boolean = false;
  @Input()
  isMe: boolean = false;

  fulldts:DreamTeam[]=[];
  
  constructor(
    private userService: UserService,
    private dreamteamService: DreamteamService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    
    this.store.select(selectUserData).subscribe((data) => {
      this.profileToDisplay = data;
    
      // if (this.profileToDisplay) {
      //   this.store.dispatch(loadUserDreamTeams({ userId: this.profileToDisplay.id }));
      // }
    });
    this.dreamTeams$.subscribe(dreamTeams => {
      this.fulldts = dreamTeams || []; // Assign the result to the local variable
      //console.log('DreamTeams:', this.fulldts); // Now you have access to the array of DreamTeam objects
    });

    this.getFullDts();
  }
  ngOnDestroy(): void {
  }

  deleteProfile() {
   this.store.dispatch(deleteUser({ id: this.profileToDisplay.id }));
   this.router.navigateByUrl('/sign-in');
  }

  newDreamTeam(){
    this.router.navigate(['/create-dreamteam'], { queryParams: { creatorId: this.profileToDisplay.id } });
  }

  showDt(dreamTeamId: number):void{
    //console.log(dreamTeamId);
    this.router.navigate(['show-dreamteam'],{queryParams:{dtId: dreamTeamId}});//(['/dreamteam', dreamTeamId], { queryParams: { creatorId: this.profileToDisplay.id } });
    //this.router.navigate(['dreamteam/:id'], { queryParams: { creatorId: this.profileToDisplay.id } });
  }
  novi: DreamTeam[]=[];
  getFullDts(){
    // this.fulldts.forEach(dt=>{
    //   let novi2 = this.dreamteamService.getDreamTeam(dt.id)
    //   this.novi.push(novi2);
    // })
    // console.log(this.novi);
    this.fulldts.forEach(dt => {
      this.dreamteamService.getDreamTeam(dt.id).subscribe(novi2 => {
        this.novi.push(novi2);  // Push the resolved value to your array
        // Optionally, log the updated array
      });
    });
    console.log(this.novi);
  }

  deleteDreamteam(id:number){
    this.store.dispatch(deleteDreamteam({id:id}));
    this.router.navigate(['/my-profile']);
  }
  //deleteDreamteam(dtid:number){}
}
