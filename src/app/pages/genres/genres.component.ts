import { Component } from '@angular/core';
import { Genre } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { TvService } from 'src/app/services/tv.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent {
  movieGenres: Genre[] = [];
  tvShowGenres: Genre[] = [];

  constructor(private moviesService: MoviesService, private tvshowService: TvService) {}

  ngOnInit(): void {
    this.moviesService.getMoviesGenres().subscribe((genresData) => {
      this.movieGenres = genresData;
    });

    this.tvshowService.getTvShowsGenres().subscribe((genresData) => {
      this.tvShowGenres = genresData;
    });
  }
}
