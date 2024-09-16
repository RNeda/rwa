import { createReducer, on } from "@ngrx/store";
import { DreamTeam } from "../entities/dreamteam";
import * as DreamTeamActions from './dreamteam.actions';
import { User } from "../entities/user";
import { loginsuccess } from "./user.actions";
import { Player } from "../entities/player";

export interface DreamTeamState {
  players:Player[];  //create
  loading: boolean;//create
  dreamTeam: DreamTeam | null;
  dreamTeams: DreamTeam[];
  //error: any;
}

export interface ProfileState {
  user:User |null;
  loading:boolean;
  //dreamTeams: DreamTeam[];
}

export const initialDreamTeamState: DreamTeamState = {
  players: [],
  loading:false,
  dreamTeam: null,
  dreamTeams: [],
  //error: null
};

const initialProfileState: ProfileState = {
  user:null,
  loading:false
  //dreamTeams: []
};

export const profileReducer = createReducer(
  initialProfileState,
  on(loginsuccess, (state, { user }) => ({
    ...state,
    user
  })),
  on(DreamTeamActions.loadUserDreamTeams, (state) => ({
    ...state,
    loading: true,
    //error: null
  })),

  // Handle loadUserDreamTeamsSuccess action
  on(DreamTeamActions.loadUserDreamTeamsSuccess, (state, { dreamTeams }) => ({
    ...state,
    loading: false,
    
    // user: {
    //   ...state.user,
    //   dreamteams: dreamTeams
    // }
  })),

  // Handle loadUserDreamTeamsFailure action
  on(DreamTeamActions.loadUserDreamTeamsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
);

export const dreamTeamReducer = createReducer(
    initialDreamTeamState,
    on(DreamTeamActions.loadDreamTeams, (state) => ({
      ...state, 
      loading: true 
   })),
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
    })),
    on(DreamTeamActions.loadPlayers, (state) => ({
       ...state, 
       loading: true 
    })),
    on(DreamTeamActions.loadPlayersSuccess, (state, { players }) => ({
       ...state,
        loading: false,
         players 
    })),
    on(DreamTeamActions.loadPlayersFailure, (state, { error }) => ({
       ...state,
        loading: false
    })),

    on(DreamTeamActions.createDreamTeam, (state) => ({
       ...state, 
       loading: true 
    })),
    on(DreamTeamActions.createDreamTeamSuccess, (state, { dreamTeam }) => ({
       ...state, 
       loading: false, 
       dreamTeam ,
       dreamTeams: [...state.dreamTeams, dreamTeam],//??
    })),
    on(DreamTeamActions.createDreamTeamFailure, (state, { error }) => ({ 
      ...state,
       loading: false
    })),
    on(DreamTeamActions.deleteDreamteamSuccess, (state, { id }) => ({
      ...state,
      dreamTeams: state.dreamTeams.filter(dreamTeam => dreamTeam.id !== id),
      loading: false
    })),
    on(DreamTeamActions.deleteDreamteamFailure, (state, { error }) => ({
      ...state,
      //error: error,
      loading: false
    })),
    on(DreamTeamActions.updateDreamTeam, state => ({
      ...state,
      loading: true
    })),
    on(DreamTeamActions.updateDreamTeamSuccess, (state, { dreamTeam }) => ({
      ...state,
      dreamTeams: state.dreamTeams.map(dt => dt.id === dreamTeam.id ? dreamTeam : dt),
      loading: false
    })),
    on(DreamTeamActions.updateDreamTeamFailure, (state, { error }) => ({
      ...state,
      //error,
      loading: false
    }))
  );