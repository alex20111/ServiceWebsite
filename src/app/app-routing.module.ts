import { EditInventoryPageComponent } from './inventory-page/edit-inventory-page/edit-inventory-page.component';
import { AddInventoryPageComponent } from './inventory-page/add-inventory-page/add-inventory-page.component';
import { InventoryPageComponent } from './inventory-page/inventory-page.component';
import { EditUserComponent } from './user-management/edit-user/edit-user.component';
import { ChangePasswordComponent } from './user-management/change-password/change-password.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AuthGuard } from './helpers/auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryItemSearchComponent } from './inventory-page/inventory-item-search/inventory-item-search.component';


const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'users/:add', component: UserManagementComponent,  canActivate: [AuthGuard]  },
  { path: 'editUser/:usr', component: EditUserComponent,  canActivate: [AuthGuard]  },
  { path: 'changePass', component: ChangePasswordComponent,  canActivate: [AuthGuard]  },
  { path: 'inv/:invId', component: InventoryPageComponent,  canActivate: [AuthGuard] },
  { path: 'invEdit/:itmId', component: EditInventoryPageComponent,  canActivate: [AuthGuard] },
  { path: 'invAdd/:grpId', component: AddInventoryPageComponent,  canActivate: [AuthGuard]  },
  { path: 'invSearch', component: InventoryItemSearchComponent,  canActivate: [AuthGuard]  },
  { path: '', component: HomePageComponent },
  { path: '**', component: HomePageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

