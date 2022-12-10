import $ from 'jquery'

var winHeight = $(window).height(); // 頁面高度
var headerHeight = 0; // 表頭
var footerHeight = 0; // 表尾
var tabHeight = 0; // 頁籤

$(function () {
	// 監聽：移入焦點
	$('input, textarea')
		.not($('input[type=checkbox]'))
		.not($('input[type=radio]'))
		.not($('input[type=file]'))
		.not($('input[readonly]'))
		.not($('input[disabled]'))
		.focus(function () {
			$('body').addClass('fixfixed');
		});

	// 監聽：失去焦點
	$('input, textarea')
		.not($('input[type=checkbox]'))
		.not($('input[type=radio]'))
		.not($('input[type=file]'))
		.not($('input[readonly]'))
		.not($('input[disabled]'))
		.blur(function () {
			$('body').removeClass('fixfixed');
		});

    // 抓取最小高度
	minHeight();

	// 加入最愛
	$('.btn-favorite').click(function () {
		$(this).toggleClass('active');
	})
})

$(window).resize(function () {
	// 抓取最小高度
	minHeight();
});

// 抓取最小高度
function minHeight() {
    winHeight = $(window).height();
	headerHeight = $('.c-header').innerHeight() || 0; // 表頭
	footerHeight = $('.c-footer').innerHeight() || 0; // 表尾
	tabHeight = $('.ui-tab').innerHeight() || 0; // 頁籤
	var resultHeight = winHeight - headerHeight - footerHeight;
	var resultHeight2 = winHeight - headerHeight - footerHeight - tabHeight - 1;
    $('.c-main').css({'padding-top': headerHeight, 'padding-bottom': footerHeight});
	$('.minHeight-outer').css('min-height', resultHeight);
	$('.ui-page .swiper-slide').css('height', resultHeight2);
	$('.map-container').css('padding-bottom', resultHeight2);
}