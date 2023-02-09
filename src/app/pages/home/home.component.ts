import { Component, OnInit } from '@angular/core';
import { mapMovieToItem, Movie } from '../../models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { Item } from 'src/app/components/item/item';
import { TvService } from 'src/app/services/tv.service';
import { Tv } from 'src/app/models/tv';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popularMovies: Item[] = [];
  upcomingMovies: Item[] = [];
  topRatedMovies: Item[] = [];
  popularTvShows: Tv[] = [];

  constructor(private moviesService: MoviesService, private tvService: TvService) {}

  ngOnInit() {
    this.moviesService.getMovies('popular').subscribe((movies) => {
      this.popularMovies = movies.map((movie) => mapMovieToItem(movie));
    });
    this.moviesService.getMovies('upcoming').subscribe((movies) => {
      this.upcomingMovies = movies.map((movie) => mapMovieToItem(movie));
    });
    this.moviesService.getMovies('top_rated').subscribe((movies) => {
      this.topRatedMovies = movies.map((movie) => mapMovieToItem(movie));
    });
    this.tvService.getTvShows('popular').subscribe((tvShows) => {
      this.popularTvShows = tvShows;
    });
  }
}
