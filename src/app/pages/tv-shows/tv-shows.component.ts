import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tv } from 'src/app/models/tv';
import { TvService } from 'src/app/services/tv.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss']
})
export class TvComponent implements OnInit {
  tvShows: Tv[] = [];
  genreId: string | null = null;
  searchValue: string | null = null;

  constructor(private tvService: TvService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getTvShowsByGenre(genreId, 1);
      } else {
        this.getPagedTvShows(1);
      }
    });
  }

  getPagedTvShows(page: number, searchKeyword?: string) {
    this.tvService.searchTvShows(page, searchKeyword).subscribe((tvShows) => {
      this.tvShows = tvShows;
    });
  }

  getTvShowsByGenre(genreId: string, page: number) {
    this.tvService.getTvShowsByGenre(genreId, page).subscribe((tvShows) => {
      this.tvShows = tvShows;
    });
  }

  searchChanged() {
    if (this.searchValue) {
      this.getPagedTvShows(1, this.searchValue);
    }
  }

  paginate($event: any) {
    const pageNumber = $event.page + 1;
    if (this.genreId) {
      this.getTvShowsByGenre(this.genreId, pageNumber);
    } else {
      if (this.searchValue) {
        this.getPagedTvShows(pageNumber, this.searchValue);
      } else {
        this.getPagedTvShows(pageNumber);
      }
    }
  }
}
