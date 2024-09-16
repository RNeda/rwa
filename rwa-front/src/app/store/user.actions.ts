import { createAction, props } from "@ngrx/store";
import { User } from "../entities/user";
import { UserDto } from "../entities/user.dto";

export const login = createAction(
    "[Auth] Login",
    props<{ email: string; password: string }>()
  );

  export const loginsuccess = createAction(
    "[Auth] Login Success",
    props<{ user: User; token: string }>()
  );
  
  export const loginError = createAction(
    "[Auth] Login",
    props<{ message: string }>()
  );
  
  export const logout = createAction("[Auth] Log Out");

  export const setToken = createAction(
    "[Auth] Set Token",
    props<{ token: string }>()
  );
  
  export const setUser = createAction(
    "[Auth] Set user",
    props<{ user: User }>(),
  );
  
  export const removeToken = createAction("[Auth] Remove Token");

  export const signUp = createAction(
    "[Auth] Sign Up",
    props<{ user: UserDto }>()
  );

  export const deleteUser = createAction(
    "[Auth] Delete User",
    props<{ id: number }>()
  );