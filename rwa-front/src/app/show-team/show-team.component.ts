import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from '../entities/team';
import { map, Observable, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { deleteTeam, loadTeam } from '../store/team.actions';
import { selectSingleTeam } from '../store/team.selectors';
import { TeamService } from '../team/team.service';
import { User } from '../entities/user';
import { selectUserData } from '../store/user.selectors';

@Component({
  selector: 'app-show-team',
  templateUrl: './show-team.component.html',
  styleUrl: './show-team.component.scss'
})
export class ShowTeamComponent implements OnInit{

  @Input() team: Team | null = null;
  @Input() showDeleteBtn:boolean = false;
  @Input() fromG:boolean=false;
  @Output() teamDeleted = new EventEmitter<boolean>();
  fullteam:Team | null=null;
  user:any;
  //team$: Observable<Team | null> = this.store.select(selectSingleTeam);
  //@Output() valueSent = new EventEmitter<boolean>();
  //tId: number | null = null;
  isAdmin:boolean=false;
  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router:Router,private teamService:TeamService) {}

  ngOnInit(): void {
      
    this.store.select(selectUserData).subscribe((data)=>{
      this.user=data;
      //console.log("users role from show team" + this.user.role);
    });
    this.isAdmin=(this.user.role==="admin");
    if (this.team) {
      //console.log("team " +[this.team]);
      console.log("team from input id:"+ this.team.id + " name: "+ this.team.name+ " games: "+ this.team.games+ " players: "+this.team.players);
    }
    this.getFullTeam();
    
  }

  getFullTeam(){
    if(this.team){
      //this.fullteam = 
      this.teamService.getTeam(this.team.id).subscribe(novi=>{
        this.fullteam=novi;
        console.log("fullteam: " + this.fullteam.players);
      });
      
    }
  }

  deleteTeam(){
    if(this.team){
      //this.teamService.deleteTeam(this.team.id);
      this.store.dispatch(deleteTeam({id:this.team.id}));
      //posalji u parent da se ponovo ucitaju timovi
      const deleted:boolean=true;
      this.teamDeleted.emit(deleted);
    }
  }

}
