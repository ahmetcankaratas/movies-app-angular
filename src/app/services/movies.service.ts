import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/popular?api_key=f18401a2d4366fa55a7a2d3876c9f14e');
  }
}
