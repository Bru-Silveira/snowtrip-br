/*
  [JS Index]
*/


/*
  1. preloader
  2. fadeIn.element
  3. to top animation
  4. page scroll
  5. navigation
  6. navigation dropdown
  7. animate elements
  8. facts counter 
  9. google maps zoom ON/OFF
  10. owl carousel
  11. swiper slider
  12. magnificPopup
  13. clone function
  14. items selector
  15. datepicker
  16. Select2
  17. toggle blog panels
  18. contact form
    18.1. contact modal
  19. reservation form
  20. blog comment form
*/
function runLuxexScripts() {
$(function () {
    


    $(window).on("load", function () {
        // 1. preloader
        $("#preloader").fadeOut(600);
        $(".preloader-bg").delay(400).fadeOut(600);

        // 2. fadeIn.element
        setTimeout(function () {
            $(".fadeIn-element").delay(600).css({
                display: "none"
            }).fadeIn(800);
        }, 0);
        $(".hero-bg").addClass("hero-bg-show");
    });

    // 3. to top animation
    $(".to-top-arrow").on("click", function () {
        $("body, html").animate({
            scrollTop: 0
        }, 1000);
        return false
    })

    // 4. page scroll													   
    $('a[href*="#"]').not('[href="#"]').not('[href="#collapseOne"]').not('[href="#collapseTwo"]').not('[href="#collapseThree"]').not('[href="#collapseFour"]').not('[href="#collapseFive"]').not(
        '[href="#collapseSix"]').on("click", function () {
            console.log("click");
            // eslint-disable-next-line no-restricted-globals
            if (window.location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && window.location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=" + this.hash.slice(1) + "]');
                if (target.length) {
                    if ($(window).width() < 768) {
                        $("html, body").animate({
                            scrollTop: target.offset().top - 80
                        }, 1000);
                    } else {
                        $("html, body").animate({
                            scrollTop: target.offset().top - 80
                        }, 1000);
                    }
                    return false;
                }
            }
        });

    // 5. navigation
    $(".navbar-collapse ul li a.nav-close").on("click", function () {
        $(".navbar-toggle:visible").click();
    });

    // 6. navigation dropdown
    $(".dropdown-toggle").on("click", function (e) {
        if ($(document).width() > 768) {
            e.preventDefault();
            var url = $(this).attr('href');
            if (url !== '#') {
                window.window.locationhref = url;
            }
        }
    });

    $(window).on("scroll", function () {
        // 7. animate elements
        if ($(this).scrollTop() > 50) {
            $(".border-top").addClass("top-position-primary");
            $(".navbar-bg-switch").addClass("navbar-bg-switch-color");
            $(".main-navigation-bg").addClass("main-navigation-bg-position-primary");
            $(".navbar-collapse").addClass("navbar-collapse-position-primary");
            $(".main-navigation").addClass("main-navigation-home-call");
            $(".navbar-bg-switch").addClass("main-navigation-bg");
            $(".to-top-arrow").addClass("show");
            $(".blog-side-launcher").addClass("blog-side-launcher-color");
        } else {
            $(".border-top").removeClass("top-position-primary");
            $(".navbar-bg-switch").removeClass("navbar-bg-switch-color");
            $(".main-navigation-bg").removeClass("main-navigation-bg-position-primary");
            $(".navbar-collapse").removeClass("navbar-collapse-position-primary");
            $(".main-navigation").removeClass("main-navigation-home-call");
            $(".navbar-bg-switch").removeClass("main-navigation-bg");
            $(".to-top-arrow").removeClass("show");
            $(".blog-side-launcher").removeClass("blog-side-launcher-color");
        }
    });

    // 8. facts counter
    $(".facts-counter-number").appear(function () {
        var count = $(this);
        count.countTo({
            from: 0,
            to: count.html(),
            speed: 1200,
            refreshInterval: 60
        });
    });

    // 9. google maps zoom ON/OFF
    $(".google-maps").on("click", function () {
        $('.google-maps iframe').css("pointer-events", "auto");
    });
    $(".google-maps").on("mouseleave", function () {
        $('.google-maps iframe').css("pointer-events", "none");
    });

    // 10. owl carousel
    $(".owl-carousel-testimonials").owlCarousel({
        loop: true,
        center: true,
        items: 1,
        margin: 0,
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayTimeout: 4000,
        smartSpeed: 450,
        nav: false,
        animateOut: "fadeOut",
        animateIn: "fadeIn"
    });
    $(".owl-carousel-rooms").owlCarousel({
        loop: false,
        center: false,
        autoplay: false,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        smartSpeed: 450,
        nav: false,
        nav: true,
        navText: ["<i class='ion-chevron-left'></i>", "<i class='ion-chevron-right'></i>"],
        navContainer: '.owl-nav-custom-rooms',
        responsive: {
            0: {
                items: 1,
                margin: 20
            },
            768: {
                items: 1,
                margin: 20
            },
            980: {
                items: 2,
                margin: 50
            },
            1240: {
                items: 3,
                margin: 50
            }
        }
    });
    $(".owl-carousel-facilities").owlCarousel({
        loop: false,
        center: false,
        autoplay: false,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        smartSpeed: 450,
        nav: false,
        nav: true,
        navText: ["<i class='ion-chevron-left'></i>", "<i class='ion-chevron-right'></i>"],
        navContainer: '.owl-nav-custom-facilities',
        responsive: {
            0: {
                items: 1,
                margin: 20
            },
            768: {
                items: 1,
                margin: 20
            },
            980: {
                items: 2,
                margin: 50
            },
            1240: {
                items: 3,
                margin: 50
            }
        }
    });
    $(".owl-carousel-team").owlCarousel({
        loop: false,
        center: false,
        autoplay: false,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        smartSpeed: 450,
        nav: false,
        nav: true,
        navText: ["<i class='ion-chevron-left'></i>", "<i class='ion-chevron-right'></i>"],
        navContainer: '.owl-nav-custom-team',
        responsive: {
            0: {
                items: 1,
                margin: 20
            },
            768: {
                items: 2,
                margin: 50
            },
            880: {
                items: 2,
                margin: 50
            },
            1240: {
                items: 3,
                margin: 50
            }
        }
    });
    $("#owl-carousel-all").owlCarousel({
        loop: false,
        center: false,
        autoplay: false,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        smartSpeed: 450,
        nav: false,
        nav: true,
        navText: ["<i class='ion-chevron-left'></i>", "<i class='ion-chevron-right'></i>"],
        navContainer: '.owl-nav-custom-all',
        responsive: {
            0: {
                items: 1,
                margin: 20
            },
            768: {
                items: 1,
                margin: 20
            },
            980: {
                items: 2,
                margin: 50
            },
            1240: {
                items: 2,
                margin: 50
            }
        }
    });
    $(".owl-carousel-menu").owlCarousel({
        loop: false,
        center: false,
        items: 3,
        margin: 0,
        autoplay: false,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        smartSpeed: 450,
        nav: false,
        nav: true,
        navText: ["<i class='ion-chevron-left'></i>", "<i class='ion-chevron-right'></i>"],
        navContainer: '.owl-nav-custom-menu'
    });

    // 11. swiper slider
    var swiper1 = new Swiper(".swiper-container-wrapper .swiper-container.swiper1", {
        preloadImages: false,
        // autoplay: false,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        init: true,
        loop: true,
        speed: 1200,
        grabCursor: true,
        mousewheel: false,
        keyboard: true,
        simulateTouch: true,
        parallax: true,
        effect: "slide",
        pagination: false,
        navigation: {
            nextEl: ".slide-next",
            prevEl: ".slide-prev"
        },
        scrollbar: false
    });
    var swiper2 = new Swiper(".swiper-container-wrapper .swiper-container.swiper2", {
        preloadImages: false,
        autoplay: false,
        init: true,
        loop: false,
        grabCursor: false,
        mousewheel: false,
        keyboard: false,
        simulateTouch: false,
        parallax: false,
        pagination: false,
        navigation: false
    });
    var swiper3 = new Swiper(".swiper-container-wrapper .swiper-container.swiper3", {
        preloadImages: false,
        autoplay: false,
        init: true,
        loop: false,
        speed: 1200,
        grabCursor: true,
        mousewheel: false,
        keyboard: true,
        simulateTouch: true,
        parallax: true,
        effect: "slide",
        pagination: false,
        navigation: {
            nextEl: ".slide-next",
            prevEl: ".slide-prev"
        },
        scrollbar: false,
        slidesPerView: 2,
        slidesPerColumn: 2
    });

    // 12. magnificPopup
    $(".popup-photo").magnificPopup({
        type: "image",
        gallery: {
            enabled: false,
            tPrev: "",
            tNext: "",
            tCounter: "%curr% / %total%"
        },
        removalDelay: 100,
        mainClass: "mfp-fade",
        fixedContentPos: false
    });
    $(".popup-photo-gallery").each(function () {
        $(this).magnificPopup({
            delegate: ".popup-photo-gallery-open",
            type: "image",
            gallery: {
                enabled: true
            },
            removalDelay: 100,
            mainClass: "mfp-fade",
            fixedContentPos: false
        });
    });

    // 13. clone function
    $.fn.duplicate = function (count, cloneEvents, callback) {
        var stack = [],
            el;
        while (count--) {
            el = this.clone(cloneEvents);
            callback && callback.call(el);
            stack.push(el.get()[0]);
        }
        return this.pushStack(stack);
    };
    $("<div class='vertical-lines-wrapper'></div>").appendTo(".vertical-lines");
    $("<div class='vertical-effect'></div>").duplicate(3).appendTo(".vertical-lines-wrapper");

    // 14. items selector
    const buttons = document.querySelectorAll(".item-button");
    const menus = document.querySelectorAll(".menu");
    function handleClick(e) {
        e.preventDefault();
        const targetMenu = document.querySelector(`#${this.dataset.target}`);
        menus.forEach(menu => {
            menu.classList.remove("menu-visible");
            targetMenu.classList.add("menu-visible");
        });
    }
    buttons.forEach(button => button.addEventListener("click", handleClick));

    // 15. datepicker
    $(".datepicker").datepicker({
        orientation: "auto"
    });

    // 16. Select2
    $(".select2").select2({
        minimumResultsForSearch: Infinity
    });

    // 17. toggle blog panels
    $(".blog-side-launcher").on("click", function () {
        var divClass = $(this).attr("data-id");
        if ($(this).hasClass("open")) {
            $(this).removeClass("open");
            $("." + divClass).addClass("open");
        } else {
            $(this).addClass("open");
            $("." + divClass).addClass("open");
        }
    });
    $(".blog-side-launch, .blog-side-text").on("click", function () {
        $(".panel-from-left-blog, .panel-overlay-from-right-blog").removeClass("open");
    });

    // 18. contact form
    $("form#form").on("submit", function () {
        $("form#form .error").remove();
        var s = !1;
        if ($(".requiredField").each(function () {
            if ("" === jQuery.trim($(this).val())) $(this).prev("label").text(), $(this).parent().append('<span class="error">This field is required</span>'), $(this).addClass(
                "inputError"), s = !0;
            else if ($(this).hasClass("email")) {
                var r = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                r.test(jQuery.trim($(this).val())) || ($(this).prev("label").text(), $(this).parent().append('<span class="error">Invalid email address</span>'), $(this).addClass(
                    "inputError"), s = !0);
            }
        }), !s) {
            $("form#form input.submit").fadeOut("normal", function () {
                $(this).parent().append("");
            });
            var r = $(this).serialize();
            $.post($(this).attr("action"), r, function () {
                $("form#form").slideUp("fast", function () {
                    $(this).before('<div class="success">Your email was sent successfully.</div>');
                });
            });
        }
        return !1;
    });
    // 18.1. contact modal
    $(".contact-modal-launcher, .contact-modal-closer").on("click", function (e) {
        e.preventDefault();
        if ($(".contact-modal").hasClass("open")) {
            $(".contact-modal").removeClass("open");
        } else {
            $(".contact-modal").addClass("open");
        }
    });

    // 19. reservation form
    $("form#form-2").on("submit", function () {
        $("form#form-2 .error-r").remove();
        var s = !1;
        if ($(".requiredField-r").each(function () {
            if ("" === jQuery.trim($(this).val())) $(this).prev("label").text(), $(this).parent().append('<span class="error-r">This field is required</span>'), $(this).addClass(
                "inputError"), s = !0;
            else if ($(this).hasClass("email")) {
                var r = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                r.test(jQuery.trim($(this).val())) || ($(this).prev("label").text(), $(this).parent().append('<span class="error-r">Invalid email address</span>'), $(this).addClass(
                    "inputError"), s = !0);
            }
        }), !s) {
            $("form#form-2 input.submit").fadeOut("normal", function () {
                $(this).parent().append("");
            });
            var r = $(this).serialize();
            $.post($(this).attr("action"), r, function () {
                $("form#form-2").slideUp("fast", function () {
                    $(this).before('<div class="success-r">Your reservation has been received.</div>');
                });
            });
        }
        return !1;
    });

    // 20. blog comment form
    $("form#form-3").on("submit", function () {
        $("form#form-3 .error-c").remove();
        var s = !1;
        if ($(".requiredField-c").each(function () {
            if ("" === jQuery.trim($(this).val())) $(this).prev("label").text(), $(this).parent().append('<span class="error-c">This field is required</span>'), $(this).addClass(
                "inputError"), s = !0;
            else if ($(this).hasClass("email")) {
                var r = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                r.test(jQuery.trim($(this).val())) || ($(this).prev("label").text(), $(this).parent().append('<span class="error-c">Invalid email address</span>'), $(this).addClass(
                    "inputError"), s = !0);
            }
        }), !s) {
            $("form#form-3 input.submit").fadeOut("normal", function () {
                $(this).parent().append("");
            });
            var r = $(this).serialize();
            $.post($(this).attr("action"), r, function () {
                $("form#form-3").slideUp("fast", function () {
                    $(this).before('<div class="success">Your email was sent successfully.</div>');
                });
            });
        }
        return !1;
    });


});

}

window.runLuxexScripts = runLuxexScripts;