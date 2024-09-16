import { createReducer, on } from "@ngrx/store";
import { DreamTeam } from "../entities/dreamteam";
import * as DreamTeamActions from './dreamteam.actions';

export interface DreamTeamState {
  dreamTeam: DreamTeam | null;
  dreamTeams: DreamTeam[];
  //error: any;
}

export const initialDreamTeamState: DreamTeamState = {
  dreamTeam: null,
  dreamTeams: [],
  //error: null
};

export const dreamTeamReducer = createReducer(
    initialDreamTeamState,
    on(DreamTeamActions.loadDreamTeamSuccess, (state, { dreamTeam }) => ({
      ...state,
      dreamTeam,
      //error: null
    })),
    on(DreamTeamActions.loadDreamTeamFailure, (state, { error }) => ({
      ...state,
      //error
    })),
    on(DreamTeamActions.loadDreamTeamsSuccess, (state, { dreamTeams }) => ({
      ...state,
      dreamTeams,
      //error: null
    })),
    on(DreamTeamActions.loadDreamTeamsFailure, (state, { error }) => ({
      ...state,
      //error
    }))
  );