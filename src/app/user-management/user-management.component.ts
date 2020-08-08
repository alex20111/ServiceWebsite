import { AuthService } from './../services/auth.service';
import { logging } from 'protractor';
import { UserWbsAccess } from './../_models/UserWbsAccess';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Access } from '../_models/Access';
import { Websites } from '../_models/Websites';
import { unescapeIdentifier } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';
import { UserCommon } from './userCommon';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  error: string;
  message: string;
  submitted = false;

  userList: User[] = [];
  loading = false; // to display loading value

  localUser: User;
  UserAccess: UserWbsAccess[] = []; //website access level. sorted by Websites enum.

  addUserForm: FormGroup; // Form from the html page
  isAddingUser = false;

  // common
  common: UserCommon = new UserCommon();

  constructor(private userSvc: UserService, private route: ActivatedRoute, private authSvr: AuthService) { }
  // control getter for add form
  get fAdd() {
    return this.addUserForm.controls;
  }
  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const param = +params['add'];
        if (param === 1) { // add mode
          this.init(false);
          this.add();
        } else {
          this.loading = true;
          this.init(true); // only list users
        }
      }
    );
  }


  delete(user: User) {

    if (confirm("Are you sure to delete?")) {

      this.userSvc.deleteUser(user.id).subscribe({
        next: (data) => {
          this.loading = false;
          this.userList = this.userList.filter(u => u.id !== user.id);
          // console.log("data from delete");
          // console.log(data);
          if (data.message === 'success') {
            this.message = 'User deleted';
            window.scroll(0, 0);
          }
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.loading = false;
          this.error = 'server error';
          window.scroll(0, 0);
        }
      });

    }
  }

  cancel() {
    // this.editUserForm = undefined;
    this.localUser = undefined;
    this.UserAccess = [];
    this.isAddingUser = false;
    this.loading = false;
    this.error = undefined;
    // this.init(true);
  }

  add() {
    console.log("add");
    this.isAddingUser = true;
    this.localUser = undefined;
    this.UserAccess = [];
    for (const web of this.common.userWeb) {
      const wbacc = new UserWbsAccess(-1, Access.Unauthorized, web);
      this.UserAccess.push(wbacc);
    }
    this.addUserForm.patchValue({ usr_access0: Access.Unauthorized });//update the form to set the right value
    this.addUserForm.patchValue({ usr_access1: Access.Unauthorized });//update the form to set the right value
    this.addUserForm.patchValue({ usr_access2: Access.Unauthorized });//update the form to set the right value
    this.addUserForm.patchValue({ usr_access3: Access.Unauthorized });//update the form to set the right value

  }
  addNewUser() {
    console.log('Adding user');
    this.submitted = true;

    // console.log(this.isEditingUser);
    if (this.addUserForm.invalid) {
      console.log("Form not valid");
      window.scroll(0, 0);
      return;
    }

    this.loading = true;
    this.localUser = new User();

    const user = this.addUserForm.value;

    this.fillOutUserToSubmit(user);
  }

  fillOutUserToSubmit(user: any) {
    console.log(user);

    this.localUser.userName = user.usr_userName;
    this.localUser.lastName = user.usr_lastName;
    this.localUser.firstName = user.usr_firstName;
    this.localUser.email = user.usr_email;

    // verify if the user has already some access.. if yes, update the index (id )
    if (this.localUser.userWeb === undefined || this.localUser.userWeb.length === 0) {
      this.localUser.userWeb = [];
    }

    for (let web of this.common.userWeb) {
      let wbaccess: UserWbsAccess = this.localUser.userWeb.filter(uf => uf.websiteAccess === web)[0];

      if (!wbaccess) {
        wbaccess = new UserWbsAccess(-1, Access.Unauthorized, web);
        this.localUser.userWeb.push(wbaccess);
      }

      switch (web) {
        case Websites.service: {
          wbaccess.accessLevel = user.usr_access0;
          break;
        }
        case Websites.Isabelle: {
          wbaccess.accessLevel = user.usr_access1;
          break;
        }
        case Websites.Mathieu: {
          wbaccess.accessLevel = user.usr_access2;
          break;
        }
        case Websites.Headless: {
          wbaccess.accessLevel = user.usr_access3;
          break;
        }
      }
    }

    if (this.isAddingUser) {
      const passHashed = this.authSvr.hashPassword(user.usr_password);
      console.log(passHashed);
      this.localUser.password = passHashed;
      this.userSvc.addUser(this.localUser).subscribe(
        (data) => {
          this.loading = false;
          this.init(true);
        },
        (error) => {
          console.error('There was an error!', error);
          console.log(error.error.description);
          this.loading = false;
          if (error.error.description === 'User Name exist') {
            this.error = " User name already exist, change";
          } else {

            this.error = 'server error while adding';
          }
          window.scroll(0, 0);
        }
      );
    }
  }

  init(listUsers: boolean) {

    this.submitted = false;
    this.message = '';

    if (this.addUserForm === undefined) {
      this.addUserForm = new FormGroup({
        usr_userName: new FormControl("", Validators.required),
        usr_password: new FormControl("", [Validators.required, Validators.minLength(6)]),
        usr_firstName: new FormControl("", Validators.required),
        usr_lastName: new FormControl("", Validators.required),
        usr_email: new FormControl("", [Validators.required, Validators.email]),
        usr_access0: new FormControl(),
        usr_access1: new FormControl(),
        usr_access2: new FormControl(),
        usr_access3: new FormControl()
      });
    }

    this.isAddingUser = false;
    this.UserAccess = [];
    this.error = undefined;

    if (listUsers) {
      this.loading = true;
      this.userSvc.getUsers().subscribe(
        (users: User[]) => {
          this.userList = users;
          this.loading = false;
          console.log(this.userList);
          // console.log(this.userList);
        },
        (error) => {
          this.loading = false;
          this.error = 'Error loading user list.';
          console.log('User list load error: '); console.log(error);
        }
      );
    }
  }
  // convertDate(date: string): Date {
  //   console.log('Date recieved: ' , date);
  //   if (date) {
  //     return new Date(date.substring(0, date.indexOf('[')));
  //   }

  //   return null;
  // }

}
