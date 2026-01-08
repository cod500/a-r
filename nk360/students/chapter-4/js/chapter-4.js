$('#popup-toggle').on('click', function () {
  $('.popup').toggle();
})

//Document A Tabs
// Make tabs focusable (if they're not <button>/<a>)
$('.document-paraphrase-wrapper .document-tab, .document-paraphrase-wrapper .paraphrase-tab')
  .attr({ tabindex: 0, role: 'tab' });

// Helper: run only for click OR Enter/Space
function isActivateEvent(e) {
  if (e.type === 'click') return true;
  const k = e.key || e.keyCode;
  const isEnter = k === 'Enter' || k === 13;
  const isSpace = k === ' ' || k === 'Spacebar' || k === 32;
  if (isEnter || isSpace) {
    e.preventDefault();
    return true;
  }
  return false;
}

/* ---------- Document A Tabs ---------- */
$('.document-paraphrase-wrapper .document-tab[data-target="document-a-text"], .document-paraphrase-wrapper .paraphrase-tab[data-target="paraphrase-a-text"]')
  .on('click keydown', function (e) {
    if (!isActivateEvent(e)) return;

    const isDoc = $(this).hasClass('document-tab');

    $(this).addClass('active').siblings().removeClass('active');

    $('#document-a-text').toggle(isDoc);
    $('#paraphrase-a-text').toggle(!isDoc);
    $('#doc-a-divider').toggle(!isDoc);

    $('#left-document-a-content').toggle(isDoc);
    $('#left-paraphrase-a-content').toggle(!isDoc);

    // Find the wrappers - they're siblings within the same parent
    const $imgWrapper = $('#left-document-a-content').closest('.document-img-wrapper');
    const $contentWrapper = $('#document-a-text').closest('.document-paraphrase-wrapper');
    
    if (isDoc) {
      // Original document: 40% and 60%
      $imgWrapper.removeClass('w-50').addClass('w-40');
      $contentWrapper.removeClass('w-50').addClass('w-60');
    } else {
      // Paraphrased: 50% and 50%
      $imgWrapper.removeClass('w-40').addClass('w-50');
      $contentWrapper.removeClass('w-60').addClass('w-50');
    }
  });

/* ---------- Document B Tabs ---------- */
$('.document-paraphrase-wrapper .document-tab[data-target="document-b-text"], .document-paraphrase-wrapper .paraphrase-tab[data-target="paraphrase-b-text"]')
  .on('click keydown', function (e) {
    if (!isActivateEvent(e)) return;

    const isDoc = $(this).hasClass('document-tab');

    $(this).addClass('active').siblings().removeClass('active');

    $('#document-b-text').toggle(isDoc);
    $('#paraphrase-b-text').toggle(!isDoc);
    $('#doc-b-divider').toggle(!isDoc);

    $('#left-document-b-content').toggle(isDoc);
    $('#left-paraphrase-b-content').toggle(!isDoc);


    // Find the wrappers - they're siblings within the same parent
    const $imgWrapper = $('#left-document-b-content').closest('.document-img-wrapper');
    const $contentWrapper = $('#document-b-text').closest('.document-paraphrase-wrapper');
    
    if (isDoc) {
      // Original document: 40% and 60%
      $imgWrapper.removeClass('w-50').addClass('w-40');
      $contentWrapper.removeClass('w-50').addClass('w-60');
    } else {
      // Paraphrased: 50% and 50%
      $imgWrapper.removeClass('w-40').addClass('w-50');
      $contentWrapper.removeClass('w-60').addClass('w-50');
    }
  });

/* ---------- Document C Tabs ---------- */
$('.document-paraphrase-wrapper .document-tab[data-target="document-c-text"], .document-paraphrase-wrapper .paraphrase-tab[data-target="paraphrase-c-text"]')
  .on('click keydown', function (e) {
    if (!isActivateEvent(e)) return;

    const isDoc = $(this).hasClass('document-tab');

    $(this).addClass('active').siblings().removeClass('active');

    $('#document-c-text').toggle(isDoc);
    $('#paraphrase-c-text').toggle(!isDoc);
    $('#doc-c-divider').toggle(!isDoc);

    $('#left-document-c-content').toggle(isDoc);
    $('#left-paraphrase-c-content').toggle(!isDoc);

    // Find the wrappers - they're siblings within the same parent
    const $imgWrapper = $('#left-document-c-content').closest('.document-img-wrapper');
    const $contentWrapper = $('#document-c-text').closest('.document-paraphrase-wrapper');
    
    if (isDoc) {
      // Original document: 40% and 60%
      $imgWrapper.removeClass('w-50').addClass('w-40');
      $contentWrapper.removeClass('w-50').addClass('w-60');
    } else {
      // Paraphrased: 50% and 50%
      $imgWrapper.removeClass('w-40').addClass('w-50');
      $contentWrapper.removeClass('w-60').addClass('w-50');
    }
  });

