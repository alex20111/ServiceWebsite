import { ChangePasswordComponent } from './user-management/change-password/change-password.component';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { EditUserComponent } from './user-management/edit-user/edit-user.component';
import { InvNavComponent } from './nav-bar/inv-nav/inv-nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InvgrpAddFormComponent } from './nav-bar/inv-nav/invgrp-add-form/invgrp-add-form.component';
import { InventoryPageComponent } from './inventory-page/inventory-page.component';
import { AddInventoryPageComponent } from './inventory-page/add-inventory-page/add-inventory-page.component';
import { EditInventoryPageComponent } from './inventory-page/edit-inventory-page/edit-inventory-page.component';
import { NewGroupNameModalComponent } from './inventory-page/new-group-name-modal/new-group-name-modal.component';
import { InventoryItemSearchComponent } from './inventory-page/inventory-item-search/inventory-item-search.component';
import { NgxEchartsModule } from 'ngx-echarts';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TopNavComponent,
    HomePageComponent,
    LoginPageComponent,
    UserManagementComponent,
    ChangePasswordComponent,
    EditUserComponent,
    InvNavComponent,
    InvgrpAddFormComponent,
    InventoryPageComponent,
    AddInventoryPageComponent,
    EditInventoryPageComponent,
    NewGroupNameModalComponent,
    InventoryItemSearchComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
              { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


