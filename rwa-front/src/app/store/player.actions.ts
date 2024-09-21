import { createAction, props } from "@ngrx/store";
import { Player } from "../entities/player";
import { PlayerDto } from "../entities/player.dto";

export const loadPlayers = createAction(
    '[Player] Load Players'
);
    
export const loadPlayersSuccess = createAction(
    '[Player] Load Players Success', 
    props<{ players: Player[] }>()
);
    
export const loadPlayersFailure = createAction(
   '[Player] Load Players Failure', 
    props<{ error: any }>()
);
export const loadPlayer = createAction(
    '[Player] Load Player',
    props<{ id: number }>()
);
  
export const loadPlayerSuccess = createAction(
    '[Player] Load Player Success',
    props<{ player: Player }>()
);
  
export const loadPlayerFailure = createAction(
    '[Player] Load Player Failure',
    props<{ error: any }>()
);
export const createPlayer = createAction(
    '[Player] Create Player', 
    props<{ player: PlayerDto }>()
);
export const createPlayerSuccess = createAction(
    '[Player] Create Player Success', 
    props<{ player: Player }>()
);
export const createPlayerFailure = createAction(
    '[Player] Create Player Failure', 
    props<{ error: any }>()
);
export const deletePlayer = createAction(
    "[Player] Delete Player",
    props<{ id: number }>()
)
export const deletePlayerSuccess = createAction(
    "[Player] Delete Player Success",
    props<{ id: number }>()
);

export const deletePlayerFailure = createAction(
    "[Player] Delete Player Failure",
    props<{ error: any }>()
);