import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup,  Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from '../../helpers/Must-Match.validator';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  error: string;
  message: string;
  submitted = false;

  changePassworForm: FormGroup;

  constructor(private userSvr: UserService, private authSvr: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.changePassworForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(5)]],
      matchedPassword: ['', [Validators.required, Validators.minLength(5)]],
    }, {
      validator: MustMatch('password', 'matchedPassword')
    });

  }

  changePassword() {
    this.submitted = true;
    const user = this.authSvr.getCurrentUser();

    if (this.changePassworForm.invalid) {
      console.log('form invalid');
      return;
    }

    const pass = this.changePassworForm.value.password;

    this.userSvr.changePassword(pass).subscribe(
      (data) => {
        console.log('ts');
        this.message = 'Password changed';
      },
      (error) => {
        this.error = 'Error changing passord';
        console.log(error);
      }
    );
    this.submitted = false;
  }

  get frm() {
    return this.changePassworForm.controls;
  }
}