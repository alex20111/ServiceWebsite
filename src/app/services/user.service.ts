import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../_models/User';
import { environment } from 'src/environments/environment';
import { domainName } from '../helpers/domain';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string;

  constructor(private http: HttpClient){
    this.apiUrl  = domainName();
  }

  getUsers(): Observable<User[]>{
   return this.http.get<User[]>( `${this.apiUrl}/bwservice/webapi/user/allUsers`);
  }

  saveUser(user: User): Observable<any>{
    console.log('save user');
    return this.http.post(`${this.apiUrl}/bwservice/webapi/user/update`, user);
  }

  addUser(user: User): Observable<any>{
    console.log('add user');
    return this.http.post(`${this.apiUrl}/bwservice/webapi/user/add`, user);
  }

  deleteUser(userId: number): Observable<any>{
    console.log("deleting from service");
    return this.http.post(`${this.apiUrl}/bwservice/webapi/user/delete`, userId);
  }

  changePassword(newPassword: string){
    console.log('Change password');
    return this.http.post(`${this.apiUrl}/bwservice/webapi/user/updPass`, newPassword);
  }

  getUserById(userId: string): Observable<User>{
    console.log('get user id');
    return this.http.post<User>(`${this.apiUrl}/bwservice/webapi/user/getById`, userId);
  }


}
