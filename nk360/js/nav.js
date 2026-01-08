(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
// Smooth scroll + focus target (works for click AND Enter/Space, delegated)
$(document).off('.anchorFocus').on(
  'click.anchorFocus keydown.anchorFocus',
  '.sideNav a[href*="#"]:not([href="#"]), a.js-scroll-trigger[href*="#"]:not([href="#"])',
  function (e) {

    // Keyboard: only act on Enter/Space
    if (e.type === 'keydown') {
      const key = e.key || e.keyCode;
      const isEnter = key === 'Enter' || key === 13;
      const isSpace = key === ' ' || key === 'Spacebar' || key === 32;
      if (!isEnter && !isSpace) return;
      e.preventDefault();
    }

    // Only handle same-page hashes
    const hash = this.hash;
    if (!hash) return;

    // If you have cross-page hash links, keep this guard
    if (location.pathname.replace(/^\//, '') !== this.pathname.replace(/^\//, '') ||
        location.hostname !== this.hostname) {
      return;
    }

    let $target = $(hash);
    if (!$target.length) $target = $('[name="' + hash.slice(1) + '"]');
    if (!$target.length) return;

    e.preventDefault();

    // Prefer focusing a heading inside the section (better SR experience)
    const $heading = $target.find('h1,h2,h3,[role="heading"]').first();
    const $focusEl = $heading.length ? $heading : $target;

    // Ensure focusable
    if (!$focusEl.is(':focusable')) {
      if (!$focusEl.attr('tabindex')) $focusEl.attr('tabindex', '-1');
    }

    // Scroll then focus (use a small delay to beat ScrollSpy/Bootstrap repaint)
    $('html, body').stop(true).animate(
      { scrollTop: $target.offset().top },
      800,
      "easeInOutExpo",
      function () {
        setTimeout(() => {
          $focusEl.trigger('focus');
        }, 50);
      }
    );
  }
);

// jQuery doesn't include :focusable by default, add a tiny helper
$.expr.pseudos.focusable = function (el) {
  const tag = el.tagName;
  const focusableTags = /^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/;
  const hasTabindex = el.hasAttribute('tabindex');
  const disabled = el.disabled || el.getAttribute('aria-disabled') === 'true';
  if (disabled) return false;
  if (focusableTags.test(tag)) return true;
  if (hasTabindex) return el.getAttribute('tabindex') !== '-1';
  return el.hasAttribute('contenteditable');
};




  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  //Temporarily turned off for teachers pages
  if ($(".student-nav").length > 0) {
    var scrollSpy = new bootstrap.ScrollSpy(document.body, {
      target: '.sideNav',
      offset: 148 
    });
  }

  // Sticky Nav, Scrolls until top of footer  (removed accidental nested handler)
  $(window).scroll(function () {
    if ($(window).scrollTop() > 139) {
      $('.sideNav').css({ position: 'fixed', top: '0' });
    } else {
      $('.sideNav').css({ position: '', top: '' });
    }
    if ($('.sideNav').offset().top + $(".sideNav").height() > $("#footer").offset().top) {
      $('.sideNav').css('top', -($(".sideNav").offset().top + $(".sideNav").height() - $("#footer").offset().top));
    }
  });

  // Mobile top dropdowns
  $('#mobile-teachers-dropdown, #mobile-related-modules-dropdown').on('click', function () {
    let ulId = $(this).attr('id');
    $("." + ulId).stop(true, true).slideToggle(80);
    $(this).toggleClass('open');
  });

  // ======================================================================
  // === FIX: SINGLE SOURCE OF TRUTH for top module nav dropdown behavior ==
  // ======================================================================
  $(function () {
    const $nav = $('.module-nav');
    const $triggers = $nav.find('#students-dropdown, #teachers-dropdown'); // only the two top links
    const $menus = $nav.find('.dropdown-ul'); // the two ULs under them

  function resetArrows() {
  // Only reset DESKTOP arrows (.rotate-arrow), leave mobile (.flip-arrow) alone
  $triggers
    .find('.rotate-arrow')
    .css({
      transition: 'transform 0.3s ease',
      transform: 'rotate(0deg)'
    });
}


    function closeAll() {
      $triggers.removeClass('open').attr('aria-expanded', 'false');
      resetArrows();
      $menus.removeClass('is-animating').stop(true, true).slideUp(120);

      // NEW: allow hover-underline again
      $nav.removeClass('nav-locked');
    }

    function openMenu($trigger) {
      const $menu = $trigger.next('.dropdown-ul');
      if (!$menu.length) return;

      closeAll();
      $trigger.addClass('open').attr('aria-expanded', 'true');

      // NEW: disable hover-underline on both links while a menu is open
      $nav.addClass('nav-locked');

      // rotate just this arrow
      // rotate just this arrow (desktop)
const $arrow = $trigger.find('.rotate-arrow, .flip-arrow').first();
if ($arrow.length) {
  $arrow
    .addClass('is-open')                 // harmless if your CSS uses it
    .css({
      transition: 'transform 0.3s ease',
      transform: 'rotate(180deg)'
    });
}


      // dropdown + gold bar animation
      $menu.stop(true, true).slideDown(150, function () {
      
        this.offsetWidth;
        $(this).addClass('is-animating');
      });
    }

    function openMenuAgain($trigger) {
      const $menu = $trigger.next('.dropdown-ul');
      if (!$menu.length) return;

      closeAll();
      $trigger.addClass('open').attr('aria-expanded', 'true');

      $nav.addClass('nav-locked');

      const $arrow = $trigger.find('.rotate-arrow, .flip-arrow').first();
      if ($arrow.length) $arrow.css('transform', 'rotate(180deg)');

      $menu.stop(true, true).slideDown(150, function () {
        this.offsetWidth;
        $(this).addClass('is-animating');
      });
    }

    // Click toggles on the sibling UL ONLY (no hard-coded class mapping)
    $triggers.off('.dropdownFix').on('click.dropdownFix', function (e) {
      e.preventDefault();
      const $t = $(this);
      const $menu = $t.next('.dropdown-ul');
      if ($menu.is(':visible')) {
        closeAll();
      } else {
        openMenu($t); // using the first openMenu
      }
    });

    // Click outside closes
    $(document).off('.dropdownOutside').on('click.dropdownOutside', function (e) {
      if (!$(e.target).closest('.module-nav').length) {
        closeAll();
      }
    });

    // Close when tabbing/focusing OUT of the open dropdown (keyboard users)
  $nav.off('focusout.dropdownFix').on('focusout.dropdownFix', function () {
  setTimeout(() => {
    const active = document.activeElement;

    // If focus left the entire module-nav, close everything
    if (!active || !$(active).closest('.module-nav').length) {
      closeAll();
      return;
    }

    // If a dropdown is open, but focus is no longer inside that dropdown group, close it
    const $openTrigger = $triggers.filter('.open').first();
    if (!$openTrigger.length) return;

    const $openMenu = $openTrigger.next('.dropdown-ul');

    const focusInsideOpenGroup =
      $(active).is($openTrigger) ||
      $(active).closest($openTrigger).length ||
      ($openMenu.length && $(active).closest($openMenu).length);

    if (!focusInsideOpenGroup) {
      closeAll();
    }
  }, 0);
});


    // ESC closes if focus is within nav
    $(document).off('keydown.dropdownEsc').on('keydown.dropdownEsc', function (e) {
      if (e.key === 'Escape' && $(document.activeElement).closest('.module-nav').length) {
        closeAll();
      }
    });
  });
  // ======================================================================
  // === END FIX ===========================================================
  // ======================================================================

  // Modules dropdown (separate section)
  $('#modules-dropdown').off('.modulesToggle').on('click.modulesToggle', function (e) {
    e.preventDefault();
    $(".modules-dropdown").stop(true, true).slideToggle(80);
    $('#modules-dropdown').toggleClass('open');
  });

  // Consolidated single "click outside" closer for Students/Teachers/Modules
  $(document).off('mouseup.navclosers').on('mouseup.navclosers', function (e) {
    const $targets = $('#students-dropdown, #teachers-dropdown, #modules-dropdown');
    const $clickedTrigger = $targets.is(e.target) || $targets.has(e.target).length;
    if ($clickedTrigger) return;

    // Close the three menus if click is outside their triggers and menus
    const $menuWrap = $('.module-nav, .modules-dropdown');
    if (!$menuWrap.is(e.target) && $menuWrap.has(e.target).length === 0) {
      $(".students-dropdown, .teachers-dropdown, .modules-dropdown").hide();
      $targets.removeClass('open');
      $('.rotate-arrow, .flip-arrow').css('transform', 'rotate(0deg)');
      $('.dropdown-ul').removeClass('is-animating');
    }
  });

  // ScrollSpy parent highlight
  $(document).ready(function () {
    $(window).on('activate.bs.scrollspy', function () {
      if (
        $('#document-a-link').hasClass('active') ||
        $('#document-b-link').hasClass('active') ||
        $('#document-c-link').hasClass('active') ||
        $('#document-d-link').hasClass('active') ||
        $('#guiding-question-link').hasClass('active') ||
        $('#video-#quotes').hasClass('active') ||
        $('#video-guiding-question').hasClass('active')
      ) {
        $('#deepen-parent').addClass('parent-active');
      } else {
        $('#deepen-parent').removeClass('parent-active');
      }
    });
  });

  // Mobile hamburger open/close speed control
  $(document).ready(function () {
    $('#nav-icon4').off('click.navspeed').on('click.navspeed', function (e) {
      e.preventDefault();
      const $c = $('.navbar-collapse');

      $(this).toggleClass('close');
      $(this).toggleClass('hamburger-open');

      if ($c.is(':visible')) {
        // CLOSE (faster)
        $c.stop(true, true).slideUp(340, 'swing');
      } else {
        // OPEN (slower)
        $c.stop(true, true).slideDown(800, 'swing');
      }
    });
  });

  // Card arrow demo
  $(document).ready(function () {
    $('.card').off('click.cardArrow').on('click.cardArrow', function () {
      $('.arrow').toggleClass('open');
    });
  });

  // Basic keyboard list-nav
  function tabList() {
    $('#list a').off('keydown.tablist').on('keydown.tablist', function (event) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        $.tabNext && $.tabNext();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        $.tabPrev && $.tabPrev();
      }
    });
  }
  tabList();

  // Iframe cleanup
  $(document).ready(function () {
    setTimeout(() => {
      $("iframe").removeAttr("frameborder");
    }, 500);
  });

  // ====== Mobile secondary dropdown binder (same behavior, now SLOW) ======
  document.addEventListener('DOMContentLoaded', () => {
    // hide all section links initially
    document.querySelectorAll('.navbar-nav .dropdown-links.mobile-links').forEach(li => {
      li.style.display = 'none';
    });

    const bindDropdown = (triggerId) => {
      const trigger = document.getElementById(triggerId);
      if (!trigger) return;

      const parentLI = trigger.closest('li.nav-item.dropdown');
      const arrow = trigger.querySelector('.flip-arrow');

      // collect the consecutive .dropdown-links that belong to this trigger
      const group = [];
      let sib = parentLI && parentLI.nextElementSibling;
      while (sib && sib.classList && sib.classList.contains('dropdown-links')) {
        group.push(sib);
        sib = sib.nextElementSibling;
      }
      if (!group.length) return;

      const hasJQ = typeof window.jQuery !== 'undefined';
      const SPEED = 200; // 0.8s slide

      const openGroup = () => {
        if (hasJQ) {
          window.jQuery(group).stop(true, true).slideDown();
        } else {
          group.forEach(el => {
            el.style.transition = 'none';
            el.style.display = 'list-item';
            el.style.maxHeight = '';
            el.style.overflow = '';
            
          });
        }

        if (arrow) {
          arrow.style.transition = 'transform 0.8s ease';
          arrow.style.transform = 'rotate(180deg)';
        }
        trigger.classList.add('open');
      };

const closeGroup = () => {
  // Handle the closing animation/logic
  if (hasJQ) {
    window.jQuery(group).stop(true, true).slideUp(SPEED);
  } else {
    group.forEach((el) => {
      el.style.transition = 'none';
      el.style.display = 'none';
      el.style.maxHeight = '';
      el.style.overflow = '';
    });
  }

  // Reset UI elements
  if (arrow) {
    arrow.style.transform = 'rotate(0deg)';
  }

  trigger.classList.remove('open');
};

      // Use computed visibility so CSS baselines work
      const isOpen = () => {
        if (!group.length) return false;
        return hasJQ
          ? window.jQuery(group[0]).is(':visible')
          : getComputedStyle(group[0]).display !== 'none';
      };

      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        isOpen() ? closeGroup() : openGroup();
      });
    };

    bindDropdown('mobile-about-dropdown');
    bindDropdown('for-steachers-dropdown');
  });

  // -------- Subnav functionality (mobile-aware) --------
  document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('navbarSupportedContent');
    if (!container) return;

    const screens = Array.from(container.querySelectorAll('.nav-screen'));
    const getScreen = (name) => screens.find(ul => ul.dataset.screen === name);
    const mq = window.matchMedia('(max-width: 1200px)'); // mobile breakpoint

    function showScreen(name, { focusFirst = true } = {}) {
      screens.forEach(ul => {
        const isActive = (ul.dataset.screen === name);
        ul.classList.toggle('is-active', isActive);
        ul.hidden = !isActive;
        ul.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      });
      if (focusFirst) {
        const firstLink = getScreen(name)?.querySelector('a,button');
        if (firstLink) firstLink.focus({ preventScroll: true });
      }
    }

    // Decide the initial screen, but ONLY honor defaults on MOBILE
    function pickInitialScreen() {
      if (!mq.matches) return 'home'; // desktop/tablet: always show home

      const attrDefault = container.getAttribute('data-default-screen');          // e.g., "home" | "lesson-plans"
      const jsDefault = (window.NAV_DEFAULT_MOBILE || window.NAV_DEFAULT) || null;

      if (attrDefault === 'home' || attrDefault === 'lesson-plans') return attrDefault;
      if (jsDefault === 'home' || jsDefault === 'lesson-plans') return jsDefault;
      if (location.pathname.startsWith('/teachers')) return 'lesson-plans';
      return 'home';
    }

    let initialScreen = pickInitialScreen();
    let currentScreen = null;

    function applyInitial({ focusFirst } = { focusFirst: false }) {
      const next = pickInitialScreen();
      initialScreen = next; // keep latest rule
      if (currentScreen !== next) {
        showScreen(next, { focusFirst });
        currentScreen = next;
      }
    }

    // INITIALIZE (don’t auto-focus Home)
    applyInitial({ focusFirst: initialScreen !== 'home' });

    // Re-apply when crossing the breakpoint (e.g., rotate, resize)
    mq.addEventListener('change', () => applyInitial({ focusFirst: false }));

    // Only "Lesson Plans" deepens to second level
    const lessonPlansLink = document.getElementById('lesson-plans');
    if (lessonPlansLink) {
      lessonPlansLink.addEventListener('click', function (e) {
        e.preventDefault();
        showScreen('lesson-plans');
        currentScreen = 'lesson-plans';
      });
    }

    // Back buttons
    container.addEventListener('click', function (e) {
      const back = e.target.closest('[data-go-back]');
      if (!back) return;
      e.preventDefault();
      const dest = back.getAttribute('data-go-back') || 'home';
      showScreen(dest);
      currentScreen = dest;
    });

    // Reset to the *mobile-aware* initial when nav closes
    function resetNavToDefault() {
      applyInitial({ focusFirst: false });

      // cosmetic resets (arrows/classes)
      document.querySelectorAll('.dropdown-toggle.open').forEach(t => t.classList.remove('open'));
      // document.querySelectorAll('.rotate-arrow, .flip-arrow').forEach(a => { a.style.transform = 'rotate(0deg)'; });

      if (window.jQuery) {
        jQuery('.about-dropdown, .teachers-dropdown, .modules-dropdown').stop(true, true).hide();
      }
      jQuery('.dropdown-ul').removeClass('is-animating');
    }

    // Watch visibility changes to detect close
    const collapseEl = container;
    function isVisible(el) {
      if (window.jQuery) return jQuery(el).is(':visible');
      const style = getComputedStyle(el);
      return !(style.display === 'none' || style.visibility === 'hidden') && el.offsetParent !== null;
    }
    let wasVisible = isVisible(collapseEl);

    const observer = new MutationObserver(() => {
      const nowVisible = isVisible(collapseEl);
      if (wasVisible && !nowVisible) resetNavToDefault();
      wasVisible = nowVisible;
    });
    observer.observe(collapseEl, { attributes: true, attributeFilter: ['class', 'style'] });
    collapseEl.addEventListener('hidden.bs.collapse', resetNavToDefault);
  });

  // Close desktop nav automatically
  // Auto-close top nav dropdowns at <= 1200px
  (function () {
    const mq = window.matchMedia('(max-width: 1200px)');

    function closeTopDropdowns() {
      // ULs (menus)
      const menus = document.querySelectorAll('.students-dropdown, .teachers-dropdown, .dropdown-ul');
      menus.forEach(m => {
        m.classList.remove('is-animating');
        // jQuery slideUp if available, else hide
        if (window.jQuery) jQuery(m).stop(true, true).slideUp(0);
        m.style.display = 'none';
      });

      // Triggers (links)
      const triggers = document.querySelectorAll('#students-dropdown, #teachers-dropdown');
      triggers.forEach(t => {
        t.classList.remove('open', 'is-open');
        t.setAttribute('aria-expanded', 'false');
      });

      // Reset arrows (both types used in codebase)
      document.querySelectorAll('.rotate-arrow, .flip-arrow').forEach(a => {
        // a.style.transform = 'rotate(0deg)';
        a.classList.remove('is-open');
      });

      // Remove any nav lock class so underline rules aren't suppressed
      const nav = document.querySelector('.module-nav');
      if (nav) nav.classList.remove('nav-locked');
    }

    function onChange(e) {
      if (e.matches) closeTopDropdowns(); // <= 1200px
    }

    // Run now (in case we load on mobile)
    if (mq.matches) closeTopDropdowns();

    // React to crossing the breakpoint
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange); // older browsers
  })();

  $('.chapter-main-icon').on('click', function () {
    $('.mobile-nav').removeClass('nav-locked');
  });

