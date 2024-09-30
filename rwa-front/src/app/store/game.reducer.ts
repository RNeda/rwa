import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Game } from "../entities/game";
import { createReducer, on } from "@ngrx/store";
import { createGame, createGameFailure, createGameSuccess, deleteGameFailure, deleteGameSuccess, loadGameFailure, loadGamesFailure, loadGamesSuccess, loadGameSuccess, selectGame, updateGame, updateGameFailure, updateGameSuccess } from "./game.actions";



export interface GameState {
    games: Game[];
    game:Game|null;
    loading: boolean;
  }
  
  export const initialGamesState: GameState = {
    games: [],
    game:null,
    loading: false
  };
  
  export const gamesReducer = createReducer(
    initialGamesState,
    on(loadGamesSuccess, (state, { games }) => ({
      ...state,
      games: [...games],  // Update state with the new games
    })),
    on(loadGamesFailure, (state, { error }) => ({
      ...state,
      //error
    })),
    on(loadGameSuccess, (state, { game }) => ({
      ...state,
      game,
      //error: null
    })),
    on(loadGameFailure, (state, { error }) => ({
      ...state,
      //error
    })),
    on(createGame, (state) => ({
      ...state, 
      loading: true 
  })),
  on(createGameSuccess, (state, { game }) => ({
      ...state, 
      loading: false, 
      game ,
      games: [...state.games, game],//??
  })),
  on(createGameFailure, (state, { error }) => ({ 
  ...state,
      loading: false
  })),
  on(deleteGameSuccess, (state, { id }) => ({
    ...state,
    games: state.games.filter(game => game.id !== id),
    loading: false
  })),
  on(deleteGameFailure, (state, { error }) => ({
    ...state,
    //error: error,
    loading: false
  })),
  on(updateGame, state=>({
    ...state,
    loading:true
  })),
  on(updateGameSuccess,(state,{game})=>({
    ...state,
    games:state.games.map(g=>g.id===game.id?game:g)
  })),
  on(updateGameFailure, (state,{error})=>({
    ...state,loading:false
  }))
  )