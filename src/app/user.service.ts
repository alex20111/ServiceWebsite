import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export class User {

  constructor(public id: number, public password: string,
    public userName: string, public firstName: string,
    public lastName: string, public administrator: boolean) { }

}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedInUser: User;

  constructor(private http: HttpClient) { }

  public isUserLogged(): boolean {
    return this.loggedInUser != null;
  }
  public getLoggedInUser(): User {
    return this.loggedInUser;
  }
  public setLoggedInUser(loggedIn: User) {
    this.loggedInUser = loggedIn;
  }
  public setLoggedInUserToNull() {
    this.loggedInUser = undefined;
  }


  /** Verify if the user exist on the DB and return true if user and password match. That validation should be done on the server side
   * and only a true or false should be returned.
   */
  // getStateData() : Observable<StateCOVIDStats[]> {
  //   return this.http.get<StateCOVIDStats[]>("https://covidtracking.com/api/states")
  // }

  public validateUser(userToValidate: User): Observable<User> {

    return this.http.post<User>('http://localhost:8080/restWebapp/webapi/user/validation', userToValidate).pipe(map(user => {
      let userVal: User;

      if (user !== undefined || user != null) {
        userVal = user;
        this.loggedInUser = user;
      }
      // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
      // user.authdata = window.btoa(username + ':' + password);
      // localStorage.setItem('currentUser', JSON.stringify(user));
      // this.currentUserSubject.next(user);

      return userVal;
    }));


  }


}