// ===== Mobile arrow sync: arrow up when its dropdown-links are visible =====
$(window).on('load', function () {

  function wireMobileArrow(triggerId) {
    var $trigger = $('#' + triggerId);
    if (!$trigger.length) return;

    // the <li class="nav-item dropdown"> that owns this trigger
    var $parentLi = $trigger.closest('li.nav-item.dropdown');
    if (!$parentLi.length) return;

    // collect the consecutive .dropdown-links that belong to this trigger
    var $group = $();
    var $sib = $parentLi.next();
    while ($sib.length && $sib.hasClass('dropdown-links')) {
      $group = $group.add($sib);
      $sib = $sib.next();
    }
    if (!$group.length) return;

    // the arrow inside: <span class="ml-2 module-arrow mobile-nav-arrow"><img class="flip-arrow"></span>
    var $arrow = $trigger.find('.ml-2.module-arrow.mobile-nav-arrow .flip-arrow');
    if (!$arrow.length) return;

    // helper: set arrow based on whether the group is currently visible
    function syncArrow() {
      var isOpen = $group.first().is(':visible'); // display != none means "open"
      $arrow.css({
        transition: 'transform 0.8s ease',
        transformOrigin: 'center center',
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
      });
    }

    // 1) sync once right after everything else has run
    setTimeout(syncArrow, 0);

    // 2) after each click on the trigger, re-sync once the slide animation has finished
    $trigger.on('click.mobileArrowSync', function () {
      setTimeout(syncArrow, 400);
    });
  }

  // hook up both mobile dropdowns
  wireMobileArrow('mobile-about-dropdown');   // "For Students"
  wireMobileArrow('for-steachers-dropdown');  // "For Teachers"
});

$(document).ready(function() {
    
    const $mobileTriggers = $('#mobile-about-dropdown, #for-steachers-dropdown');

    $mobileTriggers.off('click.arrowToggle').on('click.arrowToggle', function(e) {
        // Prevent default behavior if needed, although the main handler does this
        // e.preventDefault(); 
        
        // Find the specific arrow image within this clicked trigger
        const $arrow = $(this).find('.flip-arrow');

        // Toggle the 'is-open' class on the arrow image itself
        $arrow.toggleClass('is-open');
    });

});
// =======================================



})(jQuery);
