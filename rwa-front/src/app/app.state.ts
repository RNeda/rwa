import { DreamTeamState } from "./store/dreamteam.reducer";
import { GameState } from "./store/game.reducer";
import { AuthState } from "./store/user.reducer";

export interface AppState{
    auth: AuthState;
    games: GameState;
    dreamteams: DreamTeamState;
    // myDecisions: MyDecisionsState;
    // searchedDecisions: DecisionsState;
}