import { Player } from "../entities/player";
import { Team } from "../entities/team";
import { createReducer, on } from "@ngrx/store";
import * as TeamActions from "./team.actions";


export interface TeamState {
    players:Player[];  //create
    loading: boolean;//create
    team: Team | null;
    teams: Team[];
    availablePlayers: Player[];
    //error: any;
}

export const initialTeamState: TeamState = {
    players: [],
    loading:false,
    team: null,
    teams: [],
    availablePlayers: [], 
    //error: null
};

export const TeamReducer = createReducer(
    initialTeamState,
    on(TeamActions.loadTeams, (state) => ({
    ...state, 
    loading: true 
    })),
    on(TeamActions.loadTeamSuccess, (state, { team }) => ({
    ...state,
    team,
    //error: null
    })),
    on(TeamActions.loadTeamFailure, (state, { error }) => ({
    ...state,
    //error
    })),
    on(TeamActions.loadTeamsSuccess, (state, { teams }) => ({
    ...state,
    teams,
    //error: null
    })),
    on(TeamActions.loadTeamsFailure, (state, { error }) => ({
    ...state,
    //error
    })),
    on(TeamActions.loadPlayers, (state) => ({
        ...state, 
        loading: true 
    })),
    on(TeamActions.loadPlayersSuccess, (state, { players }) => ({
        ...state,
        loading: false,
        players 
    })),
    on(TeamActions.loadPlayersFailure, (state, { error }) => ({
        ...state,
        loading: false
    })),

    on(TeamActions.createTeam, (state) => ({
        ...state, 
        loading: true 
    })),
    on(TeamActions.createTeamSuccess, (state, { team }) => ({
        ...state, 
        loading: false, 
        team ,
        teams: [...state.teams, team],//??
    })),
    on(TeamActions.createTeamFailure, (state, { error }) => ({ 
    ...state,
        loading: false
    })),
    on(TeamActions.deleteTeamSuccess, (state, { id }) => ({
    ...state,
    teams: state.teams.filter(team => team.id !== id),
    loading: false
    })),
    on(TeamActions.deleteTeamFailure, (state, { error }) => ({
    ...state,
    //error: error,
    loading: false
    })),
    on(TeamActions.loadAvailablePlayers, (state) => ({
        ...state,
        loading: false,
    })),
    on(TeamActions.loadAvailablePlayersSuccess, (state, { players }) => ({
    ...state,
    availablePlayers: players,
    loading: false
    })),
    on(TeamActions.loadAvailablePlayersFailure, (state, { error }) => ({
    ...state,
    //error,
    loading: false
    })),
);