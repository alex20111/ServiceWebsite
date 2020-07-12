import { ChangePasswordComponent } from './user-management/change-password/change-password.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AuthGuard } from './helpers/auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RadioPageComponent } from './radio-page/radio-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'radio', component: RadioPageComponent,  canActivate: [AuthGuard]  },
  { path: 'users/:add', component: UserManagementComponent,  canActivate: [AuthGuard]  },
  { path: 'changePass', component: ChangePasswordComponent,  canActivate: [AuthGuard]  },
  { path: '', component: HomePageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
