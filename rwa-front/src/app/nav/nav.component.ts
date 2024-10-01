import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  showSearchInput = false; 
  searchTerm: string = ''; 
  userLogged:boolean=false;
  @Output() termToSearch = new EventEmitter<string>();
  @Output() stopSearch = new EventEmitter<boolean>();
  @Input() fromProfile!:boolean;

  constructor(private router:Router,private store:Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(selectUserData).subscribe((data)=>{
      if(data){
        this.userLogged=true;
      }
    })
    //console.log("this.fromprofile: ", this.fromProfile);
  }
  homepage(){
    this.router.navigate(['/home-page']);
  }
  goBack(){
    this.showSearchInput = !this.showSearchInput;
    this.stopSearch.emit(true);
  }
  searchTeams(){
    this.showSearchInput = !this.showSearchInput; 
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
