import { DreamTeamState, ProfileState } from "./store/dreamteam.reducer";
import { GameState } from "./store/game.reducer";
import { AuthState } from "./store/user.reducer";

export interface AppState{
    auth: AuthState;
    games: GameState;
    dreamteams: DreamTeamState;
    profile: ProfileState;
    // myDecisions: MyDecisionsState;
    // searchedDecisions: DecisionsState;
}