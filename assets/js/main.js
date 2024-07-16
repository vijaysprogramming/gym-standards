(function ($)
  { "use strict"
  
/* 1. Proloder */
    $(window).on('load', function () {
      $('#preloader-active').delay(450).fadeOut('slow');
      $('body').delay(450).css({
        'overflow': 'visible'
      });
    });

/* 2. sticky And Scroll UP */
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 400) {
        $(".header-sticky").removeClass("sticky-bar");
        $('#back-top').fadeOut(500);
      } else {
        $(".header-sticky").addClass("sticky-bar");
        $('#back-top').fadeIn(500);
      }
    });

  // Scroll Up
    $('#back-top a').on("click", function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });
  

/* 3. slick Nav */
// mobile_menu
    var menu = $('ul#navigation');
    if(menu.length){
      menu.slicknav({
        prependTo: ".mobile_menu",
        closedSymbol: '+',
        openedSymbol:'-'
      });
    };

/* 4. MainSlider-1 */
    // h1-hero-active
    function mainSlider() {
      var BasicSlider = $('.slider-active');
      BasicSlider.on('init', function (e, slick) {
        var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
        doAnimations($firstAnimatingElements);
      });
      BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
        var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
        doAnimations($animatingElements);
      });
      BasicSlider.slick({
        autoplay: true,
        autoplaySpeed: 5000,
        dots: false,
        fade: true,
        arrows: false, 
        prevArrow: '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
        responsive: [{
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false
            }
          }
        ]
      });

      function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function () {
          var $this = $(this);
          var $animationDelay = $this.data('delay');
          var $animationType = 'animated ' + $this.data('animation');
          $this.css({
            'animation-delay': $animationDelay,
            '-webkit-animation-delay': $animationDelay
          });
          $this.addClass($animationType).one(animationEndEvents, function () {
            $this.removeClass($animationType);
          });
        });
      }
    }
    mainSlider();

/* 5. Testimonial Active*/

/* 4. Testimonial Active*/
    var testimonial = $('.h1-testimonial-active');
    if(testimonial.length){
    testimonial.slick({
        dots: false,
        infinite: true,
        speed: 1000,
        autoplay:true,
        loop:true,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="ti-arrow-top-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="ti-arrow-top-right"></i></button>',
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
              arrow:false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows:false
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows:false,
            }
          }
        ]
      });
    }

/* 6. Nice Selectorp  */
  var nice_Select = $('select');
    if(nice_Select.length){
      nice_Select.niceSelect();
    }

/* 7. data-background */
    $("[data-background]").each(function () {
      $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
      });


/* 10. WOW active */
    new WOW().init();

// 11. ---- Mailchimp js --------//  
    function mailChimp() {
      $('#mc_embed_signup').find('form').ajaxChimp();
    }
    mailChimp();


// 12 Pop Up Img
    var popUp = $('.single_gallery_part, .img-pop-up');
      if(popUp.length){
        popUp.magnificPopup({
          type: 'image',
          gallery:{
            enabled:true
          }
        });
      }
// 12 Pop Up Video
    var popUp = $('.popup-video');
    if(popUp.length){
      popUp.magnificPopup({
        type: 'iframe'
      });
    }

/* 13. counterUp*/
    $('.counter').counterUp({
      delay: 10,
      time: 3000
    });

/* 14. Datepicker */
  $('#datepicker1').datepicker();

// 15. Time Picker
  $('#timepicker').timepicker();

//16. Overlay
  $(".snake").snakeify({
    speed: 200
  });

})(jQuery);


// JavaScript for carousel functionality 1
const carousel = document.getElementById('carousel');
const squares = document.querySelectorAll('.square');
const totalSquares = squares.length;
const scrollSpeed = 1; // Adjust scroll speed as needed
const autoScrollDelay = 1000; // Delay in milliseconds before auto-scroll resumes after manual scroll
let isAutoScrolling = true;
let autoScrollTimeout;
let animationId;

const autoScroll = () => {
    if (isAutoScrolling) {
        carousel.scrollLeft += scrollSpeed; // Scroll right continuously
        if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
            carousel.scrollLeft = 0; // Reset to start for continuous loop
        }
    }
    animationId = requestAnimationFrame(autoScroll);
};

const stopAutoScroll = () => {
    isAutoScrolling = false;
    cancelAnimationFrame(animationId);
};

const startAutoScroll = () => {
    isAutoScrolling = true;
    autoScroll();
};

const restartAutoScroll = () => {
    clearTimeout(autoScrollTimeout);
    autoScrollTimeout = setTimeout(() => {
        startAutoScroll();
    }, autoScrollDelay);
};

// Start auto-scrolling immediately
startAutoScroll();

// Handle manual scrolling with buttons
const handleClickGoAhead = () => {
    stopAutoScroll();
    carousel.scrollLeft += squares[0].offsetWidth;
    if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
        carousel.scrollLeft = 0;
    }
    restartAutoScroll();
};

const handleClickGoBack = () => {
    stopAutoScroll();
    carousel.scrollLeft -= squares[0].offsetWidth;
    if (carousel.scrollLeft < 0) {
        carousel.scrollLeft = carousel.scrollWidth - carousel.clientWidth;
    }
    restartAutoScroll();
};

// Event listeners for manual scrolling buttons
document.querySelector('#left').addEventListener('click', handleClickGoBack);
document.querySelector('#right').addEventListener('click', handleClickGoAhead);


// JavaScript for carousel functionality 2
const carousel2 = document.getElementById('carousel2');
const squares2 = document.querySelectorAll('.square');
const totalSquares2 = squares.length;
const scrollSpeed2 = 1; // Adjust scroll speed as needed
const autoScrollDelay2 = 1000; // Delay in milliseconds before auto-scroll resumes after manual scroll
let isAutoScrolling2 = true;
let autoScrollTimeout2;
let animationId2;

const autoScroll2 = () => {
    if (isAutoScrolling2) {
        carousel2.scrollLeft += scrollSpeed2; // Scroll right continuously
        if (carousel2.scrollLeft >= carousel2.scrollWidth - carousel2.clientWidth) {
            carousel2.scrollLeft = 0; // Reset to start for continuous loop
        }
    }
    animationId2 = requestAnimationFrame(autoScroll2);
};

const stopAutoScroll2 = () => {
    isAutoScrolling2 = false;
    cancelAnimationFrame2(animationId2);
};

const startAutoScroll2 = () => {
    isAutoScrolling2 = true;
    autoScroll2();
};

const restartAutoScroll2 = () => {
    clearTimeout(autoScrollTimeout);
    autoScrollTimeout2 = setTimeout(() => {
        startAutoScroll2();
    }, autoScrollDelay);
};

// Start auto-scrolling immediately
startAutoScroll2();

// Handle manual scrolling with buttons
const handleClickGoAhead2 = () => {
    stopAutoScroll2();
    carousel2.scrollLeft += squares[0].offsetWidth;
    if (carousel2.scrollLeft >= carousel2.scrollWidth - carousel2.clientWidth) {
        carousel2.scrollLeft = 0;
    }
    restartAutoScroll2();
};

const handleClickGoBack2 = () => {
    stopAutoScroll2();
    carousel2.scrollLeft -= squares[0].offsetWidth;
    if (carousel2.scrollLeft < 0) {
        carousel2.scrollLeft = carousel2.scrollWidth - carousel2.clientWidth;
    }
    restartAutoScroll2();
};

// Event listeners for manual scrolling buttons
document.querySelector('#left2').addEventListener('click', handleClickGoBack2);
document.querySelector('#right2').addEventListener('click', handleClickGoAhead2);


