
import Swiper from './swiper-bundle.min.js'

export function initSwiper(slidesPerView) {
  const tabSwiper = new Swiper('.ui-tab', {
    slidesPerView: slidesPerView,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });

  const pageSwiper = new Swiper('.ui-page', {
    thumbs: {
      swiper: tabSwiper,
    },
  });
}