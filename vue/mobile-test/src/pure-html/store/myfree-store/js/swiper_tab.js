// 頁籤
function initSwiper(slidesPerView) {
    var tabSwiper = new Swiper('.ui-tab', {
        slidesPerView: slidesPerView,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });

    var pageSwiper = new Swiper('.ui-page', {
        thumbs: {
            swiper: tabSwiper,
        },
    });
}