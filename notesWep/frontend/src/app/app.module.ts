// Angular core modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Third-party modules
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { ColorPickerModule } from 'ngx-color-picker';

// Custom modules
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './materialModule';
import { SharedModule } from "./sharedModule";

// Users components
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { FriendRequestComponent } from './components/friendshipRequest/friendshipRequest.component';
import { FriendMenuComponent } from './components/friendshipsMenu/friendshipsMenu.component';
import { SendRequestComponent } from './components/friendshipRequest/sendRequest/sendRequest.component';
import { FriendshipComponent } from './components/friendship/friendship.component';
import { ListUsersComponent } from './components/usersList/usersList.component';

// Admin components
import { AdminMenuComponent } from './components/adminMenu/adminMenu.component';
import { AdminFriendMenuComponent } from './components/adminFriendshipMenu/adminFriendshipMenu.component';
import { AdminFriendshipComponent } from './components/adminFriendships/adminFriendships.component';
import { AdminFriendRequestComponent } from './components/adminFriendshipRequest/adminFriendshipRequest.component';
import { AdminSendRequestComponent } from './components/adminSendRequest/adminSendRequest.component';
import { ImageComponent } from './components/image/image.component';

// Other components
import { AppComponent } from './app.component';

@NgModule({
    declarations: [

        // Admin components
        AdminMenuComponent,
        AdminFriendshipComponent,
        AdminFriendMenuComponent,
        AdminSendRequestComponent,
        AdminFriendRequestComponent,
        
        
        // Users components
        UserComponent,
        UsersComponent,
        ListUsersComponent,
        FriendshipComponent,
        FriendMenuComponent,
        SendRequestComponent,
        FriendRequestComponent,

        // Other components
        AppComponent,
        ImageComponent,
        
    ],
    providers: [
        // Services and directives
        BsModalRef, 
        { provide: BsDropdownDirective, useValue: { autoClose: true } }
    ],
    bootstrap: [
        AppComponent
    ],
    imports: [
        // Angular modules
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,

        // Third-party modules
        ColorPickerModule,
        ModalModule.forRoot(),
        
        // Custom modules
        SharedModule,
        MaterialModule
        
    ]
})
export class AppModule { }