import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./user.reducer";
import { AppState } from "../app.state";
import { User } from "../entities/user";

export const authFeature = createFeatureSelector<AuthState>("auth");

export const selectToken = createSelector(
  authFeature,
  (state) => state.token,
);
export const selectIsAuth = createSelector(
  authFeature,
  (state) => !!state.token
);
export const selectUserData = createSelector(
  authFeature,
  (state) => state.user
);

