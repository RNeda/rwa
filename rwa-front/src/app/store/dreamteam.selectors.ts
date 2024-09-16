import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DreamTeamState } from "./dreamteam.reducer";

// Selectors for DreamTeams
export const selectDreamTeamState = createFeatureSelector<DreamTeamState>('dreamteams');

export const selectAllDreamTeams = createSelector(
  selectDreamTeamState,
  (state: DreamTeamState) => state.dreamTeams
);

export const selectSingleDreamTeam = createSelector(
  selectDreamTeamState,
  (state: DreamTeamState) => state.dreamTeam
);

// export const selectDreamTeamError = createSelector(
//   selectDreamTeamState,
//   (state: DreamTeamState) => state.error
// );