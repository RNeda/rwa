import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { logout } from '../store/user.actions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  constructor(private router:Router,private store:Store<AppState>) { }

  createDreamTeam(){
    //this.router.navigate(['/kreiraj drim ti  komponenta'];)
  }

  homepage(){
    this.router.navigate(['/home-page']);
  }
  searchTeams(){
    //this.router.navigate(['/']);
  }
  goToProfile() {
    this.router.navigate(['/my-profile']);
  }
  signOut() {
   
    // this.mainPageGuard.setGuardStatus(false);
    // this.profileGuard.setGuardStatus(false);
    this.store.dispatch(logout());
    //this.store.dispatch(emptySearch());

    this.router.navigate(['/sign-in']);
  }
}
