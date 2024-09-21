import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerDto } from '../entities/player.dto';
import { createPlayer } from '../store/player.actions';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrl: './create-player.component.scss'
})
export class CreatePlayerComponent implements OnInit{
  
  playerName:string="";
  playerAge:number=0;
  playerPosition:string="";
  playerPicture:string="";
  @Output() playerCreated = new EventEmitter<boolean>();
  @Output() cancelPlayerCreation = new EventEmitter<boolean>();

  constructor(private store: Store<AppState>,private router:Router,private route: ActivatedRoute) {}


  ngOnInit(): void {
      
  }

  createPlayer():void{
    const newPlayer: PlayerDto={name:this.playerName,age:this.playerAge,picture:this.playerPicture,position:this.playerPosition};
    this.store.dispatch(createPlayer({player:newPlayer}));
    const created:boolean=true;
    this.playerCreated.emit(created);
  }

  cancelPlayer():void{
    const cncl:boolean=true;
    this.cancelPlayerCreation.emit(cncl);
  }

}
