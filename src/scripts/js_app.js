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

    $(document).on('click', '.popup-wrapper .btn-close, .popup-wrapper .layer-close, .popup-wrapper .btn-back, .popup-wrapper .js-close', function (e) {
        e.preventDefault();
        _functions.closePopup();
    });

    _functions.coolNav = function () {
        let r = $(".js-header");
        $(window).on("scroll", (function () {
                $(window).scrollTop() > 30 ? r.addClass("show") : r.removeClass("show")
            }
        ));
    };
    _functions.coolNav();


    _functions.initRangeSlider = function ($rangeWraper) {
        const $rangeInput = $rangeWraper.find(".input-range__slider-input");
        const $fromInput = $rangeWraper.find(".input-range__fields input").first();
        const $toInput = $rangeWraper.find(".input-range__fields input").last();
        let options = $rangeInput.data("options") || {};
        options.skin = "round";
        options.type = "double";
        options.hide_min_max = "true";
        options.hide_from_to = "true";
        if (parseInt($fromInput.val())) {
            options.from = parseInt($fromInput.val());
        }
        if (parseInt($toInput.val())) {
            options.to = parseInt($toInput.val());
        }
        // multiplier for additional units
        let multiplier = +$rangeWraper.find('[type="radio"]:checked').val() | 1;
        $rangeWraper.find('[type="radio"]').on("change", function () {
            multiplier = +$rangeWraper.find('[type="radio"]:checked').val();
            updateInputs(rangeInst.result);
        });

        // update inputs on range change
        function updateInputs(data) {
            const plus = data.to == options.max ? "+" : "";
            $fromInput.val(parseInt(data.from * multiplier)).trigger("input");
            $toInput.val(parseInt(data.to * multiplier)).trigger("input");
        }

        if ($fromInput.length && $toInput.length) {
            options.onChange = updateInputs;
            options.onFinish = () => {
                $fromInput.trigger("change");
                $toInput.trigger("change");
            };
        }
        $rangeInput.ionRangeSlider({...options});
        const rangeInst = $rangeInput.data("ionRangeSlider");
        // update range on inputs change
        $fromInput.on("change", () => {
            let val = +$fromInput.val() / multiplier;
            if (val < rangeInst.result.min) {
                val = rangeInst.result.min;
            }
            if (val > rangeInst.result.max) {
                val = rangeInst.result.max;
            }
            if (val > rangeInst.result.to) {
                val = rangeInst.result.to;
            }
            rangeInst.update({from: val});
            val = val * multiplier;
            $fromInput.val(parseInt(val));
        });
        $toInput.on("change", function () {
            let val = +$(this).val().replace("+", "") / multiplier;
            if (val < rangeInst.result.min) {
                val = rangeInst.result.min;
            }
            if (val > rangeInst.result.max) {
                val = rangeInst.result.max;
            }
            if (val < rangeInst.result.from) {
                val = rangeInst.result.from;
            }
            const plus = val == rangeInst.result.max ? "+" : "";
            rangeInst.update({to: val});
            val = val * multiplier;
            $(this).val(parseInt(val));
        });
    };
    _functions.initRangeSliders = function (selector = document) {
        $(selector)
            .find(".input-range")
            .each(function () {
                _functions.initRangeSlider($(this));
            });
    };
    _functions.initRangeSliders();



/*
    // =============================
    // FUNCTION ON PAGE SCROLL
    // =============================
    $(window).scroll(function () {
        _functions.scrollCall();
    });

    var prev_scroll = 0;
    _functions.scrollCall = function () {
        winScr = $(window).scrollTop();
        if (winScr > 10) {
            $('header').addClass('scrolled');
        } else {
            $('header').removeClass('scrolled');
        }



    }
    _functions.scrollCall();

*/

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
            $(this).parents(".lang__wrap").toggleClass('open');

        } else {

            $(this).parents(".lang__wrap").find(".lang").slideToggle();
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
        if (!$(this).parent().hasClass('full')) {
            $(this).parent().addClass('full');
        }
        val = val + 1;
    }

    int.val(val);
});

/*
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
*/

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

_functions.scrollBy = function (dist, $target = $('html, body'), axisX = false) {
    if (!axisX) {
        $target.animate({scrollTop: $target.scrollTop() + dist}, 1000);
    } else {
        $target.animate({scrollLeft: $target.scrollLeft() + dist}, 1000);
    }
};


jQuery('.subcategory> .current').each(function () {
    const dist =
        jQuery(this)[0].getBoundingClientRect().left -
        parseInt(jQuery(this).closest('.subcategory').css('padding-left'));
    _functions.scrollBy(dist, jQuery(this).closest('.subcategory'), true);
});


