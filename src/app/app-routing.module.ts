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
import {LeningVerlengenComponent} from "./lening/lening-verlengen/lening-verlengen.component";

const routes: Routes = [
  { path: '', component: ReadmePageComponent },
  { path: 'user', children: [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, ProfileGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  ]},
  { path: 'items', component: ItemsListComponent, canActivate: [AuthGuard]},
  { path: 'lening', children: [
    {path: 'new', component: LeningFormComponent},
    {path: 'list', component: LeningListComponent, canActivate: [BeheerderGuard]},
  ]},
  { path: 'notes', component: NotesListComponent,  canActivate: [AuthGuard] },
  // uploads are lazy loaded
  { path: 'uploads', loadChildren: './uploads/shared/upload.module#UploadModule', canActivate: [AuthGuard] },
  { path: 'lening-verlengen', component: LeningVerlengenComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, BeheerderGuard, ProfileGuard]
})
export class AppRoutingModule { }
