import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { AuthState } from "./store/user.reducer";
import { Injectable } from "@angular/core";
import { selectToken } from "./store/user.selectors";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private store: Store<AuthState>) {}  
    
    intercept(req: HttpRequest<any>, next: HttpHandler){
        let token = "";
        this.store.select(selectToken).subscribe(t => token = t ?? "");
        const authReq = req.clone({
            headers: req.headers.set("Authorization", `Bearer ${token}`)
        });
        return next.handle(authReq);
    }
}