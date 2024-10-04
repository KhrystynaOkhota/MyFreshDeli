//*===========
//*  SWIPER  =
//*===========
jQuery(function ($) {
	'use strict';
	// Options set Swiper
	_functions.getSwOptions = function (swiper) {
		let options = swiper.data('options');
		options = !options || typeof options !== 'object' ? {} : options;
		const $p = swiper.closest('.swiper-entry'),
			slidesLength = swiper.closest('.swiper-entry').find('.swiper-wrapper>.swiper-slide').length;

		if (options.arrowsOut) {
			if (!options.navigation)
				options.navigation = {
					nextEl: $p.closest('section').find('.swiper-button-next')[0],
					prevEl: $p.closest('section').find('.swiper-button-prev')[0],
				};
			if (!options.pagination)
				options.pagination = {
					el: $p.closest('section').find('.swiper-pagination')[0],
					clickable: false,
					//dynamicBullets:  true : false,
					type: slidesLength > 20 ? 'fraction' : 'bullets',
				};
		} else {
			if (!options.pagination)
				options.pagination = {
					el: $p.find('.swiper-pagination')[0],
					clickable: false,
					//dynamicBullets:  true : false,
					type: slidesLength > 20 ? 'fraction' : 'bullets',
				};
			if (!options.navigation)
				options.navigation = {
					nextEl: $p.find('.swiper-button-next')[0],
					prevEl: $p.find('.swiper-button-prev')[0],
				};
		}

		options.preloadImages = false;
		options.lazy = {
			loadPrevNext: true,
		};
		if (!('centerInsufficientSlides' in options)) {
			options.centerInsufficientSlides = true;
		}
		options.observer = true;
		options.observeParents = true;
		options.watchOverflow = true;

		if (!options.speed) options.speed = 700;
		options.roundLengths = true;
		if (slidesLength <= 1) {
			options.loop = false;
		}
		return options;
	};

	// Init each Swiper
	_functions.initSwiper = function (el) {
		const swiper = new Swiper(el[0], _functions.getSwOptions(el));
	};

	_functions.initSwipers = function (selector = document) {
		$(selector)
			.find('.swiper-entry .swiper-container')
			.each(function () {
				let thisSlider = $(this);

				_functions.initSwiper(thisSlider);

				let $thisSwiper = $(this)[0].swiper;

				if ($thisSwiper.isLocked) {
					thisSlider.closest('.swiper-entry').addClass('swiper-controls-hide');
				} else {
					thisSlider.closest('.swiper-entry').removeClass('swiper-controls-hide');
				}

			});
	};

	_functions.initSwipers();


	//video bullet
	if ($('.product-detail__swiper-main').length) {
		$('.product-detail__swiper-main .swiper-slide').each(function () {
			let slideVideo = $(this).find('.video-slide'),
			indexVideoSlide = $(this).index();

			if(slideVideo.length){
				$('.product-detail__swiper-main .swiper-pagination-bullet').eq(indexVideoSlide).addClass('video-bullet');
			}
		});

	}


	$('.swiper-thumbs').each(function () {
		if ($('.swiper-thumbs-top').length && $('.swiper-thumbs-bottom').length) {
			let t = $(this);
			let top = $(this).find('.swiper-container.swiper-thumbs-top')[0].swiper,
				bottom = $(this).find('.swiper-container.swiper-thumbs-bottom')[0].swiper;
			top.thumbs.swiper = bottom;
			top.thumbs.init();
			top.thumbs.update();

			if (top.slides.length < 2) {
				t.addClass('hide-bottom');
			}
	    }
	});
});
