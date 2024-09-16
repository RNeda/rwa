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
    path: 'show-dreamteam'/*'dreamteam/:id'*/, component: ShowDreamteamComponent, pathMatch:'full', canActivate:[IsAuthGuard] 
  },
  {
    path:'my-profile', component: ProfileComponent, pathMatch: 'full', canActivate: [IsAuthGuard]
  },
  {
    path:'create-dreamteam', component: CreateDreamteamComponent, pathMatch: 'full', canActivate: [IsAuthGuard]
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
