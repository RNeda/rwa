import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PlayerState } from "./player.reducer";

export const selectPlayerState = createFeatureSelector<PlayerState>('players');

export const selectAllPlayers = createSelector(
    selectPlayerState,
    (state: PlayerState) => state.players
);

export const selectSinglePlayer = createSelector(
    selectPlayerState,
    (state: PlayerState) => state.player
);
export const selectPlayerLoading = createSelector(
    selectPlayerState, 
    (state: PlayerState) => state.loading
);
export const selectPlayerById = (playerId: number) => createSelector(
    selectAllPlayers,
    (players) => players.find(player => player.id === playerId)
);
