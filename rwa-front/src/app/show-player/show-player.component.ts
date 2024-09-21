import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../player/player.service';
import { Player } from '../entities/player';

@Component({
  selector: 'app-show-player',
  templateUrl: './show-player.component.html',
  styleUrl: './show-player.component.scss'
})
export class ShowPlayerComponent implements OnInit{

  @Input() player: Player | null = null;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router:Router,private playerService:PlayerService) {}

  ngOnInit(): void {
    
  }

}
