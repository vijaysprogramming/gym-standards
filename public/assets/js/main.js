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





//second carousel
 // JavaScript for carousel functionality
 const carouselElement = document.querySelector('.carousel-content');
 const carouselItems = document.querySelectorAll('.carousel-item');
 const carouselScrollSpeed = 1; // Adjust scroll speed as needed
 const carouselAutoScrollDelay = 1000; // Delay in milliseconds before auto-scroll resumes after manual scroll
 let carouselAutoScrollActive = true;
 let carouselAutoScrollTimeout;
 let carouselScrollAnimationId;

 const autoScrollCarousel = () => {
     if (carouselAutoScrollActive) {
         carouselElement.scrollLeft += carouselScrollSpeed; // Scroll right continuously
         if (carouselElement.scrollLeft >= carouselElement.scrollWidth - carouselElement.clientWidth) {
             carouselElement.scrollLeft = 0; // Reset to start for continuous loop
         }
     }
     carouselScrollAnimationId = requestAnimationFrame(autoScrollCarousel);
 };

 const pauseCarouselAutoScroll = () => {
     carouselAutoScrollActive = false;
     cancelAnimationFrame(carouselScrollAnimationId);
 };

 const resumeCarouselAutoScroll = () => {
     carouselAutoScrollActive = true;
     autoScrollCarousel();
 };

 const restartCarouselAutoScroll = () => {
     clearTimeout(carouselAutoScrollTimeout);
     carouselAutoScrollTimeout = setTimeout(() => {
         resumeCarouselAutoScroll();
     }, carouselAutoScrollDelay);
 };

 // Start auto-scrolling immediately
 autoScrollCarousel();

 // Handle manual scrolling with buttons
 const scrollCarouselForward = () => {
     pauseCarouselAutoScroll();
     carouselElement.scrollLeft += carouselItems[0].offsetWidth;
     if (carouselElement.scrollLeft >= carouselElement.scrollWidth - carouselElement.clientWidth) {
         carouselElement.scrollLeft = 0;
     }
     restartCarouselAutoScroll();
 };

 const scrollCarouselBackward = () => {
     pauseCarouselAutoScroll();
     carouselElement.scrollLeft -= carouselItems[0].offsetWidth;
     if (carouselElement.scrollLeft < 0) {
         carouselElement.scrollLeft = carouselElement.scrollWidth - carouselElement.clientWidth;
     }
     restartCarouselAutoScroll();
 };

 // Event listeners for manual scrolling buttons
 document.querySelector('#carousel-scroll-left').addEventListener('click', scrollCarouselBackward);
 document.querySelector('#carousel-scroll-right').addEventListener('click', scrollCarouselForward);

//  products script start
// script.js
document.addEventListener('DOMContentLoaded', () => {
  const products = [
      { id: 1, name: "Product 1", price: 10.00, image: "/nike.png" },
      { id: 2, name: "Product 2", price: 20.00, image: "https://via.placeholder.com/150" },
      { id: 3, name: "Product 3", price: 30.00, image: "https://via.placeholder.com/150" },
  ];

  const productList = document.getElementById('product-list');
  const cartItems = document.getElementById('cart-items');
  let cart = [];

  products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'col-lg-4 col-md-6 col-sm-12 product-card';
      productCard.innerHTML = `
          <div class="card">
              <img src="${product.image}" alt="${product.name}" class="card-img-top" data-toggle="modal" data-target="#quickViewModal" data-image="${product.image}">
              <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text">$${product.price.toFixed(2)}</p>
                  <button class="btnn btn-info details-btn">Details</button>
                  <button class="btnn btn-success add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
              </div>
          </div>
      `;
      productList.appendChild(productCard);
  });

  productList.addEventListener('click', (event) => {
      if (event.target.classList.contains('add-to-cart-btn')) {
          const productId = event.target.getAttribute('data-id');
          const product = products.find(p => p.id == productId);
          cart.push(product);
          updateCart();
      }
  });

  productList.addEventListener('click', (event) => {
      if (event.target.hasAttribute('data-toggle') && event.target.getAttribute('data-toggle') === 'modal') {
          const imageUrl = event.target.getAttribute('data-image');
          document.getElementById('quickViewImage').src = imageUrl;
      }
  });

  cartItems.addEventListener('click', (event) => {
      if (event.target.classList.contains('remove-from-cart-btn')) {
          const productId = event.target.getAttribute('data-id');
          cart = cart.filter(item => item.id != productId);
          updateCart();
      }
  });

  document.getElementById('checkout-btn').addEventListener('click', () => {
      localStorage.setItem('cart', JSON.stringify(cart));
      window.location.href = 'checkout.html';
  });

  function updateCart() {
      cartItems.innerHTML = '';
      cart.forEach(product => {
          const cartItem = document.createElement('li');
          cartItem.className = 'list-group-item';
          cartItem.innerHTML = `
              <img src="${product.image}" alt="${product.name}" class="cart-item-img">
              ${product.name} - $${product.price.toFixed(2)}
              <button class="btn btn-danger btn-sm float-right remove-from-cart-btn" data-id="${product.id}">Remove</button>
          `;
          cartItems.appendChild(cartItem);
      });
  }
});

//  products script end