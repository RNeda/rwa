import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TeamService } from "../team/team.service";
import * as TeamActions from "./team.actions"
import { catchError, map, mergeMap, of } from "rxjs";
import { Team } from "../entities/team";

@Injectable()
export class TeamEffects {
  constructor(
    private actions$: Actions,
    private TeamService: TeamService
  ) {}

  loadTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamActions.loadTeam),
      mergeMap(({ id }) =>
        this.TeamService.getTeam(id).pipe(
          map((team) => TeamActions.loadTeamSuccess({ team })),
          catchError((error) => of(TeamActions.loadTeamFailure({ error })))
        )
      )
    )
  );

  loadTeams$ = createEffect(() =>{
    return this.actions$.pipe(
      ofType(TeamActions.loadTeams),
      mergeMap(() =>{
        return this.TeamService.getTeams().pipe(
          map((teams) =>{
            return TeamActions.loadTeamsSuccess({ teams })
            }),
          catchError((error) =>
            of(TeamActions.loadTeamsFailure({ error }))
          )
        )}
      )
    )}
  );

  loadPlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamActions.loadPlayers),
      mergeMap(() =>
        this.TeamService.getAllPlayers().pipe(
          map((players) => TeamActions.loadPlayersSuccess({ players })),
          catchError((error) => of(TeamActions.loadPlayersFailure({ error })))
        )
      )
    )
  );

  createDreamTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamActions.createTeam),
      mergeMap(({ team }) =>
        this.TeamService.createTeam(team).pipe(
          map((createdTeam: Team) => TeamActions.createTeamSuccess({ team: createdTeam })),
          catchError((error) => of(TeamActions.createTeamFailure({ error })))
        )
      )
    )
  );

  deleteDreamteam$ = createEffect(() => 
    this.actions$.pipe(
    ofType(TeamActions.deleteTeam),
    mergeMap(action => this.TeamService.deleteTeam(action.id)
      .pipe(
        map(() => TeamActions.deleteTeamSuccess({ id: action.id })),
        catchError(error => of(TeamActions.deleteTeamFailure({ error })))
      ))
  ));

  loadAvailablePlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamActions.loadAvailablePlayers),
      mergeMap(() =>
        this.TeamService.getAvailablePlayers().pipe(
          map((players) => TeamActions.loadAvailablePlayersSuccess({ players })),
          catchError((error) => of(TeamActions.loadAvailablePlayersFailure({ error })))
        )
      )
    )
  );
}