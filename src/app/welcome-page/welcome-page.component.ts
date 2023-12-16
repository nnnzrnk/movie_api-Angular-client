import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {

   constructor(public dialog: MatDialog) {}
   ngOnInit(): void {}

   openUserRegistrationDialog(): void {
     this.dialog.open(UserRegistrationFormComponent, {
      width: '380px'
     })
   }
   openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '380px'
    })
   }
}
