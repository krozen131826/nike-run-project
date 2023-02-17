import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HelperService } from 'src/app/modules/shared/service/helper.service';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-mens',
  templateUrl: './mens.component.html',
  styleUrls: ['./mens.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MensComponent implements OnInit {
  constructor(private helperService: HelperService) {}
  @ViewChild('swiper', { static: false }) swiper!: SwiperComponent;

  config: SwiperOptions = {
    slidesPerView: 3,
    loop: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  userName$ = this.helperService.userNameObs$;

  slideNext() {
    this.swiper.swiperRef.slideNext(500);
  }
  slidePrev() {
    this.swiper.swiperRef.slidePrev(500);
  }

  data = [
    {
      image: '../../../../../assets/image/Nike Winflo 8-1.png',
    },
    {
      image: '../../../../../assets/image/Nike Winflo 8-1.png',
    },
    {
      image: '../../../../../assets/image/Nike Winflo 8-1.png',
    },
  ];

  ngOnInit(): void {}
}
