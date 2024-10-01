import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { selectAllPlayers } from '../store/dreamteam.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { createDreamTeam, loadPlayers } from '../store/dreamteam.actions';
import { DreamTeam } from '../entities/dreamteam';
import { DreamTeamDto } from '../entities/dreamteam.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../entities/user';
import { login } from '../store/user.actions';
import { selectUserData } from '../store/user.selectors';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmCreateDialogComponent } from '../confirm-create-dialog/confirm-create-dialog.component';

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
  creator:any;
  @Output() dreamteamCreated = new EventEmitter<boolean>();
  @Output() canceldreamteamCreation = new EventEmitter<boolean>();

  constructor(private store: Store<AppState>,public dialog:MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(loadPlayers());
    this.store.select(selectUserData).subscribe((data)=>this.creator=data);
  }

  togglePlayerSelection(playerId: number): void {
    const index = this.selectedPlayers.indexOf(playerId);
    if (index > -1) {
      this.selectedPlayers.splice(index, 1); 
    } else {
      this.selectedPlayers.push(playerId); 
    }
  }

  createDreamTeam(): void {
      const newTeam: DreamTeamDto = {
        likes: 0,
        name: this.teamName,
        playerids: this.selectedPlayers,
        creatorid: this.creator.id, 
      };
      this.store.dispatch(createDreamTeam({ dreamTeam: newTeam }));
      
      const created:boolean=true;
      this.dreamteamCreated.emit(created);
      this.createConfirm();
  }
  cancelDreamTeam():void{
    const cncl:boolean=true;
    this.canceldreamteamCreation.emit(cncl);
  }

  createConfirm(): void {
    const dialogRef = this.dialog.open(ConfirmCreateDialogComponent, {
      width: '300px',
    });

  }
}
