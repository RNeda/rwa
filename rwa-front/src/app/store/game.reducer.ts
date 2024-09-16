import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Game } from "../entities/game";
import { createReducer, on } from "@ngrx/store";
import { loadGamesSuccess, selectGame } from "./game.actions";

// export interface GameState extends EntityState<Game>{
//     selectedGameId: number | null;
// }

// export const adapter = createEntityAdapter<Game>();

// export const initialGameState:GameState = adapter.getInitialState({
//     selectedGameId:null
// });



// export const gamesReducer = createReducer(
//     initialGameState,
//     on(LoadGamesSuccess, (state,{games})=>
//         adapter.setAll(games,{...state, selectedGameId:null})
//     ),
//     on(selectGame,(state,{gameId})=>({...state, selectedGameId: gameId,
//     }))
// )

export interface GameState {
    games: Game[];
  }
  
  export const initialGamesState: GameState = {
    games: []
  };
  
  export const gamesReducer = createReducer(
    initialGamesState,
    on(loadGamesSuccess, (state, { games }) => ({
      ...state,
      games: [...games],  // Update state with the new games
    }))
  )