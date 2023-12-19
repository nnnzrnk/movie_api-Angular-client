import { Component, OnInit, Input } from '@angular/core';
// This import closes the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';
// This import displays notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss',
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { name: '', password: '', email: '', birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

 /**
  * This function registers a new user
  * @returns user registered
  * @returns user logged in
  * @returns user navigated to movies view
  * @returns user token and user details saved to local storage
  * @returns user notified of success
  * @returns user notified of error 
  */
  registerUser(): void {

    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        this.dialogRef.close(); // This will close the modal on success!
        console.log(result)
        this.snackBar.open("Successfully registered!", 'OK', { duration: 2000 });

        this.fetchApiData.userLogin(this.userData).subscribe(
          (result) => {
            localStorage.setItem('token', result.token)
            localStorage.setItem('user', JSON.stringify(result.user))
            this.router.navigate(['movies']);
          })
      },
      (result) => {
        console.log(result)
        this.snackBar.open(result, 'OK', {duration: 2000});
      }
    );
  }
}

