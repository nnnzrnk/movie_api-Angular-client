import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { map } from 'rxjs/operators';

const apiUrl = 'https://movie-api-da5i.onrender.com/';
@Injectable({
  providedIn: 'root',
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

/**
 * Making the api call for the user registration endpoint
 * @param userDetails 
 * @returns user registered
 */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

/**
 * Making the api call for the user login endpoint
 * @param userDetails 
 * @returns user logged in
 */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

/**
 * Making the api call for getting all movies endpoint
 * @returns all movies
 * @throws error
 */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

/**
 * Making the api call for getting one movie endpoint
 * @param title 
 * @returns one movie
 *  @throws error
 */
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

/**
 * Making the api call for getting director endpoint
 * @param directorName 
 * @returns director's details
 * @throws error
 */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/director/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

/**
 * Making the api call for getting genre endpoint
 * @param genreName 
 * @returns genre's details
 * @throws error
 */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genre/' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

/**
 * Making the api call for getting user endpoint
 * @param userName 
 * @returns user's details
 * @throws error
 */
  getUser(userName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + userName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

/**
 * Making the api call for updating user endpoint
 * @param updatedUser 
 * @returns user's details updated
 * @throws error
 */
  editUser(updatedUser: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + user.name, updatedUser, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

/**
 * Making the api call for deleting user endpoint
 * @returns user's details deleted
 * @throws error
 */
  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + user.name, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

/**
 * Making the api call for adding user's fav movie endpoint
 * @param FavMovie 
 * @returns user's fav movie added
 * @throws error
 */
  addFavMovie(FavMovie: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.favoriteMovies.push(FavMovie)
    localStorage.setItem('user', JSON.stringify(user));
    return this.http
      .post(apiUrl + 'users/' + user.name + '/movies/' + FavMovie, {}, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

/**
 * Making the api call for deleting user's fav movie endpoint
 * @param FavMovie 
 * @returns  user's fav movie deleted
 */
  deleteFavMovie(FavMovie: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const index = user.favoriteMovies.indexOf(FavMovie)
    if (index > -1) {
      user.favoriteMovies.splice(index, 1)
    }
    localStorage.setItem('user', JSON.stringify(user))
    return this.http
      .delete(apiUrl + 'users/' + user.name + '/movies/' + FavMovie, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Method to check if a movie is in the user's favorite movies
   * @param movieId 
   * @returns boolean
   */
  isFavoriteMovie(movieId: string): boolean{
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.favoriteMovies.indexOf(movieId) >= 0
  }

  /**
   * Method to get user's fav movies
   * @returns user's fav movies
   * @throws error
   */
  getFavMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http
      .get(apiUrl + 'users/' + userName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
