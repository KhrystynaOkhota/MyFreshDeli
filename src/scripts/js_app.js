var _functions = {}, winWidth, shareButton;
let winW, winH;

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
    _functions.scrollBy = function (dist, $target = $('html, body'), axisX = false) {
        if (!axisX) {
            $target.animate({scrollTop: $target.scrollTop() + dist}, 1000);
        } else {
            $target.animate({scrollLeft: $target.scrollLeft() + dist}, 1000);
        }
    };
    /*new slider*/
    _functions.getSwOptions = function (swiper) {
        var options = swiper.data('options');
        options = (!options || typeof options !== 'object') ? {} : options;
        var $p = swiper.closest('.swiper-entry'),
            slidesLength = swiper.find('>.swiper-wrapper>.swiper-slide').length;
        if (!options.pagination)
            options.pagination = {
                el: $p.find('.swiper-pagination')[0],
                //type: 'progressbar',
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
        if (!options.speed) options.speed = 500;
        options.roundLengths = true;
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
        var top = $(this).find('.swiper-container.swiper-thumbs-top')[0].swiper,
            bottom = $(this).find('.swiper-container.swiper-thumbs-bottom')[0].swiper;
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

/*
jQuery(function () {
    $(".burger__wrap").on("click", function () {
        $(this).toggleClass("active"),
            $(".navbar__menu").toggleClass("is-visible")
    })
});
*/

$(function () {

    var body = $('body');
    $('.lang__current').on('click', function (e) {

        e.preventDefault();

        if (winW > 1199) {
            $('.lang__wrap').toggleClass('open');

        } else {


            $('.lang').slideToggle();
        }
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


//* calculator all +/-
$(document).on('click', '.product__quantity button', function () {
    const int = $(this).parent().find('input');
    let val = +int.val();

    if ($(this).hasClass('minus')) {
        val > 0 ? val = val - 1 : val = 0;
    } else {
        /* if (!$(this).parent().hasClass('full')) {
             $(this).parent().addClass('full');
         }*/
        val = val + 1;
    }

    int.val(val);
});


//* show more
$(document).on('click', '.js-more', function () {

    // $('.review__item').removeClass('rotate-remove');
    //  $('.js-more').removeClass('hide');
    // $('.review__intro').removeClass('full');
    $(this).addClass('hide');
    $(this).parents('.review__item').find('.review__close').addClass('show');
    $(this).parents('.review__item').addClass('rotate-remove');
    const int = $(this).parent().find('.review__intro').addClass('full');

});

$(document).on('click', '.review__close', function () {
    $(this).removeClass('show');
    let wrapReview = $(this).parents('.review__item');
    wrapReview.removeClass('rotate-remove');
    wrapReview.find('.review__intro').removeClass('full');
    wrapReview.find('.js-more').removeClass('hide');

});


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return decodeURIComponent(c.substring(name.length, c.length));
        }
    }
    return "";
}

function removeCookie(cname) {
    setCookie(cname, '', {
        expires: -1,
        path: '/'
    });
}

function parseJson(str) {
    var j;
    try {
        j = JSON.parse(str);
    } catch (e) {
        return false;
    }
    return j;
}

$(document).on('click', '.fav-btn', function () {
    var btn = $(this)
        , id = btn.attr('data-id')
        , liked = getCookie('mfd_liked_products');
    if (liked)
        liked = parseJson(liked);
    else
        liked = [];
    if (!liked)
        liked = [];
    var position = liked.indexOf(id);
    if (position > -1) {
        liked.splice(position, 1);
        btn.removeClass('active');
    } else {
        liked.push(id);
        btn.addClass('active');
    }
    if (!liked || !liked.length)
        removeCookie('mfd_liked_products')
    else {
        setCookie('mfd_liked_products', JSON.stringify(liked), 365);
    }
    if (btn.hasClass('btn-close'))
        btn.closest('.product').parent().remove();
});

const scrollToTopButton = document.getElementById('js-top');
const scrollFunc = () => {
        let y = window.scrollY;
        if (y > 0) {
            scrollToTopButton.className = "top-link show";
        } else {
            scrollToTopButton.className = "top-link hide";
        }
    }
;
window.addEventListener("scroll", scrollFunc);
const scrollToTop = () => {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, c - c / 10);
        }
    }
;
scrollToTopButton.onclick = function (e) {
    e.preventDefault();
    scrollToTop();
};


$(document).on('click', '.btn-layout', function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.layout-block').toggleClass('active');
});


