import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DreamTeamState, ProfileState } from "./dreamteam.reducer";

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

export const selectProfileState = createFeatureSelector<ProfileState>('profile');

export const selectUserDreamTeams = createSelector(
  selectProfileState,
  (state: ProfileState) => state.user ? state.user.dreamteams : []
);

export const selectAllPlayers = createSelector(
  selectDreamTeamState, 
  (state: DreamTeamState) => state.players
);
export const selectDreamTeam = createSelector(
  selectDreamTeamState, 
  (state: DreamTeamState) => state.dreamTeam
);
export const selectDreamTeamLoading = createSelector(
  selectDreamTeamState, 
  (state: DreamTeamState) => state.loading
);
export const selectDreamTeamById = (dreamTeamId: number) => createSelector(
  selectAllDreamTeams,
  (dreamTeams) => dreamTeams.find(dreamTeam => dreamTeam.id === dreamTeamId)
);

// export const selectDreamTeamError = createSelector(
//   selectDreamTeamState,
//   (state: DreamTeamState) => state.error
// );