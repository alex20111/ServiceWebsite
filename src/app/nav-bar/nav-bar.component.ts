import { AuthService } from './../services/auth.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { User } from '../_models/User';

import 'src/js/sb-admin-2.min.js';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userLogged: User;
  extendSideMenu: boolean;

  // @Output() childMessage = new EventEmitter<boolean>();

  constructor(private authSvc: AuthService, private renderer: Renderer2) {
    this.authSvc.getCurrObservableUserLogged().subscribe(u => this.userLogged = u);
  }

  ngOnInit(): void {
    // this.userloggedIn = this.userSvc.isUserLogged();
    this.extendSideMenu = true;
  }

  toggleSideMenu() {

    this.extendSideMenu = !this.extendSideMenu;

    if (!this.extendSideMenu) {
      this.renderer.addClass(document.body, 'sidebar-toggled');
    } else {
      this.renderer.removeClass(document.body, 'sidebar-toggled');
    }

  }

  isAdmin(): boolean{
    return this.authSvc.isAdmin();
  }

}
