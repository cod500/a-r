window.addEventListener('load', function () {
  var container = document.getElementById('navbarSupportedContent');
  if (!container) return;

  // Helper: open the consecutive .dropdown-links that belong to a trigger
  function openGroupFor(triggerId) {
    var trigger = document.getElementById(triggerId);
    if (!trigger) return;

    var parentLI = trigger.closest('li.nav-item.dropdown');
    if (!parentLI) return;

    var group = [], sib = parentLI.nextElementSibling;
    while (sib && sib.classList && sib.classList.contains('dropdown-links')) {
      group.push(sib);
      sib = sib.nextElementSibling;
    }
    if (!group.length) return;

    if (window.jQuery) {
      window.jQuery(group).stop(true, true).slideDown(180);
    } else {
      group.forEach(function (el) { el.style.display = 'block'; });
    }

    var arrow = trigger.querySelector('.flip-arrow');
    if (arrow) arrow.classList.add('is-open');
    trigger.classList.add('open'); // if you style based on this class
  }

  // 1) Make sure TEACHERS looks closed (arrow/etc.)
  var teacherTrig = document.getElementById('for-steachers-dropdown');
  if (teacherTrig) {
    var tArrow = teacherTrig.querySelector('.flip-arrow');
    if (tArrow) tArrow.classList.remove('is-open');
    teacherTrig.classList.remove('open');
    // groups already hidden by CSS baseline
  }

  // 2) Open STUDENTS group
  openGroupFor('mobile-about-dropdown');
});

    // Set arrow state
  var arrow = trigger.querySelector('.flip-arrow');
  if (arrow) arrow.classList.add('is-open');
