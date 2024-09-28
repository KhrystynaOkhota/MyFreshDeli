var _functions = {}, winWidth, shareButton;

jQuery(function ($) {
    var isTouchScreen = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);
    if (isTouchScreen)
        $('html').addClass('touch-screen');
    var winScr, winHeight, is_Mac = navigator.platform.toUpperCase().indexOf('MAC') >= 0,
        is_IE = /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent) || /Edge\/\d+/.test(navigator.userAgent),
        is_Chrome = navigator.userAgent.indexOf('Chrome') >= 0 && navigator.userAgent.indexOf('Edge') < 0;
    winWidth = $(window).width();
    winHeight = $(window).height();
    if (is_Mac) {
        $('html').addClass('mac');
    }
    if (is_IE) {
        $('html').addClass('ie');
    }
    if (is_Chrome) {
        $('html').addClass('chrome');
    }

    /*new slider*/
    _functions.getSwOptions = function (swiper) {
        var options = swiper.data('options');
        options = (!options || typeof options !== 'object') ? {} : options;
        var $p = swiper.closest('.swiper-entry'),
            slidesLength = swiper.find('>.swiper-wrapper>.swiper-slide').length;
        if (!options.pagination)
            options.pagination = {
                el: $p.find('.swiper-pagination')[0],
                type: 'progressbar',
                clickable: true
            };
        if (!options.navigation)
            options.navigation = {
                nextEl: $p.find('.swiper-button-next')[0],
                prevEl: $p.find('.swiper-button-prev')[0]
            };
        options.preloadImages = false;
        options.lazy = {
            loadPrevNext: true
        };
        options.observer = true;
        options.observeParents = true;
        options.watchOverflow = true;
        options.speed = 500;
        options.direction = "horizontal";
        options.roundLengths = false;
        if (!options.centerInsufficientSlides)
            options.centerInsufficientSlides = false;
        if (isTouchScreen)
            options.direction = "horizontal";


        if (slidesLength <= 1) {
            options.loop = false;
            $p.addClass('hide-control');
        }
        if (options.customFraction) {
            $p.addClass('custom-fraction');
            if (slidesLength > 1 && slidesLength < 10) {
                $p.find('.custom-current').text('01');
                $p.find('.custom-total').text('0' + slidesLength);
            } else if (slidesLength > 1) {
                $p.find('.custom-current').text('01');
                $p.find('.custom-total').text('0' + slidesLength);
            }
        }
        return options;
    }
    ;
    _functions.initSwiper = function (el) {
        var swiper = new Swiper(el[0], _functions.getSwOptions(el));
    };
    $('.swiper-entry .swiper-container').each(function () {
        _functions.initSwiper($(this));
    });

    //custom fraction
    $('.custom-fraction').each(function () {
        var $this = $(this),
            $thisSwiper = $this.find('.swiper-container')[0].swiper,
            currentSlide = $thisSwiper.realIndex + 1;
        $thisSwiper.on('slideChange', function () {
            $this.find('.custom-current').text(
                function () {
                    currentSlide = $thisSwiper.realIndex + 1;
                    if ($thisSwiper.realIndex < 9) {
                        return ('0' + currentSlide)
                    } else {
                        return '0' + currentSlide
                    }
                }
            )
        });
    });


    $('.swiper-thumbs').each(function () {
        var top = $(this).find('.swiper-container.swiper-top')[0].swiper, bottom;
        if ($(window).width() < 768) {
            bottom = $(this).find('.swiper-container.swiper-bottom2')[0].swiper;
        } else {
            bottom = $(this).find('.swiper-container.swiper-bottom')[0].swiper;
        }
        top.thumbs.swiper = bottom;
        top.thumbs.init();
        top.thumbs.update();
    });
    $('.swiper-control').each(function () {
        var top = $(this).find('.swiper-container')[0].swiper
            , bottom = $(this).find('.swiper-container')[1].swiper;
        top.controller.control = bottom;
        bottom.controller.control = top;
    });

    function slideLength() {
        $('.swiper-entry .swiper-container').each(function () {
            var th = $(this)
                , slidesLength = $(this).find('.swiper-slide').length
                , visibleSlidesLength = $(this).find('.swiper-slide-visible').length;
            if (slidesLength <= visibleSlidesLength) {
                th.addClass('swiper-no');
            }
        });
    }

    slideLength();
    $(window).on('resize', function () {
        slideLength();
    });


    /*new slider*/


    //popup
    let popupTop = 0;
    _functions.removeScroll = function () {
        popupTop = $(window).scrollTop();
        $('html').css({
            "position": "fixed",
            "top": -$(window).scrollTop(),
            "width": "100%"
        });
    }
    _functions.addScroll = function () {

        $('html').css({
            "position": "static"
        });
        // $('html').css({}).removeClass("overflow-hidden");
        window.scroll(0, popupTop);
    }

    _functions.openPopup = function (popup) {

        $('.popup-content').removeClass('active');

        // $('.popup-content').removeClass('animate-away').addClass('animate-in');

        $(popup + ', .popup-wrapper').addClass('active');
        _functions.removeScroll();
    };

    _functions.closePopup = function () {


        //$('.popup-content').removeClass('animate-in').addClass('animate-away');

        $('.popup-wrapper, .popup-content').removeClass('active');
        _functions.addScroll();
    };

    $(document).on('click', '.open-popup', function (e) {
        e.preventDefault();
        _functions.openPopup('.popup-content[data-rel="' + $(this).data('rel') + '"]');
    });

    $(document).on('click', '.popup-wrapper .btn-close, .popup-wrapper .layer-close, .popup-wrapper .btn-back', function (e) {
        e.preventDefault();
        _functions.closePopup();
    });

    _functions.coolNav = function () {
        let r = $(".js-header");
        $(window).on("scroll", (function () {
                $(window).scrollTop() > 30 ? r.removeClass("transparent") : r.addClass("transparent")
            }
        ));
    };
    _functions.coolNav();


});

