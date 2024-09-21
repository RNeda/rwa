import { createReducer, on } from "@ngrx/store";
import { Player } from "../entities/player";
import { createPlayer, createPlayerFailure, createPlayerSuccess, deletePlayerFailure, deletePlayerSuccess, loadPlayerFailure, loadPlayers, loadPlayersFailure, loadPlayersSuccess, loadPlayerSuccess } from "./player.actions";

export interface PlayerState{
    player:Player|null;
    players:Player[];
    loading:boolean;
}

export const initialPlayerState:PlayerState={
    player:null,
    players:[],
    loading:false,
}

export const PlayerReducer=createReducer(
    initialPlayerState,
    on(loadPlayers,(state)=>({
        ...state,
        loading:true
    })),
    on(loadPlayersSuccess, (state, { players }) => ({
        ...state,
        loading: false,
        players 
    })),
    on(loadPlayersFailure, (state, { error }) => ({
        ...state,
        loading: false
    })),
    on(loadPlayerSuccess, (state, { player }) => ({
        ...state,
        player,
        //error: null
    })),
    on(loadPlayerFailure, (state, { error }) => ({
        ...state,
        //error
    })),
    on(createPlayer, (state) => ({
        ...state, 
        loading: true 
    })),
    on(createPlayerSuccess, (state, { player }) => ({
        ...state, 
        loading: false, 
        player ,
        players: [...state.players, player],//??
    })),
    on(createPlayerFailure, (state, { error }) => ({ 
    ...state,
        loading: false
    })),
    on(deletePlayerSuccess, (state, { id }) => ({
        ...state,
        players: state.players.filter(player => player.id !== id),
        loading: false
    })),
    on(deletePlayerFailure, (state, { error }) => ({
        ...state,
        //error: error,
        loading: false
    })),
)