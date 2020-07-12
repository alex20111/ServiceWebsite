import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../_models/User';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  user: User;

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void { 
    this.authSvc.getCurrObservableUserLogged().subscribe(u => this.user = u);
      // this.user = this.userSvc.getCurrentUser();
  }

}
