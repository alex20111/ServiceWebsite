import { AuthService } from './../services/auth.service';
import { UserService } from '../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/User';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  public userLogged: User;

  constructor(private authSvc: AuthService, private router: Router) {
    this.authSvc.getCurrObservableUserLogged().subscribe(u => this.userLogged = u);
   }

  ngOnInit(): void {
  }

  logout(){
    this.authSvc.logout();
    this.router.navigate(['/']);
    this.userLogged = null;
  }

}
