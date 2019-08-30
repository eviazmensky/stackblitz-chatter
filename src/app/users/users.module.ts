import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { UserRowComponent } from './components/user-row/user-row.component';
import { UserRoutingModule } from './users-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsersComponent, AddUserComponent, ListUsersComponent, UserRowComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule
  ]
})
export class UsersModule { }
