import { Websites } from './../_models/Websites';
import { AuthService } from './../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { AuthUser } from '../_models/AuthUser';

import { Router } from '@angular/router';

import * as sha512 from 'js-sha512';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginFormGroup: FormGroup; //Form from the html page
  userForm: User; // object to add the user from the form.
  error: string;
  loading = false;
  submitted = false;


  constructor(private authSvc: AuthService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as { expired: string };
    if (state !== undefined) {
      this.error = state.expired;
    }
  }

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      userName: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  // method to use the form values easily in the html page.
  get frm() {
    return this.loginFormGroup.controls;
  }

  login() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginFormGroup.invalid) {
      return;
    }

    let hashed = sha512.sha512('Message to hash');
    // console.log("hashed");
    // console.log(hashed); //TODO 

    const userToLog = this.loginFormGroup.value;

    const auth = new AuthUser(userToLog.userName, userToLog.password, Websites.service);

    this.loading = true;

    this.authSvc.validateUser(auth).subscribe(
      (v: User) => {
        this.loading = false;
        this.router.navigate(['']);
      },
      (error) => {
        console.log("Error in login");
        console.log(error);
        if (error === 'Login'){
          this.error = "Invalid user/password"
        }else{
          this.error = "Error, please try again";
        }
        this.loading = false;
      });
  }
}
