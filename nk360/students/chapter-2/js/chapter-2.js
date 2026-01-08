//Document A Tabs
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
  const target = $tab.data('target');
  const m = String(target).match(/^(document|paraphrase)-([a-c])-text$/i);
  if (!m) return; 

  const kind = m[1].toLowerCase();   
  const grp  = m[2].toLowerCase();  

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
    $('.quote-two-col').hide();
    $('.side-text-width').css('width', '60%');

    // Original document: 40% and 60%
    $imgWrapper.removeClass('w-50').addClass('w-40');
    $contentWrapper.removeClass('w-50').addClass('w-60');
  } else {
    const mq = window.matchMedia('(min-width: 1201px)');

    if (grp === 'c' && mq.matches) {
      $('.quote-two-col').css('display', 'flex');
    } else {
      $('.quote-two-col').hide();
    }
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

  const mq = window.matchMedia('(max-width: 1200px)');

  function syncQuoteTwoCol() {
    if (mq.matches) {
      $('.quote-two-col').hide();
      return;
    }

    const docTabActive = $('.tab.document-tab[data-target="document-c-text"]').hasClass('active');

    if (!docTabActive) {
      $('.quote-two-col').css('display', 'flex');
    } else {
      $('.quote-two-col').hide();
    }
  }

  syncQuoteTwoCol();

  mq.addEventListener('change', syncQuoteTwoCol);

  // run this after your tab-click logic too (or hook into it)
  $(document).on('click keydown', '.tab.document-tab[data-target="document-c-text"], .tab.paraphrase-tab[data-target="paraphrase-c-text"]', function () {
    setTimeout(syncQuoteTwoCol, 0);
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
           aria-label="${ariaLabel}"
           title="Expand image">
        <img class="slider-btn slider-btn-expand"
             src="/nk360/american-revolution-perseverance/assets/images/dark-expand_content.svg"
             alt="Expand image">
      </div>
      <div class="chapter-main-icon"
           data-image="${expandId}"
            role="button"
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
appendExpand('#fancy-union', 'expand-union', 'Expand union image');
appendExpand('#fancy-replica',   'expand-replica', 'Expand replica image');
appendExpand('#fancy-flag',     'expand-flag', 'Expand flag image');
appendExpand('#fancy-bird',        'expand-bird', 'Expand bird image');
appendExpand('#fancy-jack', 'expand-jack', 'Expand union jack image');
appendExpand('#fancy-neutrality', 'expand-neutrality', 'Expand Haudenosaunee leaders image');
appendExpand('#fancy-gilbert', 'expand-gilbert', 'Expand Gilbert Stuart image');
appendExpand('#fancy-john', 'expand-john', 'Expand John Kahionhes Fadden image');
appendExpand('#fancy-declaration', 'expand-declaration', 'Expand Highlighted text in the Declaration of Independence image');
appendExpand('#fancy-capitol', 'expand-capitol', 'Expand John Trumbull (1756–1843). The Declaration of Independence image');
appendExpand('#fancy-capitol-2', 'expand-capitol-2', 'Expand John Trumbull (1756–1843). The Declaration of Independence image');








// make each image link a positioned block with no line-box
$('[id^="fancy-"]').css({ position: 'relative', display: 'block', lineHeight: 0, fontSize: 0 });

// take ONLY those slider-icons out of layout
$('[id^="fancy-"] > .slider-icons').attr(
  'style',
  'position:absolute; right:0px; bottom:0px; margin:0; padding:0; line-height:0; z-index:10;'
);

// prevent global img rules from stretching the small icon
$('[id^="fancy-"] > .slider-icons img').css({ display:'block', width:18, height:18, maxWidth:'none' });


  
document.querySelector('#expand-union')?.addEventListener('click', () => {
  document.querySelector('a[data-fancybox="gallery-union"]')?.click();
});

document.querySelector('#expand-replica')?.addEventListener('click', () => {
  document.querySelector('a[data-fancybox="gallery-replica"]')?.click();
});

document.querySelector('#expand-flag')?.addEventListener('click', () => {
  document.querySelector('a[data-fancybox="gallery-flag"]')?.click();
});

document.querySelector('#expand-bird')?.addEventListener('click', () => {
  document.querySelector('a[data-fancybox="gallery-bird"]')?.click();
});

$(document).ready(function() {
  appendExpand('#fancy-map', 'expand-map', 'Expand map image');

  bindFancyboxTrigger('#expand-map', 'gallery-map');
});

$(document).ready(function() {
  appendExpand('#fancy-map-2', 'expand-map', 'Expand map image');

  bindFancyboxTrigger('#expand-map-2', 'gallery-map');
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

bindFancyboxTrigger('#expand-union', 'gallery-union');
bindFancyboxTrigger('#expand-replica', 'gallery-replica');
bindFancyboxTrigger('#expand-flag', 'gallery-flag');
bindFancyboxTrigger('#expand-bird', 'gallery-bird');


function initVocabTooltips(container = document) {
  const globalAudio = new Audio();
  globalAudio.preload = 'auto';
  let currentWrapper = null;

  container.querySelectorAll('.vocab-wrapper, .audio-wrapper').forEach(wrapper => {
        if (wrapper.classList.contains('vocab-wrapper')) {
      wrapper.setAttribute('role', 'button');
      const vocabText = wrapper.querySelector('.vocab')?.textContent;
      if (vocabText) {
        wrapper.setAttribute('aria-label', `Definition of ${vocabText}`);
      }
    }
    if (wrapper.classList.contains('audio-wrapper')) {
      wrapper.setAttribute('role', 'button');
      const audioText = wrapper.textContent.trim();
      wrapper.setAttribute('aria-label', `Play audio pronunciation of ${audioText}`);
    }
    // ===== Audio Setup =====
    const src = wrapper.dataset.audioSrc;
    const icon = wrapper.querySelector('.audio-icon');
    if (src && icon) {
      const ICONS = {
        default: '/nk360/american-revolution-perseverance/assets/images/volume_up.png',
        hover: '/nk360/american-revolution-perseverance/assets/images/volume_up_filled.svg',
        playing: '/nk360/american-revolution-perseverance/assets/images/volume_off.svg'
      };

      const isChapterReview = wrapper.closest('#chapter-review');
      const COLORS = isChapterReview
        ? { default: '#96B8DC', hover: '#81A9D5' }
        : { default: '#2B5582', hover: '#24476D' };

      // Initialize
      icon.dataset.state = 'default';
      icon.src = ICONS.default;
      wrapper.style.color = COLORS.default;

      const fadeIcon = (newSrc) => {
        icon.style.opacity = 0;
        setTimeout(() => {
          icon.src = newSrc;
          icon.style.opacity = 1;
        }, 150);
      };

      // Hover only visual
      wrapper.addEventListener('mouseenter', () => {
        if (!wrapper.classList.contains('playing')) {
          fadeIcon(ICONS.hover);
          wrapper.style.color = COLORS.hover;
        }
      });
      wrapper.addEventListener('mouseleave', () => {
        if (!wrapper.classList.contains('playing')) {
          fadeIcon(ICONS.default);
          wrapper.style.color = COLORS.default;
        }
      });

      // Click toggles audio
      wrapper.addEventListener('click', async (e) => {
        e.preventDefault();
        if (wrapper.classList.contains('playing')) {
          globalAudio.pause();
          globalAudio.currentTime = 0;
          wrapper.classList.remove('playing');
          fadeIcon(ICONS.default);
          wrapper.style.color = COLORS.default;
          currentWrapper = null;
          return;
        }

        // Stop previous audio
        if (currentWrapper && currentWrapper !== wrapper) {
          const prevIcon = currentWrapper.querySelector('.audio-icon');
          prevIcon.src = ICONS.default;
          currentWrapper.style.color = COLORS.default;
          currentWrapper.classList.remove('playing');
          globalAudio.pause();
          globalAudio.currentTime = 0;
        }

        // Play new audio
        currentWrapper = wrapper;
        globalAudio.src = src;
        try {
          await globalAudio.play();
          wrapper.classList.add('playing');
          fadeIcon(ICONS.playing);
          wrapper.style.color = COLORS.default;
        } catch (err) {
          console.warn('Playback failed:', err);
        }
      });
    }
  });

  // Reset wrapper when audio ends
  globalAudio.addEventListener('ended', () => {
    if (!currentWrapper) return;
    const icon = currentWrapper.querySelector('.audio-icon');
    const isChapterReview = currentWrapper.closest('#chapter-review');
    const COLORS = isChapterReview
      ? { default: '#96B8DC' }
      : { default: '#2B5582' };

    currentWrapper.classList.remove('playing');
    icon.dataset.state = 'default';
    currentWrapper.style.color = COLORS.default;
    icon.src = '/nk360/american-revolution-perseverance/assets/images/volume_up.png';
    currentWrapper = null;
  });

}








