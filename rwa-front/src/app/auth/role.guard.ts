import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { map, Observable, take } from "rxjs";
import { selectUserData } from "../store/user.selectors";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectUserData).pipe(
      take(1), 
      map(user => {
        if (user && user.role === 'admin') {
          return true; 
        } else {
          return false;
        }
      })
    );
  }
}