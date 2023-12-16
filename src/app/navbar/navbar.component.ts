import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router
  ) { }

  logoutUser(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}