import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { IMAGES_SIZES } from 'src/app/constants/images-sizes';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [trigger('slideFade', [state('void', style({ opacity: 0 })), transition('void <=> *', [animate('1s')])])]
})
export class SliderComponent implements OnInit{
  @Input() items: Movie[] = [];

  currentSlideIndex: number = 0;

  readonly imagesSizes = IMAGES_SIZES

  ngOnInit(){
    setInterval(()=>{
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.items.length;
    },5000)
  }
}
