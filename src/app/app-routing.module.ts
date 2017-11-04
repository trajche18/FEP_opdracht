import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

import { UserLoginComponent } from './ui/user-login/user-login.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { ReadmePageComponent } from './ui/readme-page/readme-page.component';
import { NotesListComponent } from './notes/notes-list/notes-list.component';

import { CoreModule } from './core/core.module'
import {LeningFormComponent} from "./lening/lening-form/lening-form.component";
import {LeningListComponent} from "./lening/lening-list/lening-list.component";
import {BeheerderGuard} from "./core/beheerder.guard";
import {LoginComponent} from "./users/login/login.component";
import {RegisterComponent} from "./users/register/register.component";
import {DashboardComponent} from "./users/dashboard/dashboard.component";
import {ProfileComponent} from "./users/profile/profile.component";
import {ProfileGuard} from "./core/profile.guard";
import {HardwareListComponent} from "./hardware/hardware-list/hardware-list.component";
import {HardwareToevoegenComponent} from "./hardware/toevoegen/hardware-toevoegen.component";
import {HardwareListUserComponent} from "./hardware/hardware-list-user/hardware-list-user.component";
import {LeningListUserComponent} from "./lening/lening-list-user/lening-list-user.component";

const routes: Routes = [
  { path: '', component: ReadmePageComponent },
  { path: 'user', children: [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, ProfileGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  ]},
  { path: 'items', component: ItemsListComponent, canActivate: [AuthGuard,ProfileGuard]},
  { path: 'hardware', children: [
    {path: 'new', component: HardwareToevoegenComponent, canActivate: [AuthGuard, BeheerderGuard, ProfileGuard]},
    {path: 'list', component: HardwareListComponent, canActivate: [AuthGuard, BeheerderGuard, ProfileGuard]},
    {path: 'list', children: [
      {path: 'user', component: HardwareListUserComponent, canActivate: [AuthGuard, ProfileGuard]},
    ]}
  ]},
  { path: 'lening', children: [
    {path: 'new', component: LeningFormComponent, canActivate: [AuthGuard, ProfileGuard]},
    {path: 'list', component: LeningListComponent, canActivate: [AuthGuard, BeheerderGuard, ProfileGuard]},
    {path: 'list', children: [
      {path: 'user', component: LeningListUserComponent, canActivate: [AuthGuard, ProfileGuard]},
    ]}
  ]},
  { path: 'notes', component: NotesListComponent,  canActivate: [AuthGuard, ProfileGuard] },
  // uploads are lazy loaded
  { path: 'uploads', loadChildren: './uploads/shared/upload.module#UploadModule', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, BeheerderGuard, ProfileGuard]
})
export class AppRoutingModule { }
