// Enable Enter (and Space) to toggle the associated checkbox via its label
$(document).on('keydown', '#popup-toggle .BornHS__Label', function (e) {
  const isEnter = e.key === 'Enter' || e.keyCode === 13;
  const isSpace = e.key === ' ' || e.keyCode === 32 || e.code === 'Space';
  if (!isEnter && !isSpace) return;

  e.preventDefault(); // prevent page scroll on Space
  const id = $(this).attr('for');
  if (!id) return;

  const el = document.getElementById(id);
  if (el) el.click(); // triggers the checkbox toggle -> CSS shows/hides modal
});

// Close modal on Enter while focus is on the close label
$(document).on('keydown', '.BornHS__Close', function (e) {
  if (e.key === 'Enter' || e.keyCode === 13) {
    e.preventDefault();
    const id = this.getAttribute('for');
    if (!id) return;
    const input = document.getElementById(id);
    if (input) {
      input.checked = false; // ensure it closes (not just toggle)
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
});

$(function () {
  const $wrap = $('#popup-toggle .BornHS__Wrapper');

  function getOpenId() {
    const $open = $wrap.find('.BornHS__Input:checked');
    return $open.length ? $open.attr('id') : null;
  }

  function focusClose(openId) {
    const $close = $wrap.find(`label.BornHS__Close[for="${openId}"]`);
    if ($close.length) setTimeout(() => $close.focus(), 0);
  }

  function disableBackground(openId) {
    const $labels = $wrap.find('.BornHS__Label');

    // Remove ALL hotspot labels from tab order (including the one clicked)
    $labels.each(function () {
      const $lbl = $(this);
      if (!$lbl.data('prevTab')) $lbl.data('prevTab', $lbl.attr('tabindex') || '0');
      $lbl.attr({ tabindex: '-1', 'aria-hidden': 'true' });
    });

    // Add inert to non-active hotspot groups for robust blocking
    $wrap.find('.BornHS__Modal__Input').each(function () {
      const id = $(this).find('.BornHS__Input').attr('id');
      if (id !== openId) this.setAttribute('inert', '');
      else this.removeAttribute('inert');
    });
  }
  

  function restoreBackground() {
    const $labels = $wrap.find('.BornHS__Label');
    $labels.each(function () {
      const $lbl = $(this);
      const prev = $lbl.data('prevTab');
      $lbl.removeAttr('aria-hidden');
      $lbl.attr('tabindex', prev != null ? prev : '0');
    });
    $wrap.find('.BornHS__Modal__Input').each(function () { this.removeAttribute('inert'); });
  }

  // Focus "guard" — only snaps focus back if it lands on the map background.
  // If focus moves OUTSIDE the map, we allow it (so Tab goes to next page element).
  function bindFocusGuard(openId) {
    $(document)
      .off('.bornhsTrap') // clear old listeners
      .on('focusin.bornhsTrap', function (e) {
        const inWrapper = $(e.target).closest('#popup-toggle .BornHS__Wrapper').length > 0;
        if (!inWrapper) return; // focus moved outside map → allowed

        // Inside the map: allow focus only inside the open modal content or on its close button
        const inModal = $(e.target).closest('.BornHS__Modal__Content').length > 0;
        const isClose = $(e.target).is(`label.BornHS__Close[for="${openId}"]`);
        if (inModal || isClose) return;

        // Focus landed on background (shouldn't be tabbable, but just in case)
        const $close = $wrap.find(`label.BornHS__Close[for="${openId}"]`);
        if ($close.length) setTimeout(() => $close.focus(), 0);
      });
      // NOTE: No keydown handler here — we do NOT block Tab anymore.
  }

  function unbindFocusGuard() {
    $(document).off('.bornhsTrap');
  }

 function applyState() {
  const openId = getOpenId();

  if (openId) {
    // mark wrapper as "a modal is open"
    $wrap.addClass('map-modal-open');

    disableBackground(openId);
    focusClose(openId);
    bindFocusGuard(openId);
  } else {
    // no modal open → labels should come back on top & clickable
    $wrap.removeClass('map-modal-open');

    unbindFocusGuard();
    restoreBackground();
  }
}


  // React when any hotspot checkbox toggles (open/close)
  $wrap.on('change', '.BornHS__Input', applyState);

  // After label/close/overlay clicks, re-check state
  $wrap.on('click', '.BornHS__Label, .BornHS__Close, .BornHS__Overlay', function () {
    setTimeout(applyState, 0);
  });

  // Initialize (covers pre-checked cases)
  applyState();

  // Keep your "close on Enter" for the X
  $(document).on('keydown', '.BornHS__Close', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      e.preventDefault();
      const id = this.getAttribute('for');
      const el = document.getElementById(id);
      if (el) {
        el.checked = false;
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  });
});



// Make tabs keyboard-focusable & announce role
$('.document-paraphrase-wrapper .document-tab, .document-paraphrase-wrapper .paraphrase-tab')
  .attr({ tabindex: 0, role: 'tab' });

// One handler for click + keyboard (Enter/Space)
$(document).on('click keydown', '.document-paraphrase-wrapper .document-tab, .document-paraphrase-wrapper .paraphrase-tab', function (e) {
  // Allow mouse clicks; for keyboard, only act on Enter or Space
  if (e.type === 'keydown') {
    const key = e.key || e.keyCode;
    const isEnter = key === 'Enter' || key === 13;
    const isSpace = key === ' ' || key === 'Spacebar' || key === 32;
    if (!isEnter && !isSpace) return;
    e.preventDefault();
  }

  const $tab = $(this);
  const target = $tab.data('target'); // e.g., "document-b-text" or "paraphrase-c-text"
  // Expecting format: /(document|paraphrase)-([a-c])-text/
  const m = String(target).match(/^(document|paraphrase)-([a-c])-text$/i);
  if (!m) return; // Bail if the expected pattern isn't there

  const kind = m[1].toLowerCase();   // "document" or "paraphrase"
  const grp  = m[2].toLowerCase();   // "a" | "b" | "c"

  // Activate current tab, deactivate siblings within the same tablist
  $tab.addClass('active').siblings().removeClass('active');

  // Build all related IDs for the group
  const docText     = `#document-${grp}-text`;
  const paraText    = `#paraphrase-${grp}-text`;
  const divider     = `#doc-${grp}-divider`;
  const leftDoc     = `#left-document-${grp}-content`;
  const leftPara    = `#left-paraphrase-${grp}-content`;
   const fullWidthDoc = `.document-${grp}-full-width`;
   const sideText = `.document-${grp}-side-text`;

  // Find the wrappers for this document group
  const $imgWrapper = $(`#left-document-${grp}-content`).closest('.document-img-wrapper');
  const $contentWrapper = $(`#document-${grp}-text`).closest('.document-paraphrase-wrapper');

  if (kind === 'document') {
    $(docText).show();
    $(paraText).hide();
    $(divider).hide();

    $(leftDoc).show();
    $(leftPara).hide();
     $(fullWidthDoc).show();
    $(sideText).show();
    $('.side-text-width').css('width', '60%');

    // Original document: 40% and 60%
    $imgWrapper.removeClass('w-50').addClass('w-40');
    $contentWrapper.removeClass('w-50').addClass('w-60');
  } else {
    $(docText).hide();
    $(paraText).show();
    $(divider).show();

    $(leftDoc).hide();
    $(leftPara).show();
    $(fullWidthDoc).hide();
    $(sideText).hide();

    // Paraphrased: 50% and 50%
    $imgWrapper.removeClass('w-40').addClass('w-50');
    $contentWrapper.removeClass('w-60').addClass('w-50');
     $('.side-text-width').css('width', '50%');
  }
});

// Set initial widths on page load (default to document view: 40/60)
$(document).ready(function() {
  ['a', 'b', 'c'].forEach(function(grp) {
    const $imgWrapper = $(`#left-document-${grp}-content`).closest('.document-img-wrapper');
    const $contentWrapper = $(`#document-${grp}-text`).closest('.document-paraphrase-wrapper');
    
    // Set to document view (40/60) by default
    $imgWrapper.removeClass('w-50').addClass('w-40');
    $contentWrapper.removeClass('w-50').addClass('w-60');
  });
});


// helper to append one icon overlay
function appendExpand(anchorId, expandId, ariaLabel) {
  const $a = $(anchorId);
  if (!$a.length) return;

  // make sure the anchor’s parent can position the overlay
  const $wrap = $a.parent();
  if ($wrap.css('position') === 'static') $wrap.css('position', 'relative');

  const overlay = `
    <div class="slider-icons">
      <div class="slider-div-expand border border-dark"
           id="${expandId}"
           role="button"
           tabindex="0"
           aria-label="${ariaLabel}" title="Expand image">
        <img class="slider-btn slider-btn-expand"
             src="/nk360/american-revolution-perseverance/assets/images/dark-expand_content.svg"
             alt="Expand image">
      </div>
      <div class="chapter-main-icon"
           data-image="${expandId}"
           aria-expanded="false"
           style="right: 48px">
        <img src="/nk360/american-revolution-perseverance/assets/images/info_white.svg"
             alt="More information"
             class="info-icon" title="Show caption">
      </div>
    </div>
  `;

  $a.after(overlay);
}

// Use unique ids per control (avoid duplicate #timeline-img-1)
appendExpand('#fancy-mary', 'expand-mary', 'Expand mary image');
appendExpand('#fancy-john',  'expand-john', 'Expand replica image');
appendExpand('#fancy-gilbert',  'expand-gilbert', 'Expand gilbert image');


// make each image link a positioned block with no line-box
$('[id^="fancy-"]').css({ position: 'relative', display: 'block', lineHeight: 0, fontSize: 0 });

// take ONLY those slider-icons out of layout
$('[id^="fancy-"] > .slider-icons').attr(
  'style',
  'position:absolute; right:0px; bottom:0px; margin:0; padding:0; line-height:0; z-index:10;'
);

// prevent global img rules from stretching the small icon
$('[id^="fancy-"] > .slider-icons img').css({ display:'block', width:18, height:18, maxWidth:'none' });


document.querySelector('#expand-mary')?.addEventListener('click', () => {
  document.querySelector('a[data-fancybox="gallery-mary"]')?.click();
});

document.querySelector('#expand-john')?.addEventListener('click', () => {
  document.querySelector('a[data-fancybox="gallery-john"]')?.click();
});

document.querySelector('#expand-gilbert')?.addEventListener('click', () => {
  document.querySelector('a[data-fancybox="gallery-gilbert"]')?.click();
});



function bindFancyboxTrigger(expandId, galleryName) {
  const expandEl = document.querySelector(expandId);
  const anchorEl = document.querySelector(`a[data-fancybox="${galleryName}"]`);

  if (expandEl && anchorEl) {
    // Mouse click
    expandEl.addEventListener('click', () => {
      anchorEl.click();
    });

    // Keyboard (Enter or Space)
    expandEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopImmediatePropagation(); // Prevent Fancybox from hijacking
        anchorEl.click();
      }
    });
  }
}

bindFancyboxTrigger('#expand-mary', 'gallery-mary');
bindFancyboxTrigger('#expand-john', 'gallery-john');
bindFancyboxTrigger('#expand-gilbert', 'gallery-gilbert');

$(".copy-text-for-print").on("change keyup", function () {
  let textareaId = $(this).attr("id");
  $($("#" + textareaId + "-hidden").val($(this).val()));
});






