import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import {  GameState } from "./game.reducer";



export const selectGamesState = createFeatureSelector<GameState>('games');

export const selectAllGames = createSelector(
  selectGamesState,
  (state: GameState) => state.games
);

export const SelectSingleGame = createSelector(
  selectGamesState,
  (state:GameState)=>state.game
)

export const selectGameById = (gameId: number) => createSelector(
  selectAllGames,
  (games) => games.find(game => game.id === gameId)
);