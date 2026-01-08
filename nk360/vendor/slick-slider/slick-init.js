

// Keyboard support for Slick arrows (works for arrows created by Slick)
$(document).on('keydown', '.slick-prev, .slick-next', function (e) {
  const isEnter = e.key === 'Enter' || e.keyCode === 13;
  const isSpace = e.key === ' ' || e.keyCode === 32;
  if (!isEnter && !isSpace) return;

  e.preventDefault(); // stop page scroll on Space
  if ($(this).is('.slick-disabled, .slick-hidden')) return;

  const $slider = $(this).closest('.slick-slider');
  if ($(this).hasClass('slick-prev')) {
    $slider.slick('slickPrev');
  } else {
    $slider.slick('slickNext');
  }
});

// Force the current slide to be tabindex -1
$('.my-slider')
  .on('setPosition reInit', function (e, slick) {
    slick.$slides.attr('tabindex', -1);                // all slides -1
    slick.$slides.filter('.slick-current').attr('tabindex', -1); // current stays -1
  })
  .on('init', function (e, slick) {
    // run once on first init too
    slick.$slides.attr('tabindex', -1);
    slick.$slides.filter('.slick-current').attr('tabindex', -1);
  });
