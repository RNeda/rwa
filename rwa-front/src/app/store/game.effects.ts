import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GameService } from "../game/game.service";
import { loadGames, loadGamesFailure, loadGamesSuccess } from "./game.actions";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class GameEffects{
    constructor(private actions$: Actions, private gameService: GameService) {}
    
    loadGames$ = createEffect(() =>{
        return this.actions$.pipe(
          ofType(loadGames),
          mergeMap(() =>{
            return this.gameService.getGames().pipe(
              map(games => {
                
                return loadGamesSuccess({ games });
              }),
              catchError(error => {
                
                return of(loadGamesFailure({ error }));
              })
            )}
          )
        )}
    );

   
    
}