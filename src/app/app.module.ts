import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


///// Start FireStarter

// Core
import { CoreModule } from './core/core.module';

// Shared/Widget
import { SharedModule } from './shared/shared.module'

// Feature Modules
import { ItemModule } from './items/shared/item.module';
import { UploadModule } from './uploads/shared/upload.module';
import { UiModule } from './ui/shared/ui.module';
import { NotesModule } from './notes/notes.module'
///// End FireStarter


import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = environment.firebaseConfig;
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FormsModule } from '@angular/forms';
import { LeningFormComponent } from './lening/lening-form/lening-form.component';
import { LeningListComponent } from './lening/lening-list/lening-list.component';
import {LeningModule} from "./lening/shared/lening.module";
import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';
import {UsersModule} from "./users/users.module";
import { ResetPasswordComponent } from './users/reset-password/reset-password.component';
import { DashboardComponent } from './users/dashboard/dashboard.component';
import { ProfileComponent } from './users/profile/profile.component';
import {LeningVerlengenComponent} from "./lening/lening-verlengen/lening-verlengen.component";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ItemModule,
    LeningModule,
    UsersModule,
    UiModule,
    NotesModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
