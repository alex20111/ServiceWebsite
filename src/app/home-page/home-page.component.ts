import { Component, OnInit } from '@angular/core';
import {User,  UserService } from '../user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  userLogged: boolean;
  user: User;

  constructor(private userSvc: UserService) { }

  ngOnInit(): void {
    this.userLogged = this.userSvc.isUserLogged();

    if (this.userLogged){
      this.user = this.userSvc.getLoggedInUser();
    }

    console.log(this.userLogged);
  }

}
