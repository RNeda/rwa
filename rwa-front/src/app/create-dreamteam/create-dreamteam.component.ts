import { Component, OnInit } from '@angular/core';
import { selectAllPlayers } from '../store/dreamteam.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { createDreamTeam, loadPlayers } from '../store/dreamteam.actions';
import { DreamTeam } from '../entities/dreamteam';
import { DreamTeamDto } from '../entities/dreamteam.dto';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private store: Store<AppState>,private router:Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(loadPlayers());
    this.route.queryParams.subscribe(params => {
      this.creatorId = params['creatorId']; // Extract the creator ID
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
      this.router.navigate(['/my-profile']);
    }
    
  }
}