$(document).on('click', '.tab-nav>*', function (e) {
    let $tabs = $(this).closest('.tabs').find('.tabs-wrap .tab');
    let i = $(this).index();

    $(this).addClass('active').siblings().removeClass('active');
    $tabs
        .eq(i)
        .siblings('.tab:visible')
        .stop()
        .finish()
        .fadeOut(function () {
            $tabs.eq(i).fadeIn(200);
        });
    //console.log($(this).siblings().find(".tab"));
    $(this)
        .siblings()
        .find('.tab')
        .stop()
        .finish()
        .slideUp(() => {
            //console.log($(this));
            $(this).find('.tab').slideDown();
        });

    // scroll X to active tab
    const dist =
        $(this)[0].getBoundingClientRect().left -
        parseInt($(this).closest('.tab-nav').css('padding-left'));
    _functions.scrollBy(dist, $(this).closest('.tab-nav'), true);
    /*
                    // update swipers inside tab
                    setTimeout(() => {
                        $tabs
                            .eq(i)
                            .find('.swiper-container')
                            .each(function () {
                                console.log($(this)[0]?.swiper.isLocked);
                                if ($(this)[0]?.swiper.isLocked) {
                                    $(this).closest('.swiper-entry').addClass('swiper-controls-hide');
                                } else {
                                    $(this).closest('.swiper-entry').removeClass('swiper-controls-hide');
                                }
                            });
                    }, 500);*/
});
/* $('.tab-nav>.active').each(function () {
     const dist =
         $(this)[0].getBoundingClientRect().left -
         parseInt($(this).closest('.tab-nav').css('padding-left'));
     $(this).closest('.tab-nav')[0].scrollBy(dist, 0);
 });*/


// accordion
$(document).on('click', '.accordion-item', function () {
    const $title = $(this).find('.accordion-title');
    const $content = $(this);
    if ($title.hasClass('is-active')) {
        $title.removeClass('is-active').next().slideUp();
        $content.removeClass('is-active');
    } else {
        $title
            .closest('.accordion')
            .find('.accordion-title')
            .not($title)
            .removeClass('is-active')
            .next()
            .slideUp();
        $title.addClass('is-active').next().slideDown();
        $content.addClass('is-active');
    }
});


_functions.scrollWidth = function () {
    let scrWidth = $(window).outerWidth() - $('body').innerWidth();
    $('body, .h-wrap, .h-menu-toggle, .h-search-wrapp').css({
        "paddingRight": `${scrWidth}px`
    });
}

/* Function Calculations on page */
_functions.pageCalculations = function () {
    winW = $(window).outerWidth();
    winH = $(window).outerHeight();
};
_functions.pageCalculations();
//*===========
//*  HEADER  =
//*===========
// Open menu
$(document).on('click', '.h-burger', function () {
    _functions.scrollWidth();
    $('html').toggleClass('overflow-menu');
    $(this).toggleClass('active');
    $(this).closest('header').toggleClass('open-menu');
});

// Close menu
$(document).on('click', '.h-overlay', function () {
    _functions.scrollWidth();
    $('html').removeClass('overflow-menu');
    $(this).closest('header').removeClass('open-menu');
    $(this).closest('header').removeClass('open-search');
});

// Open Search
$(document).on('click', '.h-search', function () {
    _functions.scrollWidth();
    $('html').addClass('overflow-menu');
    $(this).closest('header').addClass('open-search');
    $(this).closest('header').find('.h-search-inner input').focus();
    $(this).closest('header').removeClass('open-menu');
});

// Close Search
$(document).on('click', '.h-search-close', function () {
    _functions.scrollWidth();
    $('html').removeClass('overflow-menu');
    $(this).closest('header').removeClass('open-menu');
    $(this).closest('header').removeClass('open-search');
});

if (winW > 1199) {
    // Change image on link hover
    $(document).on("mouseenter", ".h-menu-toggle-wrapp a", function () {
        let link = $(this).data('menu-link');

        $('.h-menu-img-wrapp .h-menu-img').each(function () {
            if ($(this).data('number-img') == link) {
                $(this).addClass('active').siblings().removeClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    });

    $(document).on("mouseleave", ".h-menu-toggle-wrapp a", function () {
        $('.h-menu-img').removeClass('active');
    });
} else {
    /* Open Dropdown */
    $(document).on('click', '.h-drop-btn', function () {
        $(this).closest('.h-drop').toggleClass('is-active');
        $(this).closest('.h-drop').find('.h-drop-list').slideToggle();
    });
}
