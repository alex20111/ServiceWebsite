import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../_models/User';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  postId;
  constructor(private http: HttpClient){}

  getUsers(): Observable<User[]>{
   return this.http.get<User[]>('http://localhost:8080/webservice/webapi/user/allUsers');
  }

  saveUser(user: User): Observable<any>{
    console.log('save user');
    return this.http.post('http://localhost:8080/webservice/webapi/user/update', user);
  }

  addUser(user: User): Observable<any>{
    console.log('add user');
    return this.http.post('http://localhost:8080/webservice/webapi/user/add', user);
  }

  deleteUser(userId: number): Observable<any>{
    console.log("deleting from service");
    return this.http.post('http://localhost:8080/webservice/webapi/user/delete', userId);
  }

  changePassword(newPassword: string){
    console.log('Change password');
    return this.http.post('http://localhost:8080/webservice/webapi/user/updPass', newPassword);
  }
}
