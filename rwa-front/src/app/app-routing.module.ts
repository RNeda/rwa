import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpUserComponent } from './sign-up-user/sign-up-user.component';
import { SignInUserComponent } from './sign-in-user/sign-in-user.component';
import { GuestPageComponent } from './guest-page/guest-page.component';
import { ProfileComponent } from './profile/profile.component';
import { IsAuthGuard } from './auth/guard';
import { HomePageComponent } from './home-page/home-page.component';
import { ShowDreamteamComponent } from './show-dreamteam/show-dreamteam.component';
import { CreateDreamteamComponent } from './create-dreamteam/create-dreamteam.component';
import { UpdateDreamteamComponent } from './update-dreamteam/update-dreamteam.component';
import { ShowTeamComponent } from './show-team/show-team.component';
import { RoleGuard } from './auth/role.guard';
import { CreateTeamComponent } from './create-team/create-team.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { CreatePlayerComponent } from './create-player/create-player.component';
import { SimulacijaComponent } from './simulacija/simulacija.component';
//import { SimulationComponent } from './simulation/simulation.component';

const routes: Routes = [
  {
    path:'', redirectTo: 'guest-page', pathMatch: 'full'
  },
  {
    path:'guest-page', component: GuestPageComponent, pathMatch:'full'
  },
  {
    path:'sign-in', component: SignInUserComponent, pathMatch: 'full'
  },
  {
    path:'sign-up', component: SignUpUserComponent, pathMatch: 'full'
  },
  {
    path:'home-page', component:HomePageComponent, pathMatch:'full', canActivate: [IsAuthGuard]
  },
  {
    path: 'show-dreamteam', component: ShowDreamteamComponent, pathMatch:'full', canActivate:[IsAuthGuard] 
  },
  {
    path:'my-profile', component: ProfileComponent, pathMatch: 'full', canActivate: [IsAuthGuard]
  },
  {
    path:'create-dreamteam', component: CreateDreamteamComponent, pathMatch: 'full', canActivate: [IsAuthGuard]
  },
  {
    path:'update-dreamteam', component:UpdateDreamteamComponent,pathMatch:'full', canActivate:[IsAuthGuard]
  },
  {
    path:'show-team', component:ShowTeamComponent, pathMatch:'full', canActivate: [IsAuthGuard]
  },
  {
    path:'create-team', component:CreateTeamComponent, pathMatch:'full', canActivate: [IsAuthGuard,RoleGuard]
  },
  {
    path:'create-game', component:CreateGameComponent, pathMatch:'full', canActivate:[IsAuthGuard,RoleGuard]
  },
  {
    path:'create-player', component:CreatePlayerComponent, pathMatch:'full', canActivate:[IsAuthGuard, RoleGuard]
  },
  {
    path:'simulacija', component:SimulacijaComponent, pathMatch:'full', canActivate:[IsAuthGuard]
  },
  {
    path:'**', redirectTo: 'sign-in', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
