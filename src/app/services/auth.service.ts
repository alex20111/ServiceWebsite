import { Access } from './../_models/Access';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../_models/User';
import { AuthUser } from '../_models/AuthUser';

import * as sha512 from 'js-sha512';
import { environment } from 'src/environments/environment';
import { domainName } from '../helpers/domain';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  apiUrl = domainName();
  
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  getCurrObservableUserLogged(): Observable<User>{
    return this.currentUser;
  }
  /** Verify if the user exist on the DB and return true if user and password match. That validation should be done on the server side
   * and only a true or false should be returned.
   */

  public validateUser(authenticateUser: AuthUser): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/bwservice/webapi/auth/login`, authenticateUser)
      .pipe(map(user => {

          const signedUser: User = new User();
          signedUser.access = user.access;
          signedUser.authToken = user.authToken;
          signedUser.email = user.email;
          signedUser.firstName = user.firstName;
          signedUser.lastLogin = user.lastLogin;
          signedUser.lastName = user.lastName;
          signedUser.userName = user.userName;
          signedUser.id = user.id;

          // user.access = 
          localStorage.setItem('currentUser', JSON.stringify(signedUser));
          this.currentUserSubject.next(signedUser);
          return signedUser;
      })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAdmin(): boolean{
    return this.currentUserSubject && this.currentUserSubject.value.access === Access.Admin;
  }
  isRegular(){

  }
  isView(){

  }

  hashPassword(password: string): string{
    return  sha512.sha512(password);
  }
}
