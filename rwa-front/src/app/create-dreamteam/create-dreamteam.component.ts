import { Component, OnInit } from '@angular/core';
import { selectAllPlayers } from '../store/dreamteam.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { createDreamTeam, loadPlayers } from '../store/dreamteam.actions';
import { DreamTeam } from '../entities/dreamteam';
import { DreamTeamDto } from '../entities/dreamteam.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../entities/user';
import { login } from '../store/user.actions';

@Component({
  selector: 'app-create-dreamteam',
  templateUrl: './create-dreamteam.component.html',
  styleUrl: './create-dreamteam.component.scss'
})
export class CreateDreamteamComponent implements OnInit{

  players$ = this.store.select(selectAllPlayers);
  selectedPlayers: number[] = [];
  teamName: string = '';
  creatorId: any;
  creatoremail:any;
  creatorpass:any;

  constructor(private store: Store<AppState>,private router:Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(loadPlayers());
    this.route.queryParams.subscribe(params => {
      this.creatorId = params['creatorId']; // Extract the creator ID
      this.creatoremail=params['creatoremail'];
      this.creatorpass=params['creatorpass'];
    });

  }

  togglePlayerSelection(playerId: number): void {
    const index = this.selectedPlayers.indexOf(playerId);
    if (index > -1) {
      this.selectedPlayers.splice(index, 1); // Remove player ID from the array
    } else {
      this.selectedPlayers.push(playerId); // Add player ID to the array
    }
  }

  createDreamTeam(): void {
    if (this.creatorId) {
      const newTeam: DreamTeamDto = {
        likes: 0,
        name: this.teamName,
        playerids: this.selectedPlayers,
        creatorid: this.creatorId, // Now using the creatorId from @Input()
      };
      this.store.dispatch(createDreamTeam({ dreamTeam: newTeam }));
      this.store.dispatch(login({email:this.creatoremail, password:this.creatorpass}));

      //this.router.navigate(['/my-profile']);
    }
    
  }
  cancelDreamTeam(){
    //ako ostane ovako u posebnom royoru ovo je okej, ako prebacim na profile onda mora output()
    this.router.navigate(['/my-profile']);
  }
}
