import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { selectIsAuth } from "../store/user.selectors";
import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class IsAuthGuard implements CanActivate {
    
    constructor(private store: Store<AppState>, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        
        return this.store.select(selectIsAuth).pipe(
            map(isAuth => {
                if (isAuth) {
                    return true;
                } else {
                    return this.router.parseUrl('/sign-in');
                }
            })
        );
    }
}
