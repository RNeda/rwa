import { createAction, props } from "@ngrx/store";
import { Game } from "../entities/game";

export const loadGames = createAction(
    '[Game] Load Games'
);

export const loadGamesSuccess=createAction(
    '[Game] Load Games Success',
    props<{games:Game[]}>()
);

export const loadGamesFailure = createAction(
    '[Game] Load Games Failure',
    props<{error: any }>()
);

export const selectGame = createAction(
    '[Games] Select Game',
    props<{ gameId: number }>()
);
export const loadGame = createAction(
    '[Game] Load Game',
    props<{ id: number }>()
  );
  
  export const loadGameSuccess = createAction(
    '[Game] Load Game Success',
    props<{ game: Game }>()
  );
  
  export const loadGameFailure = createAction(
    '[Game] Load Game Failure',
    props<{ error: any }>()
  );