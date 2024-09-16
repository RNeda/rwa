import { createReducer, on } from "@ngrx/store";
import { User } from "../entities/user";
import{ EntityState } from '@ngrx/entity'
import { loginError, loginsuccess, logout, removeToken, setToken, setUser } from "./user.actions";

export interface AuthState {
    token: string;
    user: User|null;
  }

  export interface UsersState extends EntityState<User>{
    
  }
  
  export const initialState: AuthState = {
    token: "",
    user: null,
  };

  export const authReducer = createReducer(
    initialState,
    on(setToken, (state, { token }): AuthState => ({ ...state, token })),
    on(removeToken, (state): AuthState => ({ ...state, token: "" })),
    on(setUser, (state, { user }): AuthState => ({ ...state, user })),
    on(loginsuccess, (state, { user, token }): AuthState => ({ ...state, user, token })),
    on(loginError, (state, { message }): AuthState => ({ ...state, user: null, token: "" })),
    on(logout, (state): AuthState => ({ ...state, user: null, token: "" }))
  );