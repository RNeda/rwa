import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TeamState } from "./team.reducer";

export const selectTeamState = createFeatureSelector<TeamState>('teams');

export const selectAllTeams = createSelector(
    selectTeamState,
    (state: TeamState) => state.teams
  );
  
  export const selectSingleTeam = createSelector(
    selectTeamState,
    (state: TeamState) => state.team
  );
  export const selectAllPlayers = createSelector(
    selectTeamState, 
    (state: TeamState) => state.players
  );
  export const selectTeam = createSelector(
    selectTeamState, 
    (state: TeamState) => state.team
  );
  export const selectTeamLoading = createSelector(
    selectTeamState, 
    (state: TeamState) => state.loading
  );
  export const selectTeamById = (teamId: number) => createSelector(
    selectAllTeams,
    (teams) => teams.find(team => team.id === teamId)
  );
  
  export const selectAvailablePlayers = createSelector(
    selectTeamState,
    (state: TeamState) => state.availablePlayers
  );
  