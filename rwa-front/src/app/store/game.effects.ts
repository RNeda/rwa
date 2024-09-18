import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GameService } from "../game/game.service";
import { loadGame, loadGameFailure, loadGames, loadGamesFailure, loadGamesSuccess, loadGameSuccess } from "./game.actions";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class GameEffects{
    constructor(
      private actions$: Actions, 
      private gameService: GameService) {}
    
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

    // loadGame$=createEffect(()=>
    //   this.actions$.pipe(
    //     ofType(loadGame),
    //     mergeMap(({id}))=>
    //       this.gameService.getGameById(id).pipe(
    //         map((game)=>loadGameSuccess({game})),
    //         catchError((error)=>of(loadGameFailure({error})))
    //       )
    //   )
    // );

    loadGame$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadGame),
        mergeMap(({ id }) =>
          this.gameService.getGameById(id).pipe(
            map((game) => loadGameSuccess({ game })),
            catchError((error) => of(loadGameFailure({ error })))
          )
        )
      )
    );

   
    
}