_functions.scrollWidth = function () {
    let scrWidth = $(window).outerWidth() - $('body').innerWidth();
    /*$('body, .h-wrap, .h-menu-toggle, .h-search-wrapp').css({
      //  "paddingRight": `${scrWidth}px`
    });*/
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


jQuery(function ($) {
    ("use strict");

    $(document).on("click", ".fl-title", function () {
        $(this).toggleClass("is-active");
        $(this).closest(".fl-block").find(".fl-toggle").first().slideToggle(300);
    });

    $(document).on("click", ".js-fl-open-btn", function () {
        $(".fl-menu").addClass("active");
    });
    $(document).on("click", ".filter-menu-close", function () {
        $(".fl-menu").removeClass("active");
    });

    // NESTED CHECK FILTERS
    // check/uncheck childs
    $(document).on("click", ".fl-title label", function (e) {
        e.stopPropagation();
        const $block = $(this).closest(".fl-block");
        if ($(this).find("input").prop("checked")) {
            $block.find('.fl-toggle input[type="checkbox"]').prop("checked", true);
            $block.find(".fl-title").addClass("is-active");
            $block.find(".fl-toggle").first().slideDown(300);
        } else {
            $block.find('.fl-toggle input[type="checkbox"]').prop("checked", false);
            $block.find(".fl-title").removeClass("is-active");
            $block.find(".fl-toggle").first().slideUp(300);
        }
    });
    $(document).on(
        "change",
        '.fl-block_inner .fl-toggle input[type="checkbox"]',
        function () {
            const $block = $(this).closest(".fl-block");
            if ($block.find('.fl-toggle input[type="checkbox"]:checked').length) {
                $block.find('.fl-title input[type="checkbox"]').prop("checked", true);
            } else {
                $block.find('.fl-title input[type="checkbox"]').prop("checked", false);
            }
        }
    );

    // fl-thumb
    $(document).on("click", ".fl-thumb", function () {
        $(this).hide(300, function () {
            $(this).remove();
        });
    });

    $(document).on("click", ".js-clear-filters", function () {
        _functions.clearAllInputs($(".fl-menu"));
        $(this).removeClass("active");

        let url = window.location.href;
        var parsedUrl = new URL(url);
        parsedUrl.search = "";
        var urlWithoutParams = parsedUrl.toString();
        window.location = urlWithoutParams;
    });
    $(document).on("change", ".fl-menu *", function () {
        $(".fl-clear-btn").addClass("active");
    });
});


//add overlay for filters menu on mobile
if (winWidth < 1200 && $(".open-filters").length) {
    $(".s-catalog .container").append('<div class="filters-overlay"></div>');
}

//open filters on mobile
$(document).on("click", ".open-filters", function () {
    $("body").toggleClass("overflow-hidden");
    $(this).toggleClass("is-open");
    $(".fl-menu__wrap").toggleClass("is-open");
    $(".filters-overlay").toggleClass("active");
});
$(document).on("click", ".filters-overlay", function () {
    $(this).hasClass("active")
        ? $(this).removeClass("active")
        : $(this).addClass("active");
    $("body").toggleClass("overflow-hidden");
    $(".woocommerce-products-header+.storefront-sorting").toggleClass("active");
});

if ($('.select-box').length) {
    var btnText = $('.select-wrapp').data('btn-text');
    $('.default').SumoSelect();
    $('.search').SumoSelect({
        placeholder: '',
        search: true,
        searchText: ''
    });
    $('.extra-select').SumoSelect({
        placeholder: '',
        search: true,
        searchText: '',
        okCancelInMulti: true,
        csvDispCount: 0,
        nativeOnDevice: [],
        is_floating: false
    });
    $('.btnOk').text(btnText);
}


$(document).on("click", ".search-form__wrap", function (e) {
    e.stopPropagation();
    $(this).addClass("test");
});
/*
if (winW > 1199) {
    // Change image on link hover
    $(document).on("mouseenter", ".category__filter   a", function () {
        let link = $(this).data('subcategory-link');

        $('.subcategory__wrap .subcategory__list').each(function () {
            if ($(this).data('number-subcategory') == link) {
                $(this).addClass('active').siblings().removeClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    });

    $(document).on("mouseleave", ".s-category__inner", function () {
        //   $('.subcategory__list').removeClass('active');
    });
} else {
    /* Open Dropdown *
    $(document).on('click', '.h-drop-btn', function () {
        $(this).closest('.h-drop').toggleClass('is-active');
        $(this).closest('.h-drop').find('.h-drop-list').slideToggle();
    });
}
*/

//open filters on mobile
$(document).on("click", ".account-burger", function () {
    $("body").toggleClass("overflow-hidden");
    $(this).toggleClass("active");

    $(this).parents('.s-account').find('.account-menu').toggleClass("is-open");
});


$(document).on("click", ".input-field__pass-btn", function () {
    const $btn = $(this)
        , $input = $btn.parent().find(".form-control__input");
    if (!$btn.hasClass("active")) {
        $input.attr("type", "text")
    } else {
        $input.attr("type", "password")
    }
    $btn.toggleClass("active")
});


$(document).on("click", "js-visible", function () {
    const $btn = $(this)
        , $input = $btn.parent().find(".form-control__input");
    if (!$btn.hasClass("active")) {
        $input.attr("type", "text")
    } else {
        $input.attr("type", "password")
    }
    $btn.toggleClass("active")
});


//plus-minus
$(document).on('click', '.decrement', function () {
    let $this = $(this),
        $input = $this.parent().find('input'),
        hasMin = $input[0].hasAttribute('data-min'),
        value = parseInt($input.val(), 10),
        min = hasMin ? +$input.attr('data-min') : 1;
    if (value != min) {
        value = value - 1;
    } else {
        value = min;
    }

    $input.val(value);
});


$(document).on('click', '.increment', function () {
    let max = $(this)
    let $this = $(this),
        $input = $this.parent().find('input'),
        value = parseInt($input.val(), 10);
    $input.val(value + 1);

});


jQuery('.subcategory__list').each(function () {
    var $this = jQuery(this),
        categoryLength = $this.find('.subcategory__item').length;

    if (categoryLength >= 4) {
        $this.addClass('grid-2');
    }
});


if (winW > 1199) {

    jQuery('.product-cat__grid').each(function () {
        var $this = jQuery(this),
            categoryLength = $this.find('.product-cat').length;


        if (categoryLength >= 4) {
            $this.addClass('style-2');
        }
    });
    // Change image on link hover
    jQuery(document).on("mouseenter", ".category__filter   a", function () {
        let link = jQuery(this).data('subcategory-link');
        jQuery('.category__wrap').addClass('hide');
        jQuery('.product-cat__grid-wrap .product-cat__grid').each(function (i) {
            if (jQuery(this).data('number-subcategory') == link) {

                if (!(jQuery(this).hasClass('active'))) {
                    jQuery(this).addClass('show').siblings().removeClass('show');
                    jQuery(".product-cat__grid.active").css({
                        "opacity": 0
                    });
                } else {
                    jQuery(".product-cat__grid.active").css({
                        "opacity": 1
                    });
                }


            } else {
                jQuery(this).removeClass('show');

            }
        });
    });

    jQuery(document).on("mouseleave", ".s-category__inner", function () {
        jQuery('.product-cat__grid').removeClass('show');
        jQuery('.category__wrap').removeClass('hide');
        jQuery(".product-cat__grid.active").css({
            "opacity": 1
        });
    });
} else {

}


$(document).on('click', '.cvv__btn', function () {
    $(this).parents('.cvv__wrap').toggleClass('hide');
});
/*
jQuery(function ($) {
    const inputs = document.querySelectorAll("input");

    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const showPassword = document.getElementById("show-password");
    const matchPassword = document.getElementById("match");


    inputs.forEach((input) => {
        input.addEventListener("blur", (event) => {
            if (event.target.value) {
                input.classList.add("is-valid");
            } else {
                input.classList.remove("is-valid");
            }
        });
    });

    showPassword.addEventListener("click", (event) => {
        if (password.type == "password") {
            password.type = "text";
            confirmPassword.type = "text";
            showPassword.innerText = "hide";
            showPassword.setAttribute("aria-label", "hide password");
            showPassword.setAttribute("aria-checked", "true");
        } else {
            password.type = "password";
            confirmPassword.type = "password";
            showPassword.innerText = "show";
            showPassword.setAttribute("aria-label", "show password");
            showPassword.setAttribute("aria-checked", "false");
        }
    });

    const updateRequirement = (id, valid) => {
        const requirement = document.getElementById(id);

        if (valid) {
            requirement.classList.add("valid");
        } else {
            requirement.classList.remove("valid");
        }
    };

    password.addEventListener("input", (event) => {
        const value = event.target.value;

        updateRequirement("length", ((value.length >= 6) && (value.length <= 20)));
        updateRequirement("letters", ((/[a-z]/.test(value)) && (/[A-Z]/.test(value))));
        updateRequirement("number", ((/\d/.test(value)) || (/[#.?!@$%^&*-]/.test(value))));

    });

    confirmPassword.addEventListener('keyup', (event) => {
        const value = event.target.value;

        if (value.length && value != password.value) {
            matchPassword.classList.remove("hidden");
        } else {
            matchPassword.classList.add("hidden");
        }
    });

    confirmPassword.addEventListener("focus", (event) => {
        matchPassword.classList.add("hidden");
    });
});
*/
// show products grid by click icons //

$(document).on('click', '#btn-grid-1', function () {
    $('.product-gallery-photos').removeClass('grid-1').addClass('grid-2');
    $('.products').removeClass('grid-2').addClass('grid-3');
    // Змінюємо активний клас
    $('#gridIconSmall').removeClass('active');
    $(this).addClass('active');

    if (innerWidth < 768) {
        $('.products').removeClass('grid-3 grid-1').addClass('grid-2');
        $('#gridIconSmall').removeClass('active');
        $('.icon-grid-sm').removeClass('active');
    }
});

$(document).on('click', '#btn-grid-2', function () {
    $('.product-gallery-photos').removeClass('grid-2').addClass('grid-1');
    $('.products').removeClass('grid-3').addClass('grid-2');

    $('#gridIcon').removeClass('active');
    $(this).addClass('active');
    if (innerWidth < 768) {
        $('.products').removeClass('grid-2 grid-3').addClass('grid-1');
        $('#gridIcon').removeClass('active');
        $('.icon-grid').removeClass('active');
    }
});