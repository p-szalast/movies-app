import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('slideFade', [
      state(
        'void',
        style({
          opacity: 0,
        })
      ),
      transition('void <=> *', [animate('1s')]),
      // transition('void => *', [animate('1s')]),
      // transition('* => void', [animate('500ms')]),
    ]),
  ],
})
export class SliderComponent {
  @Input() items: Movie[] = [];

  currentSlideIndex: number = 0;

  ngOnInit(): void {
    setInterval(() => {
      this.currentSlideIndex = ++this.currentSlideIndex % this.items.length;
    }, 5000);
  }
}
