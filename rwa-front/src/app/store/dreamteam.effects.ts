import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DreamteamService } from "../dreamteam/dreamteam.service";
import * as DreamTeamActions from './dreamteam.actions';
import { catchError, map, mergeMap, of } from "rxjs";
import { DreamTeam } from "../entities/dreamteam";
import { Observable } from 'rxjs';//???

@Injectable()
export class DreamTeamEffects {
  constructor(
    private actions$: Actions,
    private DreamTeamService: DreamteamService
  ) {}

  loadDreamTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DreamTeamActions.loadDreamTeam),
      mergeMap(({ id }) =>
        this.DreamTeamService.getDreamTeam(id).pipe(
          map((dreamTeam) => DreamTeamActions.loadDreamTeamSuccess({ dreamTeam })),
          catchError((error) => of(DreamTeamActions.loadDreamTeamFailure({ error })))
        )
      )
    )
  );
  // Effect to load DreamTeams
  loadDreamTeams$ = createEffect(() =>{
    return this.actions$.pipe(
      ofType(DreamTeamActions.loadDreamTeams),
      mergeMap(() =>{
        return this.DreamTeamService.getDreamTeams().pipe(
          map((dreamTeams) =>{
            return DreamTeamActions.loadDreamTeamsSuccess({ dreamTeams })
            }),
          catchError((error) =>
            of(DreamTeamActions.loadDreamTeamsFailure({ error }))
          )
        )}
      )
    )}
  );

  loadUserDreamTeams$ = createEffect(() => this.actions$.pipe(
    ofType(DreamTeamActions.loadUserDreamTeams),
    mergeMap(action => this.DreamTeamService.getDreamTeamsByUserId()//action.userId)
      .pipe(
        map(dreamTeams => DreamTeamActions.loadUserDreamTeamsSuccess({ dreamTeams })),
        catchError(error => of(DreamTeamActions.loadUserDreamTeamsFailure({ error })))
      )
    )
  ));

  /*
  loadUserDreamTeams$ = createEffect(() => this.actions$.pipe(
    ofType(DreamTeamActions.loadUserDreamTeams),
    mergeMap(action => this.DreamTeamService.getDreamTeams()//ByUserId(action.userId)
    .pipe(
      map(dreamTeams => DreamTeamActions.loadUserDreamTeamsSuccess({ dreamTeams })),
      catchError(error => of(DreamTeamActions.loadUserDreamTeamsFailure({ error })))
    )
  )
));
  */

  loadPlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DreamTeamActions.loadPlayers),
      mergeMap(() =>
        this.DreamTeamService.getAllPlayers().pipe(
          map((players) => DreamTeamActions.loadPlayersSuccess({ players })),
          catchError((error) => of(DreamTeamActions.loadPlayersFailure({ error })))
        )
      )
    )
  );

  createDreamTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DreamTeamActions.createDreamTeam),
      mergeMap(({ dreamTeam }) =>
        this.DreamTeamService.createDreamTeam(dreamTeam).pipe(
          map((createdTeam: DreamTeam) => DreamTeamActions.createDreamTeamSuccess({ dreamTeam: createdTeam })),
          catchError((error) => of(DreamTeamActions.createDreamTeamFailure({ error })))
        )
      )
    )
  );

  deleteDreamteam$ = createEffect(() => this.actions$.pipe(
    ofType(DreamTeamActions.deleteDreamteam),
    mergeMap(action => this.DreamTeamService.deleteDreamTeam(action.id)
      .pipe(
        map(() => DreamTeamActions.deleteDreamteamSuccess({ id: action.id })),
        catchError(error => of(DreamTeamActions.deleteDreamteamFailure({ error })))
      ))
  ));
 


  

  loadAvailablePlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DreamTeamActions.loadAvailablePlayers),
      mergeMap(() =>
        this.DreamTeamService.getAvailablePlayers().pipe(
          map((players) => DreamTeamActions.loadAvailablePlayersSuccess({ players })),
          catchError((error) => of(DreamTeamActions.loadAvailablePlayersFailure({ error })))
        )
      )
    )
  );


  updateDreamTeam$ = createEffect(() => this.actions$.pipe(
    ofType(DreamTeamActions.updateDreamTeam),
    mergeMap(action => this.DreamTeamService.updateDreamTeam(action.id, action.updates)
      .pipe(
        map((dreamTeam: DreamTeam) => DreamTeamActions.updateDreamTeamSuccess({ dreamTeam })),
        catchError(error => of(DreamTeamActions.updateDreamTeamFailure({ error })))
      )
    )
  ));
 
  // removePlayer$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(DreamTeamActions.removePlayer),
  //     mergeMap(action => this.DreamTeamService.removePlayers(action.teamId,action.playerIds)
  //   .pipe(
  //     map((dreamTeam:DreamTeam)=>DreamTeamActions.updateDreamTeamSuccess({dreamTeam})),
  //     catchError(error=>of(DreamTeamActions.updateDreamTeamFailure({error})))
  //   ))
  //   )
  // );
  removePlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DreamTeamActions.removePlayer),
      mergeMap(action => this.DreamTeamService.removePlayers(action.teamId,action.playerIds)
    .pipe(
      map((dreamTeam:DreamTeam)=>DreamTeamActions.removePlayerSuccess({dreamTeam})),
      catchError(error=>of(DreamTeamActions.removePlayerFailure({error})))
    ))
    )
  );
 

    /*this.actions$.pipe(
      ofType(DreamTeamActions.removePlayer),
      switchMap(({ teamId, playerIds }) =>
        this.dreamTeamService.removePlayers(teamId, playerIds).pipe(
          map((dreamTeam: DreamTeam) => DreamTeamActions.removePlayerSuccess({ dreamTeam })),
          catchError(error => of(DreamTeamActions.removePlayerFailure({ error })))
        )
      )
    )
  );

    /*this.actions$.pipe(
      ofType(DreamTeamActions.removePlayer),
      switchMap(({ teamId, playerId }) =>
        this.dreamTeamService.removePlayers(teamId, [playerId]).pipe(
          map(dreamTeam => DreamTeamActions.removePlayerSuccess({ dreamTeam })),
          catchError(error => of(DreamTeamActions.removePlayerFailure({ error })))
        )
      )
    )
  );*/

}