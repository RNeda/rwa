import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DreamteamService } from "../dreamteam/dreamteam.service";
import * as DreamTeamActions from './dreamteam.actions';
import { catchError, map, mergeMap, of } from "rxjs";

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
}