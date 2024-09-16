import { createAction, props } from "@ngrx/store";
import { DreamTeam } from "../entities/dreamteam";



export const loadDreamTeams = createAction(
    '[DreamTeam] Load DreamTeams'
);

export const loadDreamTeamsSuccess = createAction(
  '[DreamTeam] Load DreamTeams Success',
  props<{ dreamTeams: DreamTeam[] }>()
);

export const loadDreamTeamsFailure = createAction(
  '[DreamTeam] Load DreamTeams Failure',
  props<{ error: any }>()
);

export const loadDreamTeam = createAction(
  '[DreamTeam] Load DreamTeam',
  props<{ id: number }>()
);

export const loadDreamTeamSuccess = createAction(
  '[DreamTeam] Load DreamTeam Success',
  props<{ dreamTeam: DreamTeam }>()
);

export const loadDreamTeamFailure = createAction(
  '[DreamTeam] Load DreamTeam Failure',
  props<{ error: any }>()
);

