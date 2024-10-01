import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { UserDto } from '../entities/user.dto';
import { Observable } from 'rxjs';
import { url } from '../../../environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private store:Store<AppState>) { }

  signUp(userDto: UserDto): Observable<HttpResponse<any>> {
    return this.http.post(
      url + '/auth/signup',
      { ...userDto },
      { observe: 'response' }
    );
  }

  signIn(email: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post(
      url + '/auth/signin',
      { email: email, password: password },
      { observe: 'response' }
    );
  }

  auth(token: string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(
      url + '/auth/guardtest', {
      headers: headers,
      observe: 'response',
    });
  }

  getUser(id: number,token:string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(
      url + '/user/' + id, { 
        headers:headers, 
        observe: 'response' });
  }

  deleteUser(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(
      url + '/user/' + id, {
         observe: 'response' });
  }

  getProfile(token:string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(
      url + '/user/profile', {
         headers:headers, 
         observe: 'response' });
  }

}
