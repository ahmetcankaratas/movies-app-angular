import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Item } from 'src/app/components/item/item';
import { IMAGES_SIZES } from 'src/app/constants/images-sizes';
import { mapTvShowToItem, Tv, TvCredits, TvImages, TvVideo } from 'src/app/models/tv';
import { TvService } from 'src/app/services/tv.service';

@Component({
  selector: 'app-tvshow',
  templateUrl: './tvshow.component.html',
  styleUrls: ['./tvshow.component.scss']
})
export class TvshowComponent implements OnInit, OnDestroy {
  tvShow: Tv | null = null;
  tvShowBanner: Item | null = null;
  imagesSizes = IMAGES_SIZES;
  tvShowVideos: TvVideo[] = [];
  tvShowImages: TvImages | null = null;
  tvShowCredits: TvCredits | null = null;

  constructor(private route: ActivatedRoute, private tvshowService: TvService) {}

  ngOnInit() {
    this.route.params.pipe(first()).subscribe(({ id }) => {
      this.getTvshow(id);
      this.getTvshowVideos(id);
      this.getTvshowImages(id);
      this.getTvshowCredits(id);
    });
  }

  getTvshow(id: string) {
    this.tvshowService.getTvShow(id).subscribe((tvshowData) => {
      this.tvShow = tvshowData;
      this.tvShowBanner = mapTvShowToItem(tvshowData);
      console.log(this.tvShow);
    });
  }

  getTvshowVideos(id: string) {
    this.tvshowService.getTvShowVideos(id).subscribe((tvshowVideosData) => {
      this.tvShowVideos = tvshowVideosData;
    });
  }

  getTvshowImages(id: string) {
    this.tvshowService.getTvShowImages(id).subscribe((tvshowImagesData) => {
      this.tvShowImages = tvshowImagesData;
    });
  }

  getTvshowCredits(id: string) {
    this.tvshowService.getTvShowCredits(id).subscribe((tvshowCreditsData) => {
      this.tvShowCredits = tvshowCreditsData;
    });
  }

  ngOnDestroy() {
    console.log('Tvshow component destroyed');
  }
}
