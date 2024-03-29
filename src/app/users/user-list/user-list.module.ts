import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { UserListPage } from './user-list.page';
import { UserListPageRoutingModule } from './user-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserListPageRoutingModule
  ],
  declarations: [UserListPage]
})
export class UserListPageModule {}
