import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {User,  UserService } from '../user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginFormGroup: FormGroup; //Form from the html page
  userForm: User; // object to add the user from the form.

  constructor(private userSvc: UserService, private _router: Router) { }

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      userName: new FormControl(),
      password: new FormControl(),
    });
  }

  login(){
    const userToLog = this.loginFormGroup.value;
    const user = new User(0, userToLog.password, userToLog.userName, "" , "", false);

    console.log(user);

    this.userSvc.validateUser(user).subscribe( v => {
      if (v != null){

        this._router.navigate(['']);
      }else{
        this._router.navigate(['radio']);
      }

    });
   }
}
