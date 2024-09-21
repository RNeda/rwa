import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PlayerService } from "../player/player.service";
import { createPlayer, createPlayerFailure, createPlayerSuccess, deletePlayer, deletePlayerFailure, deletePlayerSuccess, loadPlayer, loadPlayerFailure, loadPlayers, loadPlayersFailure, loadPlayersSuccess, loadPlayerSuccess } from "./player.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { Player } from "../entities/player";

@Injectable()
export class PlayerEffects{
    constructor(private actions$:Actions, private PlayerService:PlayerService){}

    loadPlayer$ = createEffect(() =>
        this.actions$.pipe(
          ofType(loadPlayer),
          mergeMap(({ id }) =>
            this.PlayerService.getPlayer(id).pipe(
              map((player) => loadPlayerSuccess({ player })),
              catchError((error) => of(loadPlayerFailure({ error })))
            )
          )
        )
    );

    loadPlayers$ = createEffect(() =>
        this.actions$.pipe(
          ofType(loadPlayers),
          mergeMap(() =>
            this.PlayerService.getPlayers().pipe(
              map((players) => loadPlayersSuccess({ players })),
              catchError((error) => of(loadPlayersFailure({ error })))
            )
          )
        )
    );

    createPlayer$ = createEffect(() =>
        this.actions$.pipe(
          ofType(createPlayer),
          mergeMap(({ player }) =>
            this.PlayerService.createPlayer(player).pipe(
              map((createdPlayer: Player) => createPlayerSuccess({ player: createdPlayer })),
              catchError((error) => of(createPlayerFailure({ error })))
            )
          )
        )
    );

    deleteTeam$ = createEffect(() => 
        this.actions$.pipe(
        ofType(deletePlayer),
        mergeMap(action => this.PlayerService.deletePlayer(action.id)
          .pipe(
            map(() => deletePlayerSuccess({ id: action.id })),
            catchError(error => of(deletePlayerFailure({ error })))
        ))
    ));
    
}