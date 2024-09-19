import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools' 
import { EffectsModule } from '@ngrx/effects'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { SignUpUserComponent } from './sign-up-user/sign-up-user.component';
import { AuthInterceptor } from './interceptor';
import { UserEffects } from './store/user.effects';
import { AppState } from './app.state';
import { authReducer } from './store/user.reducer';
import { SignInUserComponent } from './sign-in-user/sign-in-user.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import{ MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { GuestPageComponent } from './guest-page/guest-page.component';
import { gamesReducer } from './store/game.reducer';
import { GameEffects } from './store/game.effects';
import { NavComponent } from './nav/nav.component';
import { ProfileComponent } from './profile/profile.component';
import { HomePageComponent } from './home-page/home-page.component';
import { dreamTeamReducer, profileReducer } from './store/dreamteam.reducer';
import { DreamTeamEffects } from './store/dreamteam.effects';
import { ShowDreamteamComponent } from './show-dreamteam/show-dreamteam.component';
import { CreateDreamteamComponent } from './create-dreamteam/create-dreamteam.component';
import { UpdateDreamteamComponent } from './update-dreamteam/update-dreamteam.component';
import { ShowTeamComponent } from './show-team/show-team.component';
import { RoleGuard } from './auth/role.guard';
import { TeamReducer } from './store/team.reducer';
import { TeamEffects } from './store/team.effects';
import { ShowGameComponent } from './show-game/show-game.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { CreateGameComponent } from './create-game/create-game.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpUserComponent,
    SignInUserComponent,
    GuestPageComponent,
    NavComponent,
    ProfileComponent,
    HomePageComponent,
    ShowDreamteamComponent,
    CreateDreamteamComponent,
    UpdateDreamteamComponent,
    ShowTeamComponent,
    ShowGameComponent,
    CreateTeamComponent,
    CreateGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //FontAwesomeModule,
    StoreModule.forRoot<AppState>({auth:authReducer, games: gamesReducer, dreamteams:dreamTeamReducer, profile:profileReducer, teams:TeamReducer}),
    StoreDevtoolsModule.instrument({
      maxAge:25,
    }),
    EffectsModule.forRoot([UserEffects,GameEffects,DreamTeamEffects,TeamEffects]),
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSliderModule,
    MatSnackBarModule,
    MatStepperModule,
    MatSidenavModule,
    MatGridListModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['localhost:4200'],
        disallowedRoutes: ['http://localhost:4200/auth/login']
      }
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    provideAnimationsAsync(),
    RoleGuard

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
