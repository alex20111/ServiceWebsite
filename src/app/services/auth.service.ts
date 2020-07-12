import { Access } from './../_models/Access';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../_models/User';
import { AuthUser } from '../_models/AuthUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

    return this.http.post<User>('http://localhost:8080/webservice/webapi/auth/login', authenticateUser)
      .pipe(map(user => {

          // user.access = 
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          // console.log("user Valid:")
          // console.log(user);

          return user;
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
}
