import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})

export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
    ) { }

ngOnInit(): void {
  const user = localStorage.getItem('user')
  if (!user) {
    this.router.navigate(['welcome']);
    return;
  }
  this.getMovies();
}

//This will get all movies from the API
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

//This will get the details of a movie's genre
getGenreDetails(genre: any): void {
  this.dialog.open(MovieDetailsComponent, {
    data: {
      title: genre.name,
      content: genre.description
    }
  })
}

//This will get the details of a movie's director
getDirectorDetails(director: any): void {
  this.dialog.open(MovieDetailsComponent, {
    data: {
      title: director.name,
      content: director.bio
    }
  })
}

 //This will get the details of a movie's synopsis
getMovieDetails(synopsis: string): void {
  this.dialog.open(MovieDetailsComponent, {
    data: {
      title: 'Description',
      content: synopsis
    }
  })
}

 //This will add a movie to the user's list of favorites
addFavorite(id: string): void {
  this.fetchApiData.addFavMovie(id).subscribe(
    () => {
       this.snackBar.open('Added to favorite list', 'OK', {
        duration: 2000
       })
    })
  }

//This will check if a movie is already in the user's list of favorites
  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id)
  }

// This will remove a movie from the user's list of favorites
removeFavorite(id: string): void {
  this.fetchApiData.deleteFavMovie(id).subscribe(
    () => {
      this.snackBar.open('Removed from favorite list', 'OK', {
        duration: 2000
      })
    }
  )
}

}

