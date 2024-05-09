// Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Other imports
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from 'src/app/sharedModule';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    ProfileComponent,
  ],

  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule
  ],
  
  providers: [],
  bootstrap: [UserComponent]
})

export class UserModule { }