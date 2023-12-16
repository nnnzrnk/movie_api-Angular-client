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

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

getGenreDetails(genre: any): void {
  this.dialog.open(MovieDetailsComponent, {
    data: {
      title: genre.name,
      content: genre.description
    }
  })
}

getDirectorDetails(director: any): void {
  this.dialog.open(MovieDetailsComponent, {
    data: {
      title: director.name,
      content: director.bio
    }
  })
}

getMovieDetails(synopsis: string): void {
  this.dialog.open(MovieDetailsComponent, {
    data: {
      title: 'Description',
      content: synopsis
    }
  })
}

addFavorite(id: string): void {
  this.fetchApiData.addFavMovie(id).subscribe(
    () => {
       this.snackBar.open('Added to favorite list', 'OK', {
        duration: 2000
       })
    })
  }

  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id)
  }

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

