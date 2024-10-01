import { DreamTeamState, ProfileState } from "./store/dreamteam.reducer";
import { GameState } from "./store/game.reducer";
import { PlayerState } from "./store/player.reducer";
import { TeamState } from "./store/team.reducer";
import { AuthState } from "./store/user.reducer";

export interface AppState{
    auth: AuthState;
    games: GameState;
    dreamteams: DreamTeamState;
    profile: ProfileState;
    teams:TeamState;
    players:PlayerState;
}