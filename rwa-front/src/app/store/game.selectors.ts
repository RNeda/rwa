import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import {  GameState } from "./game.reducer";

// const {selectAll, selectEntities} = adapter.getSelectors();
// export const selectGamesState = (state:AppState)=>state.games;

// export const selectAllGames = createSelector(
//     selectGamesState,
//     selectAll
//   );
  
//   export const selectGameEntities = createSelector(
//     selectGamesState,
//     selectEntities
//   );
  
//   export const selectSelectedGameId = createSelector(
//     selectGamesState,
//     (state: GameState) => state.selectedGameId
//   );

//   export const selectSelectedGame = createSelector(
//     selectGameEntities,
//     selectSelectedGameId,
//     (gameEntities, selectedGameId) => selectedGameId ? gameEntities[selectedGameId] : null
//   );

export const selectGamesState = createFeatureSelector<GameState>('games');

export const selectAllGames = createSelector(
  selectGamesState,
  (state: GameState) => state.games
);