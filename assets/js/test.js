function scrollAnime() {
    jQuery(".animation").length && jQuery(".animation").not(".animated").each(function () {
        var t = jQuery(this);
        jQuery(window).width() < 768 ? jQuery(window).scrollTop() >= t.offset().top - .95 * jQuery(window).height() && t.addClass("animated") : jQuery(window).scrollTop() >= t.offset().top - .85 * jQuery(window).height() && t.addClass("animated")
    })
}

function setCookie(t, e, n) {
    var o = new Date;
    o.setTime(o.getTime() + 24 * n * 60 * 60 * 1e3);
    var i = "expires=" + o.toUTCString();
    document.cookie = t + "=" + e + ";" + i + ";path=/"
}

function getCookie(t) {
    for (var e = t + "=", n = document.cookie.split(";"), o = 0; o < n.length; o++) {
        for (var i = n[o]; " " == i.charAt(0);) i = i.substring(1);
        if (0 == i.indexOf(e)) return decodeURIComponent(i.substring(e.length, i.length))
    }
    return ""
}

function removeCookie(t) {
    setCookie(t, "", {expires: -1, path: "/"})
}

function parseJson(t) {
    var e;
    try {
        e = JSON.parse(t)
    } catch (t) {
        return !1
    }
    return e
}

var winWidth, shareButton, _functions = {};
let winW, winH;
jQuery(function (t) {
    function e() {
        t(".swiper-entry .swiper-container").each(function () {
            var e = t(this);
            t(this).find(".swiper-slide").length <= t(this).find(".swiper-slide-visible").length && e.addClass("swiper-no")
        })
    }

    var n = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);
    n && t("html").addClass("touch-screen");
    var o = navigator.platform.toUpperCase().indexOf("MAC") >= 0,
        i = /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent) || /Edge\/\d+/.test(navigator.userAgent),
        s = navigator.userAgent.indexOf("Chrome") >= 0 && navigator.userAgent.indexOf("Edge") < 0;
    winWidth = t(window).width(), t(window).height(), o && t("html").addClass("mac"), i && t("html").addClass("ie"), s && t("html").addClass("chrome"), _functions.scrollBy = function (e, n = t("html, body"), o = !1) {
        o ? n.animate({scrollLeft: n.scrollLeft() + e}, 1e3) : n.animate({scrollTop: n.scrollTop() + e}, 1e3)
    }, _functions.getSwOptions = function (t) {
        var e = t.data("options");
        e = e && "object" == typeof e ? e : {};
        var o = t.closest(".swiper-entry"), i = t.find(">.swiper-wrapper>.swiper-slide").length;
        return e.pagination || (e.pagination = {
            el: o.find(".swiper-pagination")[0],
            clickable: !0
        }), e.navigation || (e.navigation = {
            nextEl: o.find(".swiper-button-next")[0],
            prevEl: o.find(".swiper-button-prev")[0]
        }), e.preloadImages = !1, e.lazy = {loadPrevNext: !0}, e.observer = !0, e.observeParents = !0, e.watchOverflow = !0, e.speed || (e.speed = 500), e.roundLengths = !0, e.centerInsufficientSlides || (e.centerInsufficientSlides = !1), n && (e.direction = "horizontal"), i <= 1 && (e.loop = !1, o.addClass("hide-control")), e.customFraction && (o.addClass("custom-fraction"), i > 1 && i < 10 ? (o.find(".custom-current").text("01"), o.find(".custom-total").text("0" + i)) : i > 1 && (o.find(".custom-current").text("01"), o.find(".custom-total").text("0" + i))), e
    }, _functions.initSwiper = function (t) {
        new Swiper(t[0], _functions.getSwOptions(t))
    }, t(".swiper-entry .swiper-container").each(function () {
        _functions.initSwiper(t(this))
    }), t(".custom-fraction").each(function () {
        var e = t(this), n = e.find(".swiper-container")[0].swiper, o = n.realIndex + 1;
        n.on("slideChange", function () {
            e.find(".custom-current").text(function () {
                return o = n.realIndex + 1, n.realIndex, "0" + o
            })
        })
    }), t(".swiper-thumbs").each(function () {
        var e = t(this).find(".swiper-container.swiper-thumbs-top")[0].swiper,
            n = t(this).find(".swiper-container.swiper-thumbs-bottom")[0].swiper;
        e.thumbs.swiper = n, e.thumbs.init(), e.thumbs.update()
    }), t(".swiper-control").each(function () {
        var e = t(this).find(".swiper-container")[0].swiper, n = t(this).find(".swiper-container")[1].swiper;
        e.controller.control = n, n.controller.control = e
    }), e(), t(window).on("resize", function () {
        e()
    });
    let a = 0;
    _functions.removeScroll = function () {
        a = t(window).scrollTop(), t("html").css({position: "fixed", top: -t(window).scrollTop(), width: "100%"})
    }, _functions.addScroll = function () {
        t("html").css({position: "static"}), window.scroll(0, a)
    }, _functions.openPopup = function (e) {
        t(".popup-content").removeClass("active"), t(e + ", .popup-wrapper").addClass("active"), _functions.removeScroll()
    }, _functions.closePopup = function () {
        t(".popup-wrapper, .popup-content").removeClass("active"), _functions.addScroll()
    }, t(document).on("click", ".open-popup", function (e) {
        e.preventDefault(), _functions.openPopup('.popup-content[data-rel="' + t(this).data("rel") + '"]')
    }), t(document).on("click", ".popup-wrapper .btn-close, .popup-wrapper .layer-close, .popup-wrapper .btn-back, .popup-wrapper .js-close", function (t) {
        t.preventDefault(), _functions.closePopup()
    }), _functions.coolNav = function () {
        let e = t(".js-header");
        t(window).on("scroll", function () {
            t(window).scrollTop() > 30 ? e.addClass("show") : e.removeClass("show")
        })
    }, _functions.coolNav(), _functions.initRangeSlider = function (e) {
        function n(t) {
            t.to, a.max;
            i.val(parseInt(t.from * l)).trigger("input"), s.val(parseInt(t.to * l)).trigger("input")
        }

        const o = e.find(".input-range__slider-input"), i = e.find(".input-range__fields input").first(),
            s = e.find(".input-range__fields input").last();
        let a = o.data("options") || {};
        a.skin = "round", a.type = "double", a.hide_min_max = "true", a.hide_from_to = "true", parseInt(i.val()) && (a.from = parseInt(i.val())), parseInt(s.val()) && (a.to = parseInt(s.val()));
        let l = 1 | +e.find('[type="radio"]:checked').val();
        e.find('[type="radio"]').on("change", function () {
            l = +e.find('[type="radio"]:checked').val(), n(c.result)
        }), i.length && s.length && (a.onChange = n, a.onFinish = (() => {
            i.trigger("change"), s.trigger("change")
        })), o.ionRangeSlider({...a});
        const c = o.data("ionRangeSlider");
        i.on("change", () => {
            let t = +i.val() / l;
            t < c.result.min && (t = c.result.min), t > c.result.max && (t = c.result.max), t > c.result.to && (t = c.result.to), c.update({from: t}), t *= l, i.val(parseInt(t))
        }), s.on("change", function () {
            let e = +t(this).val().replace("+", "") / l;
            e < c.result.min && (e = c.result.min), e > c.result.max && (e = c.result.max), e < c.result.from && (e = c.result.from);
            c.result.max;
            c.update({to: e}), e *= l, t(this).val(parseInt(e))
        })
    }, _functions.initRangeSliders = function (e = document) {
        t(e).find(".input-range").each(function () {
            _functions.initRangeSlider(t(this))
        })
    }, _functions.initRangeSliders()
}), jQuery(window).on("scroll", function () {
}), jQuery(function () {
    var t = jQuery("body");
    jQuery(".lang__current").on("click", function (t) {
        t.preventDefault(), winW > 1199 ? jQuery(this).parents(".lang__wrap").toggleClass("open") : jQuery(this).parents(".lang__wrap").find(".lang").slideToggle()
    }), t.on("click", function (t) {
        jQuery(t.target).closest(".lang__wrap").length || jQuery(".lang__wrap").removeClass("open")
    })
}), jQuery(".preload__btn").on("click", function () {
    jQuery(this).parents(".preload-entry").find(".preload").css({
        "z-index": -1,
        opacity: 0
    }), jQuery(this).parents(".preload-entry").find("video").css({display: "block"}), jQuery(this).parents(".preload-entry").find(".btn-play").css({display: "none"});
    var t = jQuery(this).parents(".preload-entry").find("video")[0];
    !1 === t.paused ? (jQuery(this).parents(".preload-entry").find(".--pause").removeClass("d-block").addClass("d-none"), jQuery(this).parents(".preload-entry").find(".--play").removeClass("d-none").addClass("d-block"), t.pause()) : (t.play(), jQuery(this).parents(".preload-entry").find(".--play").removeClass("d-block").addClass("d-none"), jQuery(this).parents(".preload-entry").find(".--pause").removeClass("d-none").addClass("d-block"))
}), jQuery(document).on("click", ".accordeon-title", function () {
    jQuery(this).parent().siblings(".accordeon-item.active").toggleClass("active").find(".accordeon-content").slideToggle(), jQuery(this).parent().toggleClass("active").find(".accordeon-content").slideToggle()
}), jQuery("body").on("change", ".upload-file", function () {
    var t = jQuery(this).val(), e = t.substring(t.lastIndexOf("\\") + 1);
    "" == t ? jQuery(".upload-file__name").text(jQuery(".upload-file__name").data("placeholder-text")) : jQuery(".upload-file__name").text(e)
});
var sidebarClose = jQuery(".sidebar-filters").attr("data-close"),
    sidebarFilters = jQuery(".sidebar-filters").find("img").attr("src");
