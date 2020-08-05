import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserCommon } from '../userCommon';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { UserWbsAccess } from 'src/app/_models/UserWbsAccess';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  error: string;
  message: string;

  common: UserCommon = new UserCommon(); // containing information for add and edit
  loading = false;

  editUserForm: FormGroup;
  editUser: User;

  UserAccess: UserWbsAccess[] = []; //website access level. sorted by Websites enum.

  constructor(private userSvc: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.editUserForm === undefined) {
      this.editUserForm = new FormGroup({
        usr_userName: new FormControl('', Validators.required),
        usr_firstName: new FormControl('', Validators.required),
        usr_lastName: new FormControl('', Validators.required),
        usr_email: new FormControl('', Validators.required),
        usr_access0: new FormControl(),
        usr_access1: new FormControl(),
        usr_access2: new FormControl(),
        usr_access3: new FormControl()
      });
    }

    this.route.paramMap.subscribe(params => {
      console.log(params);
      let userId = params.get('usr');
      if (userId !== undefined) {

        //get user
        this.userSvc.getUserById(userId).subscribe(
          svcUser => {
            console.log('Got user', svcUser);
            this.editUser = svcUser;
            this.initEdit();
          },
          error => {
            console.log(error);
          }
        );
      }

    });
  }


  updateUser() {
    console.log('update user');
    // console.log(this.isEditingUser);
    if (!this.editUserForm.valid) {
      console.log("Form not valid");
      return;
    }

    this.loading = true;

    const user = this.editUserForm.value;

    this.editUser.userName = user.usr_userName;
    this.editUser.lastName = user.usr_lastName;
    this.editUser.firstName = user.usr_firstName;
    this.editUser.email = user.usr_email;

    // verify if the user has already some access.. if yes, update the index (id )
    if (this.editUser.userWeb === undefined || this.editUser.userWeb.length === 0) {
      this.editUser.userWeb = [];
    }

    for (let web of this.common.userWeb) {
      let wbaccess: UserWbsAccess = this.editUser.userWeb.filter(uf => uf.websiteAccess === web)[0];

      if (!wbaccess) {
        wbaccess = new UserWbsAccess(-1, this.common.acc.Unauthorized, web);
        this.editUser.userWeb.push(wbaccess);
      }

      switch (web) {
        case this.common.web.service: {
          wbaccess.accessLevel = user.usr_access0;
          break;
        }
        case this.common.web.Isabelle: {
          wbaccess.accessLevel = user.usr_access1;
          break;
        }
        case this.common.web.Mathieu: {
          wbaccess.accessLevel = user.usr_access2;
          break;
        }
        case this.common.web.Headless: {
          wbaccess.accessLevel = user.usr_access3;
          break;
        }
      }
    }


    this.userSvc.saveUser(this.editUser).subscribe({
      next: (data) => {
        this.loading = false;
        this.message = 'Update successful';
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.loading = false;
        this.error = 'server error';
        window.scroll(0, 0);
      }
    });
  }

  cancel() {
    console.log('cancel');
  }

  initEdit() {
    this.UserAccess = [];

    // Pre-populate
    this.editUserForm.setValue({
      usr_userName: this.editUser.userName,
      usr_firstName: this.editUser.firstName,
      usr_lastName: this.editUser.lastName,
      usr_email: this.editUser.email,
      usr_access0: '',
      usr_access1: '',
      usr_access2: '',
      usr_access3: ''
    });

    let idx = 0;// build website access. match
    for (const web of this.common.userWeb) {

      const wbaccess = this.editUser.userWeb.filter(uf => uf.websiteAccess === web)[0];
      let websiteAccess;

      if (wbaccess) {
        this.UserAccess.push(wbaccess);
        websiteAccess = wbaccess.accessLevel;
      } else {
        const wbacc = new UserWbsAccess(-1, this.common.acc.Unauthorized, web);
        websiteAccess = wbacc.accessLevel;
        this.UserAccess.push(wbacc);
      }

      switch (idx) {
        case 0: {
          this.editUserForm.patchValue({ usr_access0: websiteAccess }); // update the form to set the right value
          break;
        }
        case 1: {
          this.editUserForm.patchValue({ usr_access1: websiteAccess }); // update the form to set the right value
          break;
        }
        case 2: {
          this.editUserForm.patchValue({ usr_access2: websiteAccess }); // update the form to set the right value
          break;
        }
        case 3: {
          this.editUserForm.patchValue({ usr_access3: websiteAccess }); // update the form to set the right value
          break;
        }
      }
      idx++;
    }
    console.log(this.UserAccess);
  }

}
