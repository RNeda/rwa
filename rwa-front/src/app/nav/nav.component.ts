import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { logout } from '../store/user.actions';
import { selectUserData } from '../store/user.selectors';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit{

  
  showSearchInput = false; // Track whether the search input is visible
  searchTerm: string = ''; // Store the search term
  userLogged:boolean=false;
  @Output() termToSearch = new EventEmitter<string>();

  constructor(private router:Router,private store:Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(selectUserData).subscribe((data)=>{
      if(data){
        this.userLogged=true;
      }
    })
  }
  homepage(){
    this.router.navigate(['/home-page']);
  }
 
  searchTeams(){
      this.showSearchInput = !this.showSearchInput; // Toggle input visibility
  }
  goToProfile() {
    this.router.navigate(['/my-profile']);
  }
  signOut() {
   
    this.store.dispatch(logout());
    this.router.navigate(['/guest-page']);
  }

  performSearch(): void {
    if (this.searchTerm) {
      console.log("search term from nav:"+ this.searchTerm);
      this.termToSearch.emit(this.searchTerm);
    }
  }
  
}