/* ---------- Document D Tabs ---------- */
$('.document-paraphrase-wrapper .document-tab[data-target="document-d-text"], .document-paraphrase-wrapper .paraphrase-tab[data-target="paraphrase-d-text"]')
  .on('click keydown', function (e) {
    if (!isActivateEvent(e)) return;

    const isDoc = $(this).hasClass('document-tab');

    $(this).addClass('active').siblings().removeClass('active');

    $('#document-d-text').toggle(isDoc);
    $('#paraphrase-d-text').toggle(!isDoc);
    $('#doc-d-divider').toggle(!isDoc); // fixed from #doc-c-divider

    $('#left-document-d-content').toggle(isDoc);
    $('#left-paraphrase-d-content').toggle(!isDoc);

    // Find the wrappers - they're siblings within the same parent
    const $imgWrapper = $('#left-document-d-content').closest('.document-img-wrapper');
    const $contentWrapper = $('#document-d-text').closest('.document-paraphrase-wrapper');
    
    if (isDoc) {
      // Original document: 40% and 60%
      $imgWrapper.removeClass('w-50').addClass('w-40');
      $contentWrapper.removeClass('w-50').addClass('w-60');
    } else {
      // Paraphrased: 50% and 50%
      $imgWrapper.removeClass('w-40').addClass('w-50');
      $contentWrapper.removeClass('w-60').addClass('w-50');
    }
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
appendExpand('#fancy-washington', 'expand-washington', 'Expand Washington image');
appendExpand('#fancy-sullivan',   'expand-sullivan',   'Expand Sullivan image');
appendExpand('#fancy-mariam',     'expand-mariam',     'Expand Mariam image');
appendExpand('#fancy-map',        'expand-map',        'Expand map image');
appendExpand('#fancy-jamison',    'expand-jamison',    'Expand Jamison image');

// make each image link a positioned block with no line-box
$('[id^="fancy-"]').css({ position: 'relative', display: 'block', lineHeight: 0, fontSize: 0 });

// take ONLY those slider-icons out of layout
$('[id^="fancy-"] > .slider-icons').attr(
  'style',
  'position:absolute; right:0px; bottom:0px; margin:0; padding:0; line-height:0; z-index:10;'
);

// prevent global img rules from stretching the small icon
$('[id^="fancy-"] > .slider-icons img').css({ display:'block', width:18, height:18, maxWidth:'none' });

     
     





$(".copy-text-for-print").on("change keyup", function () {
  let textareaId = $(this).attr("id");
  $($("#" + textareaId + "-hidden").val($(this).val()));
});

document.querySelector('#expand-union')?.addEventListener('click', () => {
  document.querySelector('a[data-fancybox="gallery-washington"]')?.click();
});

document.querySelector('#expand-replica')?.addEventListener('click', () => {
  document.querySelector('a[data-fancybox="gallery-sullivan"]')?.click();
});

document.querySelector('#expand-flag')?.addEventListener('click', () => {
  document.querySelector('a[data-fancybox="gallery-mariam"]')?.click();
});

document.querySelector('#expand-bird')?.addEventListener('click', () => {
  document.querySelector('a[data-fancybox="gallery-map"]')?.click();
});

document.querySelector('#expand-jamison')?.addEventListener('click', () => {
  document.querySelector('a[data-fancybox="gallery-jamison"]')?.click();
});

document.querySelector('#expand-sullivan')?.addEventListener('click', () => {
  document.querySelector('a[data-fancybox="gallery-sullivan"]')?.click();
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

bindFancyboxTrigger('#expand-washington', 'gallery-washington');
bindFancyboxTrigger('#expand-sullivan', 'gallery-sullivan');
bindFancyboxTrigger('#expand-map', 'gallery-map');
bindFancyboxTrigger('#expand-mariam', 'gallery-mariam');
bindFancyboxTrigger('#expand-jamison', 'gallery-jamison');

$(".copy-text-for-print").on("change keyup", function () {
  let textareaId = $(this).attr("id");
  $($("#" + textareaId + "-hidden").val($(this).val()));
});

