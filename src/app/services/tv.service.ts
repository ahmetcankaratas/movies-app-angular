import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tv, TvCredits, TvDto, TvImages, TvVideoDto } from '../models/tv';

@Injectable({
  providedIn: 'root'
})
export class TvService {
  baseUrl: string = environment.baseUrl;
  apiKey: string = environment.apiKey;

  constructor(private http: HttpClient) {}

  getTvShows(type: string = 'popular', count: number = 12) {
    return this.http.get<TvDto>(`${this.baseUrl}/tv/${type}?api_key=${this.apiKey}`).pipe(
      switchMap((response) => {
        return of(response.results.slice(0, count));
      })
    );
  }

  searchTvShows(page: number, searchValue?: string) {
    const uri = searchValue ? '/search/tv' : '/tv/popular';
    return this.http.get<TvDto>(`${this.baseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`).pipe(
      switchMap((response) => {
        return of(response.results);
      })
    );
  }

  getTvShow(id: string) {
    return this.http.get<Tv>(`${this.baseUrl}/tv/${id}?api_key=${this.apiKey}`);
  }

  getTvShowVideos(id: string) {
    return this.http.get<TvVideoDto>(`${this.baseUrl}/tv/${id}/videos?api_key=${this.apiKey}`).pipe(
      switchMap((response) => {
        return of(response.results);
      })
    );
  }

  getTvShowImages(id: string) {
    return this.http.get<TvImages>(`${this.baseUrl}/tv/${id}/images?api_key=${this.apiKey}`);
  }

  getTvShowCredits(id: string) {
    return this.http.get<TvCredits>(`${this.baseUrl}/tv/${id}/credits?api_key=${this.apiKey}`);
  }

  getSimilarTvShows(id: string) {
    return this.http.get<TvDto>(`${this.baseUrl}/tv/${id}/similar?api_key=${this.apiKey}`).pipe(
      switchMap((response) => {
        return of(response.results);
      })
    );
  }

  getTvShowsGenres() {
    return this.http.get(`${this.baseUrl}/genre/tv/list?api_key=${this.apiKey}`);
  }

  getTvShowsByGenre(genreId: string, page: number) {
    return this.http
      .get<TvDto>(`${this.baseUrl}/discover/tv?api_key=${this.apiKey}&with_genres=${genreId}&page=${page}`)
      .pipe(
        switchMap((response) => {
          return of(response.results);
        })
      );
  }
}
