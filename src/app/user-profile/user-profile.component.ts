import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

type User = {
  _id?: string;
  name?: string;
  password?: string;
  email?: string;
  favoriteMovies?: [];
};

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  user: User = {};

  @Input() userData = { name: '', password: '', email: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    const user = this.getUser();

    if (!user._id) {
      this.router.navigate(['welcome']);
      return;
    }

    this.user = user;
    this.userData = {
      name: user.name || '',
      email: user.email || '',
      password: '',
    };
  }

  /**
   * This method will get the user's data
   * @returns user's data
   */
  getUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

/**
 * This method will update the user's data
 * @returns user's data
 * @returns updated user's data saved to local storage
 * @returns user notified of success
 * @returns user notified of error
 */
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      console.log(result);
      localStorage.setItem('user', JSON.stringify(result));
      this.user = result;
      this.snackBar.open('Data successfully updated!', 'OK', {
        duration: 2000,
      });
    });
  }

/**
 * This method will delete the user's account
 * @returns confirmation prompt
 * @returns user's account deleted
 * @returns user navigated to welcome page
 * @returns user notified of success
 * @returns user notified of error
 * @returns user token and user details removed from local storage
 */
  deleteUser(): void {
    if (confirm('Sure?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Successfully deleted', 'OK', { duration: 2000 });
      });

      this.fetchApiData.deleteUser().subscribe(
        (result) => {
          console.log(result);
        }
      );
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
}