jQuery(".sidebar-filters").on("click", function () {
    jQuery(this).toggleClass("active"), jQuery(".sidebar").toggleClass("active"), jQuery(this).hasClass("active") ? jQuery(this).find("img").attr("src", sidebarClose) : jQuery(this).find("img").attr("src", sidebarFilters)
}), jQuery(document).on("click", ".product__quantity button", function () {
    const t = jQuery(this).parent().find("input");
    let e = +t.val();
    jQuery(this).hasClass("minus") ? e > 0 ? e -= 1 : e = 0 : (jQuery(this).parent().hasClass("full") || jQuery(this).parent().addClass("full"), e += 1), t.val(e)
}), jQuery(document).on("click", ".fav-btn", function () {
    var t = jQuery(this), e = t.attr("data-id"), n = getCookie("mfd_liked_products");
    (n = n ? parseJson(n) : []) || (n = []);
    var o = n.indexOf(e);
    o > -1 ? (n.splice(o, 1), t.removeClass("active")) : (n.push(e), t.addClass("active")), n && n.length ? setCookie("mfd_liked_products", JSON.stringify(n), 365) : removeCookie("mfd_liked_products"), t.hasClass("btn-close") && t.closest(".product").parent().remove()
});
const scrollToTopButton = document.getElementById("js-top"), scrollFunc = () => {
    let t = window.scrollY;
    scrollToTopButton.className = t > 0 ? "top-link show" : "top-link hide"
};
window.addEventListener("scroll", scrollFunc);
const scrollToTop = () => {
    const t = document.documentElement.scrollTop || document.body.scrollTop;
    t > 0 && (window.requestAnimationFrame(scrollToTop), window.scrollTo(0, t - t / 10))
};
if (scrollToTopButton.onclick = function (t) {
    t.preventDefault(), scrollToTop()
}, jQuery(document).on("click", ".btn-layout", function () {
    jQuery(this).addClass("active").siblings().removeClass("active"), jQuery(".layout-block").toggleClass("active")
}), jQuery(document).on("click", ".tab-nav>*", function (t) {
    let e = jQuery(this).closest(".tabs").find(".tabs-wrap .tab"), n = jQuery(this).index();
    jQuery(this).addClass("active").siblings().removeClass("active"), e.eq(n).siblings(".tab:visible").stop().finish().fadeOut(function () {
        e.eq(n).fadeIn(200)
    }), jQuery(this).siblings().find(".tab").stop().finish().slideUp(() => {
        jQuery(this).find(".tab").slideDown()
    });
    const o = jQuery(this)[0].getBoundingClientRect().left - parseInt(jQuery(this).closest(".tab-nav").css("padding-left"));
    _functions.scrollBy(o, jQuery(this).closest(".tab-nav"), !0)
}), jQuery(document).on("click", ".accordion-item", function () {
    const t = jQuery(this).find(".accordion-title"), e = jQuery(this);
    t.hasClass("is-active") ? (t.removeClass("is-active").next().slideUp(), e.removeClass("is-active")) : (t.closest(".accordion").find(".accordion-title").not(t).removeClass("is-active").next().slideUp(), t.addClass("is-active").next().slideDown(), e.addClass("is-active"))
}), _functions.scrollBy = function (t, e = jQuery("html, body"), n = !1) {
    n ? e.animate({scrollLeft: e.scrollLeft() + t}, 1e3) : e.animate({scrollTop: e.scrollTop() + t}, 1e3)
}, jQuery(document).on("click", ".subcategory>*", function (t) {
    const e = jQuery(this)[0].getBoundingClientRect().left - parseInt(jQuery(this).closest(".subcategory").css("padding-left"));
    _functions.scrollBy(e, jQuery(this).closest(".subcategory"), !0)
}), _functions.scrollWidth = function () {
    jQuery(window).outerWidth(), jQuery("body").innerWidth()
}, _functions.pageCalculations = function () {
    winW = jQuery(window).outerWidth(), winH = jQuery(window).outerHeight()
}, _functions.pageCalculations(), jQuery(document).on("click", ".h-burger", function () {
    _functions.scrollWidth(), jQuery("html").toggleClass("overflow-menu"), jQuery(this).toggleClass("active"), jQuery(this).closest("header").toggleClass("open-menu")
}), jQuery(document).on("click", ".h-overlay", function () {
    _functions.scrollWidth(), jQuery("html").removeClass("overflow-menu"), jQuery(this).closest("header").removeClass("open-menu"), jQuery(this).closest("header").removeClass("open-search")
}), jQuery(document).on("click", ".h-search", function () {
    _functions.scrollWidth(), jQuery("html").addClass("overflow-menu"), jQuery(this).closest("header").addClass("open-search"), jQuery(this).closest("header").find(".h-search-inner input").focus(), jQuery(this).closest("header").removeClass("open-menu")
}), jQuery(document).on("click", ".h-search-close", function () {
    _functions.scrollWidth(), jQuery("html").removeClass("overflow-menu"), jQuery(this).closest("header").removeClass("open-menu"), jQuery(this).closest("header").removeClass("open-search")
}), winW > 1199 ? (jQuery(document).on("mouseenter", ".h-menu-toggle-wrapp a", function () {
    let t = jQuery(this).data("menu-link");
    jQuery(".h-menu-img-wrapp .h-menu-img").each(function () {
        jQuery(this).data("number-img") == t ? jQuery(this).addClass("active").siblings().removeClass("active") : jQuery(this).removeClass("active")
    })
}), jQuery(document).on("mouseleave", ".h-menu-toggle-wrapp a", function () {
    jQuery(".h-menu-img").removeClass("active")
})) : jQuery(document).on("click", ".h-drop-btn", function () {
    jQuery(this).closest(".h-drop").toggleClass("is-active"), jQuery(this).closest(".h-drop").find(".h-drop-list").slideToggle()
}), jQuery(function (t) {
    t(document).on("click", ".fl-title", function () {
        t(this).toggleClass("is-active"), t(this).closest(".fl-block").find(".fl-toggle").first().slideToggle(300)
    }), t(document).on("click", ".js-fl-open-btn", function () {
        t(".fl-menu").addClass("active")
    }), t(document).on("click", ".filter-menu-close", function () {
        t(".fl-menu").removeClass("active")
    }), t(document).on("click", ".fl-title label", function (e) {
        e.stopPropagation();
        const n = t(this).closest(".fl-block");
        t(this).find("input").prop("checked") ? (n.find('.fl-toggle input[type="checkbox"]').prop("checked", !0), n.find(".fl-title").addClass("is-active"), n.find(".fl-toggle").first().slideDown(300)) : (n.find('.fl-toggle input[type="checkbox"]').prop("checked", !1), n.find(".fl-title").removeClass("is-active"), n.find(".fl-toggle").first().slideUp(300))
    }), t(document).on("change", '.fl-block_inner .fl-toggle input[type="checkbox"]', function () {
        const e = t(this).closest(".fl-block");
        e.find('.fl-toggle input[type="checkbox"]:checked').length ? e.find('.fl-title input[type="checkbox"]').prop("checked", !0) : e.find('.fl-title input[type="checkbox"]').prop("checked", !1)
    }), t(document).on("click", ".fl-thumb", function () {
        t(this).hide(300, function () {
            t(this).remove()
        })
    }), t(document).on("click", ".js-clear-filters", function () {
        _functions.clearAllInputs(t(".fl-menu")), t(this).removeClass("active");
        let e = window.location.href;
        var n = new URL(e);
        n.search = "";
        var o = n.toString();
        window.location = o
    }), t(document).on("change", ".fl-menu *", function () {
        t(".fl-clear-btn").addClass("active")
    })
}), winWidth < 1200 && jQuery(".open-filters").length && jQuery(".s-catalog .container").append('<div class="filters-overlay"></div>'), jQuery(document).on("click", ".open-filters", function () {
    jQuery("body").toggleClass("overflow-hidden"), jQuery(this).toggleClass("is-open"), jQuery(".fl-menu__wrap").toggleClass("is-open"), jQuery(".filters-overlay").toggleClass("active")
}), jQuery(document).on("click", ".filters-overlay", function () {
    jQuery(this).hasClass("active") ? jQuery(this).removeClass("active") : jQuery(this).addClass("active"), jQuery("body").toggleClass("overflow-hidden"), jQuery(".woocommerce-products-header+.storefront-sorting").toggleClass("active")
}), jQuery(".select-box").length) {
    var btnText = jQuery(".select-wrapp").data("btn-text");
    jQuery(".default").SumoSelect(), jQuery(".search").SumoSelect({
        placeholder: "",
        search: !0,
        searchText: ""
    }), jQuery(".extra-select").SumoSelect({
        placeholder: "",
        search: !0,
        searchText: "",
        okCancelInMulti: !0,
        csvDispCount: 0,
        nativeOnDevice: [],
        is_floating: !1
    }), jQuery(".btnOk").text(btnText)
}
jQuery(document).on("click", ".search-form__wrap", function (t) {
    t.stopPropagation(), jQuery(this).addClass("test")
}), jQuery(document).on("click", ".account-burger", function () {
    jQuery("body").toggleClass("overflow-hidden"), jQuery(this).toggleClass("active"), jQuery(this).parents(".s-account").find(".account-menu").toggleClass("is-open")
}), jQuery(document).on("click", ".input-field__pass-btn", function () {
    const t = jQuery(this), e = t.parent().find(".form-control__input");
    t.hasClass("active") ? e.attr("type", "password") : e.attr("type", "text"), t.toggleClass("active")
}), jQuery(document).on("click", "js-visible", function () {
    const t = jQuery(this), e = t.parent().find(".form-control__input");
    t.hasClass("active") ? e.attr("type", "password") : e.attr("type", "text"), t.toggleClass("active")
}), jQuery(document).on("click", ".decrement", function () {
    let t = jQuery(this).parent().find("input"), e = t[0].hasAttribute("data-min"), n = parseInt(t.val(), 10),
        o = e ? +t.attr("data-min") : 1;
    n != o ? n -= 1 : n = o, t.val(n)
}), jQuery(document).on("click", ".increment", function () {
    jQuery(this);
    let t = jQuery(this).parent().find("input"), e = parseInt(t.val(), 10);
    t.val(e + 1)
}), jQuery(".subcategory__list").each(function () {
    var t = jQuery(this);
    t.find(".subcategory__item").length >= 4 && t.addClass("grid-2")
}), winW > 1199 && (jQuery(".product-cat__grid").each(function () {
    var t = jQuery(this);
    t.find(".product-cat").length >= 4 && t.addClass("style-2")
}), jQuery(document).on("mouseenter", ".category__filter   a", function () {
    let t = jQuery(this).data("subcategory-link");
    jQuery(".category__wrap").addClass("hide"), jQuery(".product-cat__grid-wrap .product-cat__grid").each(function (e) {
        jQuery(this).data("number-subcategory") == t ? jQuery(this).hasClass("active") ? jQuery(".product-cat__grid.active").css({opacity: 1}) : (jQuery(this).addClass("show").siblings().removeClass("show"), jQuery(".product-cat__grid.active").css({opacity: 0})) : jQuery(this).removeClass("show")
    })
}), jQuery(document).on("mouseleave", ".s-category__inner", function () {
    jQuery(".product-cat__grid").removeClass("show"), jQuery(".category__wrap").removeClass("hide")
})), jQuery(document).on("click", ".cvv__btn", function () {
    jQuery(this).parents(".cvv__wrap").toggleClass("hide")
}), jQuery(document).on("click", "#btn-grid-1", function () {
    jQuery(".product-gallery-photos").removeClass("grid-1").addClass("grid-2"), jQuery(".products").removeClass("grid-2").addClass("grid-3"), jQuery("#gridIconSmall").removeClass("active"), jQuery(this).addClass("active"), innerWidth < 768 && (jQuery(".products").removeClass("grid-3 grid-1").addClass("grid-2"), jQuery("#gridIconSmall").removeClass("active"), jQuery(".icon-grid-sm").removeClass("active"))
}), jQuery(document).on("click", "#btn-grid-2", function () {
    jQuery(".product-gallery-photos").removeClass("grid-2").addClass("grid-1"), jQuery(".products").removeClass("grid-3").addClass("grid-2"), jQuery("#gridIcon").removeClass("active"), jQuery(this).addClass("active"), innerWidth < 768 && (jQuery(".products").removeClass("grid-2 grid-3").addClass("grid-1"), jQuery("#gridIcon").removeClass("active"), jQuery(".icon-grid").removeClass("active"))
});