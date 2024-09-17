import { createAction, props } from "@ngrx/store";
import { DreamTeam } from "../entities/dreamteam";
import { Player } from "../entities/player";
import { DreamTeamDto } from "../entities/dreamteam.dto";



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


export const loadUserDreamTeams = createAction(
  '[Profile] Load User DreamTeams',
  props<{ userId: number }>()
);

export const loadUserDreamTeamsSuccess = createAction(
  '[Profile] Load User DreamTeams Success',
  props<{ dreamTeams: DreamTeam[] }>()
);

export const loadUserDreamTeamsFailure = createAction(
  '[Profile] Load User DreamTeams Failure',
  props<{ error: any }>()
);

export const loadPlayers = createAction(
  '[DreamTeam] Load Players'
);

export const loadPlayersSuccess = createAction(
  '[DreamTeam] Load Players Success', 
  props<{ players: Player[] }>()
);

export const loadPlayersFailure = createAction(
  '[DreamTeam] Load Players Failure', 
  props<{ error: any }>()
);

export const createDreamTeam = createAction(
  '[DreamTeam] Create DreamTeam', 
  props<{ dreamTeam: DreamTeamDto }>()
);
export const createDreamTeamSuccess = createAction(
  '[DreamTeam] Create DreamTeam Success', 
  props<{ dreamTeam: DreamTeam }>()
);
export const createDreamTeamFailure = createAction(
  '[DreamTeam] Create DreamTeam Failure', 
  props<{ error: any }>()
);
export const deleteDreamteam = createAction(
  "[DreamTeam] Delete DreamTeam",
    props<{ id: number }>()
)
export const deleteDreamteamSuccess = createAction(
  "[DreamTeam] Delete DreamTeam Success",
  props<{ id: number }>()
);

export const deleteDreamteamFailure = createAction(
  "[DreamTeam] Delete DreamTeam Failure",
  props<{ error: any }>()
);

// export const updateDreamTeamLikes = createAction(
//   '[DreamTeam] Update DreamTeam Likes',
//   props<{ id: number; likes: number }>()
// );

export const updateDreamTeam = createAction(
  '[DreamTeam] Update DreamTeam',
  props<{ id: number; updates: DreamTeamDto }>()
);

export const updateDreamTeamSuccess = createAction(
  '[DreamTeam] Update DreamTeam Success',
  props<{ dreamTeam: DreamTeam }>()
);

export const updateDreamTeamFailure = createAction(
  '[DreamTeam] Update DreamTeam Failure',
  props<{ error: any }>()
);


export const loadAvailablePlayers = createAction(
  '[DreamTeam] Load Available Players'
);
export const loadAvailablePlayersSuccess = createAction(
  '[DreamTeam] Load Available Players Success',
  props<{ players: Player[] }>()
);
export const loadAvailablePlayersFailure = createAction(
  '[DreamTeam] Load Available Players Failure',
  props<{ error: any }>()
);

export const removePlayer = createAction(
  '[DreamTeam] Remove Player',
  props<{ teamId: number, playerIds: number[] }>()
);

export const removePlayerSuccess = createAction(
  '[DreamTeam] Remove Player Success',
  props<{ dreamTeam: DreamTeam }>()
);

export const removePlayerFailure = createAction(
  '[DreamTeam] Remove Player Failure',
  props<{ error: any }>()
);