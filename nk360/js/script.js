 "use strict"; // Start of use strict
  document.querySelectorAll('[data-smooth-scroll]').forEach(function (e) {
    e.addEventListener('click', smoothScroll)
  });

  function smoothScroll(e) {
    const link = this.getAttribute('href').replace('#', '');
    const offsetTop = document.querySelector(`#${link}`).offsetTop;
  //Target the sectonf or screen readers when link is clicked
  $(`#${link}`).focus();
    var screenWidth = $(window).width();
    if (screenWidth < 1200) {
      // Execute code for smaller screens (e.g., mobile)

      $('#navbarSupportedContent').slideToggle('250', 'swing', 'hide');

    }
  }

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
    $('#nav-icon4').removeClass('open');
  });

  //Bootstrap 4 Scrollspy 
  // Activate scrollspy to add active class to navbar items on scroll
  // $('body').scrollspy({
  //   target: '.sideNav'
  // });

  //Bootstrap 5 scroll spy
  var scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '.sideNav',
  })

 

  const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");


  accordionItemHeaders.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener("click", event => {
      accordionItemHeader.classList.toggle("active");
      accordionItemHeader.classList.toggle("open");
      const accordionItemBody = accordionItemHeader.nextElementSibling;
      if (accordionItemHeader.classList.contains("active")) {
        accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + 10 + "px";
      }
      else {
        accordionItemBody.style.maxHeight = 0;
      }

    });
  });

  // $('.accordion-questions-header').trigger('click');

  accordionItemHeaders.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener("keydown", e => {
      if (e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
        accordionItemHeader.classList.toggle("active");
        accordionItemHeader.classList.toggle("open");
        const accordionItemBody = accordionItemHeader.nextElementSibling;
        if (accordionItemHeader.classList.contains("active")) {
          accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";

        }
        else {

          accordionItemBody.style.maxHeight = 0;

        }
      }


    });
  });


  $('#mobile-students-dropdown, #mobile-teachers-dropdown, #mobile-related-modules-dropdown').on('click', function () {
    let ulId = $(this).attr('id');
    $("."+ulId).slideToggle(80);
    $(this).toggleClass('open');
    // nav.module-nav ul li > ul 
  
  })


  $('#students-dropdown').on('click', function () {
    $(".students-dropdown").slideToggle(80);
    $('#students-dropdown').toggleClass('open');
    // nav.module-nav ul li > ul 
  })

  $('#teachers-dropdown').on('click', function () {
    $(".teachers-dropdown").slideToggle(80);
    $('#teachers-dropdown').toggleClass('open');
    // nav.module-nav ul li > ul 
  })


  $('#modules-dropdown').on('click', function () {
    $(".modules-dropdown").slideToggle(80);
    $('#modules-dropdown').toggleClass('open');
    // nav.module-nav ul li > ul 
  })



  const $studentsMenu = $('#students-dropdown');
  const $teachersMenu = $('#teachers-dropdown');
  const $modulesMenu = $('#modules-dropdown');

  $(document).mouseup(function (e) {
    if (!$studentsMenu.is(e.target) // if the target of the click isn't the container...
    && $studentsMenu.has(e.target).length === 0) // ... nor a descendant of the container
    {
      setTimeout(() => {
        $(".students-dropdown").hide();
      }, 100);
      $('#students-dropdown').removeClass('open');
   }
  });

  $(document).mouseup(function (e) {
    if (!$teachersMenu.is(e.target) // if the target of the click isn't the container...
    && $teachersMenu.has(e.target).length === 0) // ... nor a descendant of the container
    {
      setTimeout(() => {
        $(".teachers-dropdown").hide();
      }, 100);
      $('#teachers-dropdown').removeClass('open');
   }
  });

  $(document).mouseup(function (e) {
    if (!$modulesMenu.is(e.target) // if the target of the click isn't the container...
    && $modulesMenu.has(e.target).length === 0) // ... nor a descendant of the container
    {
      setTimeout(() => {
        $(".modules-dropdown").hide();
      }, 100);
      $('#modules-dropdown').removeClass('open');
   }
  });

  // $('.deepen-link').on('click', function () {
  //   if ($('.dropdown-menu').hasClass('show')) {
  //     $('.deepen-link').removeClass('active-deepen-link');
  //     $(this).addClass('active-deepen-link');
  //   }
  // })

  // $('.deepen-link').on('focus', function () {
  //   if ($(this).attr('id') === 'photos-link') {
  //     $('.deepen-dropdown').attr("href", "#photographs-2");
  //   }
  //   if ($(this).attr('id') === 'objects-link') {
  //     $('.deepen-dropdown').attr("href", "#photos-2");
  //   }

  // })

  //   $('.deepen-dropdown').on('click', function () {
  //   $('.dropdown-menu').toggleClass('show');
  //   $('.dropdown-toggle').toggleClass('open');
  //   $('.deepen-link').toggle();
  //   $('.dropdown-links').toggle();
  // })

  // $('.deepen-link').on('click', function () {
  //   if ($('.dropdown-menu').hasClass('show')) {
  //     $('.deepen-link').removeClass('active-deepen-link');
  //     $(this).addClass('active-deepen-link');
  //   }
  // })

  // $('.deepen-link').on('focus', function () {
  //   if ($(this).attr('id') === 'photos-link') {
  //     $('.deepen-dropdown').attr("href", "#photographs-2");
  //   }
  //   if ($(this).attr('id') === 'objects-link') {
  //     $('.deepen-dropdown').attr("href", "#photos-2");
  //   }

  // })

  // $('.nav-link').on('click', function () {
  //   if (!$('.dropdown-menu').hasClass('deepen-dropdown')) {
  //     $('.deepen-link').removeClass('active-deepen-link');
  //   }
  // })


  // function tabList() {
  //   $('#list a').on('keydown', function (event) {
  //     if (event.key === "ArrowDown") {
  //       event.preventDefault();
  //       $.tabNext();
  //     } else if (event.key === "ArrowUp") {
  //       event.preventDefault();
  //       $.tabPrev();
  //     }
  //   });
  // }

  // tabList();

  // $(document).ready(function () {
  //   setTimeout(() => {
  //     $("iframe").removeAttr("frameborder");
  //   }, 500);
  // });


})(jQuery); // End of use strict
