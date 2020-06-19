import { User, UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
userloggedIn: boolean;


  constructor(private userSvc: UserService) { }

  ngOnInit(): void {
    this.userloggedIn = this.userSvc.isUserLogged();
  }
}
