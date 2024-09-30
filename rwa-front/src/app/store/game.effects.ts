import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GameService } from "../game/game.service";
import { createGame, createGameFailure, createGameSuccess, deleteGame, deleteGameFailure, deleteGameSuccess, loadGame, loadGameFailure, loadGames, loadGamesFailure, loadGamesSuccess, loadGameSuccess, updateGame, updateGameFailure, updateGameSuccess } from "./game.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { Game } from "../entities/game";

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

   createGame$=createEffect(()=>
    this.actions$.pipe(
      ofType(createGame),
      mergeMap(({game})=>
        this.gameService.createGame(game).pipe(
          map((createdGame:Game)=>createGameSuccess({game:createdGame})),
          catchError((error)=>of(createGameFailure({error})))
        )
      )
    )
  );
    
  deleteGame$=createEffect(()=>
    this.actions$.pipe(
      ofType(deleteGame),
      mergeMap(action=>this.gameService.deleteGame(action.id)
      .pipe(
        map(()=>deleteGameSuccess({id:action.id})),
        catchError(error=>of(deleteGameFailure({error})))
      ))
    )
  );

  updateGame$=createEffect(()=>this.actions$.pipe(
    ofType(updateGame),
    mergeMap(action=>this.gameService.updateGame(action.id,action.updates)
      .pipe(
        map((game:Game)=>updateGameSuccess({game})),
        catchError(error=>of(updateGameFailure({error})))
      
      )
    )
  ))
}