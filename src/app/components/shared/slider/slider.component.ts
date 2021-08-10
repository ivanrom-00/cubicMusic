import { Component, OnInit, Input, AfterViewInit} from '@angular/core';
import { ArtistaModel } from 'src/app/models/artista.model';
import Swiper, { Navigation, Pagination } from 'swiper';



Swiper.use([Navigation, Pagination]);

// import Swiper from 'swiper/bundle';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, AfterViewInit  {

  

  @Input() artistas: ArtistaModel[];

  constructor() { }

  ngOnInit(): void {


  }

  ngAfterViewInit() {
    var mySwiper = new Swiper('.swiper-container', {
      // Optional parameters
      loop: true,

      effect: 'flip',
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
      },
    
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    
      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    })
  }

  onSwiper(swiper) {
    console.log(swiper)
  }
  onSlideChange() {
    console.log('slide change')
  }

}