function scrollAnime() {
    if ($('.animation').length) {
        $('.animation').not('.animated').each(function () {
            var th = $(this);
            if ($(window).width() < 768) {
                if ($(window).scrollTop() >= th.offset().top - ($(window).height() * 0.95)) {
                    th.addClass('animated');
                }
            } else {
                if ($(window).scrollTop() >= th.offset().top - ($(window).height() * 0.85)) {
                    th.addClass('animated');
                }
            }
        });
    }
}

//scrollAnime();
$(window).on('scroll', function () {
    //scrollAnime();
});


jQuery(function () {
    $(".burger__wrap").on("click", function () {
        $(this).toggleClass("active"),
            $(".navbar__menu").toggleClass("is-visible")
    })
});


$(function () {

    var body = $('body');
    $('.lang__current').on('click', function (e) {

        e.preventDefault();
        $('.lang__wrap').toggleClass('open');
    });

    body.on('click', function (e) {
        if (!$(e.target).closest('.lang__wrap').length) {
            $('.lang__wrap').removeClass('open');
        }
    });
});


// about page
$('.preload__btn').on('click', function () {
    $(this).parents(".preload-entry").find(".preload").css({
        'z-index': -1,
        'opacity': 0
    });
    $(this).parents(".preload-entry").find("video").css({
        "display": "block"
    });
    $(this).parents(".preload-entry").find(".btn-play").css({
        "display": "none"
    });

    var video = $(this).parents(".preload-entry").find("video")[0];


    if (video.paused === false) {
        $(this).parents(".preload-entry").find('.--pause').removeClass("d-block").addClass("d-none");
        $(this).parents(".preload-entry").find('.--play').removeClass("d-none").addClass("d-block");
        video.pause();
    } else {
        video.play();
        $(this).parents(".preload-entry").find('.--play').removeClass("d-block").addClass("d-none");
        $(this).parents(".preload-entry").find('.--pause').removeClass("d-none").addClass("d-block");
    }
});


// =============================
// ACCORDEON
// =============================
$(document).on('click', '.accordeon-title', function () {
    $(this).parent().siblings('.accordeon-item.active').toggleClass('active').find('.accordeon-content').slideToggle();
    $(this).parent().toggleClass('active').find('.accordeon-content').slideToggle();
});


// =============================
// UPLOAD FILE
// =============================

$('body').on('change', '.upload-file', function () {
    var format = $(this).val();
    var fileName = format.substring(format.lastIndexOf("\\") + 1);
    if (format == '') {
        $('.upload-file__name').text($('.upload-file__name').data('placeholder-text'));
    } else {
        $('.upload-file__name').text(fileName);
    }
});

// =============================
// SIDEBAR MOBILE
// =============================
var sidebarClose = $('.sidebar-filters').attr('data-close'),
    sidebarFilters = $('.sidebar-filters').find('img').attr('src');

$('.sidebar-filters').on('click', function () {
    $(this).toggleClass('active');
    $('.sidebar').toggleClass('active');

    if ($(this).hasClass('active')) {
        $(this).find('img').attr('src', sidebarClose);
    } else {
        $(this).find('img').attr('src', sidebarFilters);
    }
    /* if ($(this).hasClass('active')) {
         $(this).find('i').removeClass('icon-arrow-forward').addClass('icon-pin');
     } else {
         $(this).find('img').attr('src', sidebarFilters);
     }*/
   /* _functions.removeScroll();

    if (!$(this).hasClass('active')) {
        _functions.addScroll();
    }*/
});