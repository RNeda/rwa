import { createAction, props } from "@ngrx/store";
import { Team } from "../entities/team";
import { Player } from "../entities/player";
import { TeamDto } from "../entities/team.dto";

export const loadTeams = createAction(
    '[Team] Load Teams'
);

export const loadTeamsSuccess = createAction(
  '[Team] Load Teams Success',
  props<{ teams: Team[] }>()
);

export const loadTeamsFailure = createAction(
  '[Team] Load Teams Failure',
  props<{ error: any }>()
);

export const loadTeam = createAction(
  '[Team] Load Team',
  props<{ id: number }>()
);

export const loadTeamSuccess = createAction(
  '[Team] Load Team Success',
  props<{ team: Team }>()
);

export const loadTeamFailure = createAction(
  '[Team] Load Team Failure',
  props<{ error: any }>()
);

export const loadPlayers = createAction(
  '[Team] Load Players'
);
  
export const loadPlayersSuccess = createAction(
  '[Team] Load Players Success', 
  props<{ players: Player[] }>()
);
  
export const loadPlayersFailure = createAction(
 '[Team] Load Players Failure', 
  props<{ error: any }>()
);

export const createTeam = createAction(
    '[Team] Create Team', 
    props<{ team: TeamDto }>()
);
export const createTeamSuccess = createAction(
    '[Team] Create Team Success', 
    props<{ team: Team }>()
);
export const createTeamFailure = createAction(
    '[Team] Create Team Failure', 
    props<{ error: any }>()
);
export const deleteTeam = createAction(
    "[Team] Delete Team",
    props<{ id: number }>()
)
export const deleteTeamSuccess = createAction(
    "[Team] Delete Team Success",
    props<{ id: number }>()
);

export const deleteTeamFailure = createAction(
    "[Team] Delete Team Failure",
    props<{ error: any }>()
);

export const loadAvailablePlayers = createAction(
  '[Team] Load Available Players'
);
export const loadAvailablePlayersSuccess = createAction(
  '[Team] Load Available Players Success',
  props<{ players: Player[] }>()
);
export const loadAvailablePlayersFailure = createAction(
  '[Team] Load Available Players Failure',
  props<{ error: any }>()
);