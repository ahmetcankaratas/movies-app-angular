import { Genre } from './genre';
import { Item } from '../components/item/item';

export interface Tv {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  revenue: number;
  runtime: number;
  status: string;
  genres: Genre[];
}

export interface TvDto {
  page: number;
  results: Tv[];
  total_pages: number;
  total_results: number;
}

export interface TvVideoDto {
  id: number;
  results: TvVideo[];
}

export interface TvVideo {
  id: string;
  key: string;
  site: string;
}

export interface TvImages {
  backdrops: {
    file_path: string;
  };
}

export interface TvCredits {
  cast: {
    name: string;
    profile_path: string;
  }[];
}

export const mapTvShowToItem = (tvShow: Tv): Item => {
  return {
    id: tvShow.id,
    title: tvShow.name,
    poster_path: tvShow.poster_path,
    vote_average: tvShow.vote_average,
    backdrop_path: tvShow.backdrop_path,
    vote_count: tvShow.vote_count,
    release_date: tvShow.release_date,
    overview: tvShow.overview,
    routePath: '/tvshow/' + tvShow.id
  };
};
