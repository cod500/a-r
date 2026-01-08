$(document).ready(function () {
 $(window).scroll();
    $(window).scroll(function () {
        if ($(window).scrollTop() == 0) {
            $('#overview-lick').addClass('active');
        }
    });

    var windowWidth = $(window).width();

  $(window).resize(function () {
        var windowWidth = $(window).width();

        $(window).scroll(function () {

            if (windowWidth < 1200) {
                if ($(window).scrollTop() > 0) {
                    $('.sideNav').css('position', 'fixed');
                    $('.sideNav').css('top', '0');
                }

                else if ($(window).scrollTop() <= 0) {
                    $('.sideNav').css('position', '');
                    $('.sideNav').css('top', '');
                }
                if ($('.sideNav').offset().top + $(".sideNav").height() > $("#footer").offset().top) {
                    $('.sideNav').css('top', -($(".sideNav").offset().top + $(".sideNav").height() - $("#footer").offset().top));
                }

            } else {
                if ($(window).scrollTop() > 139) {
                    $('.sideNav').css('position', 'fixed');
                    $('.sideNav').css('top', '0');
                }

                else if ($(window).scrollTop() <= 139) {
                    $('.sideNav').css('position', '');
                    $('.sideNav').css('top', '');
                }
                if ($('.sideNav').offset().top + $(".sideNav").height() > $("#footer").offset().top) {
                    $('.sideNav').css('top', -($(".sideNav").offset().top + $(".sideNav").height() - $("#footer").offset().top));
                }

            }

        });

    });


    $(document).ready(function () {
        $('#nav-icon4').click(function () {
            $(this).toggleClass('open');
            $('.navbar-collapse').slideToggle();
        });
    });

    $(document).ready(function () {
        $('.card').click(function () {
            $('.arrow').toggleClass('open');
        });
    });

    // // Init fancyBox
    // $('[data-fancybox]').fancybox({
    //     // Options will go here
    //     wheel: false,
    //     transitionEffect: "slide",
    //     // thumbs          : false,
    //     // hash            : false,
    //     loop: true,
    //     // keyboard        : true,
    //     toolbar: true,
    //     // animationEffect : false,
    //     // arrows          : true,
    //     clickContent: false
    // });

    // /*--------------*/



    // // Main/Product image slider for product page
    // $('.detail .main-img-slider').slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     infinite: false,
    //     arrows: false,
    //     fade: true,
    //     autoplay: false,
    //     autoplaySpeed: 4000,
    //     speed: 300,
    //     lazyLoad: 'ondemand',
    //     asNavFor: '.thumb-nav',
    //     prevArrow: '<img class="slick-prev" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_left_icon.png">',
    //     nextArrow: '<img class="slick-next" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_right_icon.png">'
    // });
    // // Thumbnail/alternates slider for product page
    // $('.thumb-nav').slick({
    //     slidesToShow: 5,
    //     slidesToScroll: 1,
    //     asNavFor: '.slider-for',
    //     dots: false,
    //     centerMode: true,
    //     focusOnSelect: true,
    //     asNavFor: '.main-img-slider',
    //     prevArrow: '<img class="slick-prev" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_left_icon.png">',
    //     nextArrow: '<img class="slick-next" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_right_icon.png">'
    // });

    // //Uniform slider
    // $('.detail .uniform-img-slider').slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     infinite: false,
    //     arrows: false,
    //     fade: true,
    //     autoplay: false,
    //     autoplaySpeed: 4000,
    //     speed: 300,
    //     lazyLoad: 'ondemand',
    //     asNavFor: '.thumb-nav',
    //     prevArrow: '<img class="slick-prev" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_left_icon.png">',
    //     nextArrow: '<img class="slick-next" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_right_icon.png">'
    // });


    // //Outside slider
    // $('.detail .outside-img-slider').slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     infinite: false,
    //     arrows: false,
    //     fade: true,
    //     autoplay: false,
    //     autoplaySpeed: 4000,
    //     speed: 300,
    //     lazyLoad: 'ondemand',
    //     asNavFor: '.thumb-nav',
    //     prevArrow: '<img class="slick-prev" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_left_icon.png">',
    //     nextArrow: '<img class="slick-next" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_right_icon.png">'
    // });

    // //Mary slider
    // $('.detail .mary-img-slider').slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     infinite: false,
    //     arrows: false,
    //     fade: true,
    //     autoplay: false,
    //     autoplaySpeed: 4000,
    //     speed: 300,
    //     lazyLoad: 'ondemand',
    //     asNavFor: '.thumb-nav',
    //     prevArrow: '<img class="slick-prev" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_left_icon.png">',
    //     nextArrow: '<img class="slick-next" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_right_icon.png">'
    // });

    // //Carlisle slider
    // $('.detail .carlisle-img-slider').slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     infinite: false,
    //     arrows: false,
    //     fade: true,
    //     autoplay: false,
    //     autoplaySpeed: 4000,
    //     speed: 300,
    //     lazyLoad: 'ondemand',
    //     asNavFor: '.thumb-nav',
    //     prevArrow: '<img class="slick-prev" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_left_icon.png">',
    //     nextArrow: '<img class="slick-next" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_right_icon.png">'
    // });

    // //Thomas slider
    // $('.detail .thomas-img-slider').slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     infinite: false,
    //     arrows: false,
    //     fade: true,
    //     autoplay: false,
    //     autoplaySpeed: 4000,
    //     speed: 300,
    //     lazyLoad: 'ondemand',
    //     asNavFor: '.thumb-nav',
    //     prevArrow: '<img class="slick-prev" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_left_icon.png">',
    //     nextArrow: '<img class="slick-next" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_right_icon.png">'
    // });

    // //Class slider
    // $('.detail .class-img-slider').slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     infinite: false,
    //     arrows: false,
    //     fade: true,
    //     autoplay: false,
    //     autoplaySpeed: 4000,
    //     speed: 300,
    //     lazyLoad: 'ondemand',
    //     asNavFor: '.thumb-nav',
    //     prevArrow: '<img class="slick-prev" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_left_icon.png">',
    //     nextArrow: '<img class="slick-next" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_right_icon.png">'
    // });

    // //Ditch slider
    // $('.detail .ditch-img-slider').slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     infinite: false,
    //     arrows: false,
    //     fade: true,
    //     autoplay: false,
    //     autoplaySpeed: 4000,
    //     speed: 300,
    //     lazyLoad: 'ondemand',
    //     asNavFor: '.thumb-nav',
    //     prevArrow: '<img class="slick-prev" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_left_icon.png">',
    //     nextArrow: '<img class="slick-next" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_right_icon.png">'
    // });

    // //Elementary slider
    // $('.detail .elementary-img-slider').slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     infinite: false,
    //     arrows: false,
    //     fade: true,
    //     autoplay: false,
    //     autoplaySpeed: 4000,
    //     speed: 300,
    //     lazyLoad: 'ondemand',
    //     asNavFor: '.thumb-nav',
    //     prevArrow: '<img class="slick-prev" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_left_icon.png">',
    //     nextArrow: '<img class="slick-next" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_right_icon.png">'
    // });

    // //Seneca slider
    // $('.detail .seneca-img-slider').slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     infinite: false,
    //     arrows: false,
    //     fade: true,
    //     autoplay: false,
    //     autoplaySpeed: 4000,
    //     speed: 300,
    //     lazyLoad: 'ondemand',
    //     asNavFor: '.thumb-nav',
    //     prevArrow: '<img class="slick-prev" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_left_icon.png">',
    //     nextArrow: '<img class="slick-next" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_right_icon.png">'
    // });

    // //Sunday slider
    // $('.detail .sunday-img-slider').slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     infinite: false,
    //     arrows: false,
    //     fade: true,
    //     autoplay: false,
    //     autoplaySpeed: 4000,
    //     speed: 300,
    //     lazyLoad: 'ondemand',
    //     asNavFor: '.thumb-nav',
    //     prevArrow: '<img class="slick-prev" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_left_icon.png">',
    //     nextArrow: '<img class="slick-next" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_right_icon.png">'
    // });

    // //Entrance slider
    // $('.detail .entrance-img-slider').slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     infinite: false,
    //     arrows: false,
    //     fade: true,
    //     autoplay: false,
    //     autoplaySpeed: 4000,
    //     speed: 300,
    //     lazyLoad: 'ondemand',
    //     asNavFor: '.thumb-nav',
    //     prevArrow: '<img class="slick-prev" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_left_icon.png">',
    //     nextArrow: '<img class="slick-next" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_right_icon.png">'
    // });

    // //Sewingslider
    // $('.detail .sewing-img-slider').slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     infinite: false,
    //     arrows: false,
    //     fade: true,
    //     autoplay: false,
    //     autoplaySpeed: 4000,
    //     speed: 300,
    //     lazyLoad: 'ondemand',
    //     asNavFor: '.thumb-nav',
    //     prevArrow: '<img class="slick-prev" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_left_icon.png">',
    //     nextArrow: '<img class="slick-next" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_right_icon.png">'
    // });

    // //Original slider
    // $('.detail .original-img-slider').slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     infinite: false,
    //     arrows: false,
    //     fade: true,
    //     autoplay: false,
    //     autoplaySpeed: 4000,
    //     speed: 300,
    //     lazyLoad: 'ondemand',
    //     asNavFor: '.thumb-nav',
    //     prevArrow: '<img class="slick-prev" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_left_icon.png">',
    //     nextArrow: '<img class="slick-next" src="/nk360/american-revolution-perseverance/assets/images/nav_arrow_right_icon.png">'
    // });


    // //keeps thumbnails active when changing main image, via mouse/touch drag/swipe
    // $('.main-img-slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
    //     //remove all active class
    //     $('.thumb-nav .slick-slide').removeClass('slick-current');
    //     //set active class for current slide
    //     $('.thumb-nav .slick-slide:not(.slick-cloned)').eq(currentSlide).addClass('slick-current');
    // });

    // //Adds icons to slider 
    // $("div.main-img-slider").append("<div class='slider-icons'><div class='main-download-div' tabindex=0><img class='main-download-btn slider-btn' id='slider-main' src='/nk360/american-revolution-perseverance/assets/images/download_512.png'  alt=''></div><div class='main-expand-div' tabindex=0><img class='main-expand-btn slider-btn slider-btn-expand' id='main' src='/nk360/american-revolution-perseverance/assets/images/expand_content_512.png'  alt=''></div></div>");

    // $(".uniform-img-slider").append("<div class='slider-icons'><div class='slider-download-div' tabindex=0><img class='uniform-download-btn slider-btn slider-btn-download' id='slider-uniform' src='/nk360/american-revolution-perseverance/assets/images/download_512.png'  alt=''></div><div class='slider-div-expand' tabindex=0><img class='uniform-expand-btn slider-btn slider-btn-expand' id='uniform' src='/nk360/american-revolution-perseverance/assets/images/expand_content_512.png'  alt=''></div></div>");

    // $(".carlisle-img-slider").append("<div class='slider-icons'><div class='slider-download-div' tabindex=0><img class='carlise-download-btn slider-btn slider-btn-download' id='carlisle-slider' src='/nk360/american-revolution-perseverance/assets/images/download_512.png'  alt=''></div><div class='slider-div-expand' tabindex=0><img class='carlisle-expand-btn slider-btn slider-btn-expand' id='carlisle' src='/nk360/american-revolution-perseverance/assets/images/expand_content_512.png'  alt=''></div></div>");

    // $("div.mary-img-slider").append("<div class='slider-icons'><div class='slider-download-div' tabindex=0><img class='carlise-download-btn slider-btn slider-btn-download' id='mary-slider' src='/nk360/american-revolution-perseverance/assets/images/download_512.png'  alt=''></div><div class='slider-div-expand' tabindex=0><img class='mary-expand-btn slider-btn slider-btn-expand' id='mary' src='/nk360/american-revolution-perseverance/assets/images/expand_content_512.png'  alt=''></div></div>");

    // $("div.outside-img-slider").append("<div class='slider-icons'><div class='slider-download-div' tabindex=0><img class='outside-download-btn slider-btn slider-btn-download' id='outside-slider' src='/nk360/american-revolution-perseverance/assets/images/download_512.png'  alt=''></div><div class='slider-div-expand' tabindex=0><img class='outside-expand-btn slider-btn slider-btn-expand' id='outside' src='/nk360/american-revolution-perseverance/assets/images/expand_content_512.png'  alt=''></div></div>");

    // $("div.thomas-img-slider").append("<div class='slider-icons'><div class='slider-download-div' tabindex=0><img class='thomas-download-btn slider-btn slider-btn-download' id='thomas-slider' src='/nk360/american-revolution-perseverance/assets/images/download_512.png'  alt=''></div><div class='slider-div-expand' tabindex=0><img class='thomas-expand-btn slider-btn slider-btn-expand' id='thomas' src='/nk360/american-revolution-perseverance/assets/images/expand_content_512.png'  alt=''></div></div>");

    // $("div.class-img-slider").append("<div class='slider-icons'><div class='slider-download-div' tabindex=0><img class='class-download-btn slider-btn slider-btn-download' id='class-slider' src='/nk360/american-revolution-perseverance/assets/images/download_512.png'  alt=''></div><div class='slider-div-expand' tabindex=0><img class='class-expand-btn slider-btn slider-btn-expand' id='class' src='/nk360/american-revolution-perseverance/assets/images/expand_content_512.png'  alt=''></div></div>");

    // $("div.ditch-img-slider").append("<div class='slider-icons'><div class='slider-download-div' tabindex=0><img class='ditch-download-btn slider-btn slider-btn-download' id='ditch-slider' src='/nk360/american-revolution-perseverance/assets/images/download_512.png'  alt=''></div><div class='slider-div-expand' tabindex=0><img class='ditch-expand-btn slider-btn slider-btn-expand' id='ditch' src='/nk360/american-revolution-perseverance/assets/images/expand_content_512.png'  alt=''></div></div>");

    // $("div.elementary-img-slider").append("<div class='slider-icons'><div class='slider-download-div' tabindex=0><img class='elementary-download-btn slider-btn slider-btn-download' id='elementary-slider' src='/nk360/american-revolution-perseverance/assets/images/download_512.png'  alt=''></div><div class='slider-div-expand' tabindex=0><img class='elementary-expand-btn slider-btn slider-btn-expand' id='elementary' src='/nk360/american-revolution-perseverance/assets/images/expand_content_512.png'  alt=''></div></div>");

    // $("div.seneca-img-slider").append("<div class='slider-icons'><div class='slider-download-div' tabindex=0><img class='seneca-download-btn slider-btn slider-btn-download' id='seneca-slider' src='/nk360/american-revolution-perseverance/assets/images/download_512.png'  alt=''></div><div class='slider-div-expand' tabindex=0><img class='seneca-expand-btn slider-btn slider-btn-expand' id='seneca' src='/nk360/american-revolution-perseverance/assets/images/expand_content_512.png'  alt=''></div></div>");

    // $("div.sunday-img-slider").append("<div class='slider-icons'><div class='slider-download-div' tabindex=0><img class='sunday-download-btn slider-btn slider-btn-download' id='sunday-slider' src='/nk360/american-revolution-perseverance/assets/images/download_512.png'  alt=''></div><div class='slider-div-expand' tabindex=0><img class='sunday-expand-btn slider-btn slider-btn-expand' id='sunday' src='/nk360/american-revolution-perseverance/assets/images/expand_content_512.png'  alt=''></div></div>");

    // $("div.entrance-img-slider").append("<div class='slider-icons'><div class='slider-download-div' tabindex=0><img class='entrance-download-btn slider-btn slider-btn-download' id='entrance-slider' src='/nk360/american-revolution-perseverance/assets/images/download_512.png'  alt=''></div><div class='slider-div-expand' tabindex=0><img class='entrance-expand-btn slider-btn slider-btn-expand' id='entrance' src='/nk360/american-revolution-perseverance/assets/images/expand_content_512.png'  alt=''></div></div>");

    // $("div.sewing-img-slider").append("<div class='slider-icons'><div class='slider-download-div' tabindex=0><img class='sewing-download-btn slider-btn slider-btn-download' id='sewing-slider' src='/nk360/american-revolution-perseverance/assets/images/download_512.png'  alt=''></div><div class='slider-div-expand' tabindex=0><img class='sewing-expand-btn slider-btn slider-btn-expand' id='sewing' src='/nk360/american-revolution-perseverance/assets/images/expand_content_512.png'  alt=''></div></div>");

    // $("div.original-img-slider").append("<div class='slider-icons'><div class='slider-download-div' tabindex=0><img class='original-download-btn slider-btn slider-btn-download' id='original-slider' src='/nk360/american-revolution-perseverance/assets/images/download_512.png'  alt=''></div><div class='slider-div-expand' tabindex=0><img class='original-expand-btn slider-btn slider-btn-expand' id='original' src='/nk360/american-revolution-perseverance/assets/images/expand_content_512.png'  alt=''></div></div>");


    // //Expands image to full screen
    // $('.main-expand-btn').on('click', function () {
    //     let imgId = $(this).attr('id');
    //     $(`a.slider-${imgId}.slick-slide.slick-current.slick-active > img`).trigger('click');
    // })

 
    //     // Event listener for the div with tabindex="0"
    //     $('div.main-expand-div').on('keydown', function(event) {
    //         let imgId = $(this).find('img.main-expand-btn').attr('id');
    //       if (event.key === "Enter" || event.keyCode === 13) {
    //     $(`a.slider-${imgId}.slick-slide.slick-current.slick-active > img`).trigger('click');
    //       }
    //     });
      

    // $('.slider-btn-expand').on('click', function () {
    //     let imgId = $(this).attr('id');
    //     $(`img.${imgId}-slider`).trigger('click');

    // })

    // // Event listener for the div with tabindex="0"
    // $('div.slider-div-expand').on('keydown', function(event) {
    //     let imgId = $(this).find('img.slider-btn-expand').attr('id');
    //   if (event.key === "Enter" || event.keyCode === 13) {
    //     $(`img.${imgId}-slider`).trigger('click');
    //   }
    // });

    // //Downloads current image

    // // Must use FileSaver.js 2.0.2 because 2.0.3 has issues.
    // $('.slider-btn-download').on('click', function () {
    //     let imageId = $(this).attr('id');
    //     let img = document.querySelector(`img.${imageId}`);
    //     let imagePath = img.getAttribute('src');
    //     let fileName = getFileName(imagePath);
    //     saveAs(imagePath, fileName);
    // });

    // $('div.slider-download-div').on('keydown', function(event) {
    //     let imageId = $(this).find('img.slider-btn-download').attr('id');
    //   if (event.key === "Enter" || event.keyCode === 13) {
    //     let img = document.querySelector(`img.${imageId}`);
    //     let imagePath = img.getAttribute('src');
    //     let fileName = getFileName(imagePath);
    //     saveAs(imagePath, fileName);
    //   }
    // });

    // let btnDownload = document.querySelector('.main-download-btn');
    // btnDownload.addEventListener('click', () => {
    //     let imageId = btnDownload.getAttribute('id');
    //     let img = document.querySelector(`a.${imageId}.slick-slide.slick-current.slick-active > img`);
    //     let imagePath = img.getAttribute('src');
    //     let fileName = getFileName(imagePath);
    //     saveAs(imagePath, fileName);
    // });

    // $('div.main-download-div').on('keydown', function(event) {
    //   if (event.key === "Enter" || event.keyCode === 13) {
    //     let imageId = btnDownload.getAttribute('id');
    //     let img = document.querySelector(`a.${imageId}.slick-slide.slick-current.slick-active > img`);
    //     let imagePath = img.getAttribute('src');
    //     let fileName = getFileName(imagePath);
    //     saveAs(imagePath, fileName);
    //   }
    // });

    // function getFileName(str) {
    //     return str.substring(str.lastIndexOf('/') + 1)
    // }

    // //Main slider accessibility
    // //Selects slide on tab and enter
    // $('.main-slider-thumb').on('keydown', function(event){
    //     if (event.key === "Enter" || event.keyCode === 13) {
    //         $(this).trigger('click');
    //       }
    // })

    // $('.main-slider-thumb').removeAttr('aria-hidden');


    // //End Filesaver Download
    // // $('.player1-link.able-button-handler-transcript').on('click', function () {
    // //     $('#player1 > div.able-wrapper.able-skin-2020 > div.able > div.able-player.able-video > div.able-controller.able-white-controls > div.able-right-controls > div.able-button-handler-transcript').trigger('click');
    // //     closeVideoOne();
    // // })

    // // $('.player2-link.able-button-handler-transcript').on('click', function () {
    // //     $('#player2 > div.able-wrapper.able-skin-2020 > div.able > div.able-player.able-video > div.able-controller.able-white-controls > div.able-right-controls > div.able-button-handler-transcript').trigger('click');
    // //     closeVideoTwo();
    // // })




    // function closeVideoOne(){
    //     $('#close-video1').on('click', function(){
    //         $('#player1 > div > div.able-transcript-area').hide();
    //     })
    // }
    // function closeVideoTwo(){
    //     $('#close-video2').on('click', function(){
    //         $('#player2 > div > div.able-transcript-area').hide();
    //     })
    // }
    // setTimeout(() => {
    //     closeVideoOne();
    //     closeVideoTwo();
    // }, 2000);
    


});

