$('#popup-toggle').on('click', function () {
  $('.popup').toggle();
})

//Document A Tabs
// Document B Tabs
$('.document-paraphrase-wrapper .document-tab[data-target="document-a-text"]').on('click', function() {
  $(this).addClass('active').siblings().removeClass('active');

  $('#document-a-text').show();
  $('#paraphrase-a-text').hide();
  $('#doc-a-divider').hide();

  $('#left-document-a-content').show();
  $('#left-paraphrase-a-content').hide();
});

$('.document-paraphrase-wrapper .paraphrase-tab[data-target="paraphrase-a-text"]').on('click', function() {
  $(this).addClass('active').siblings().removeClass('active');

  $('#document-a-text').hide();
  $('#paraphrase-a-text').show();
  $('#doc-a-divider').show();

  $('#left-document-a-content').hide();
  $('#left-paraphrase-a-content').show();
});

// Document B Tabs
$('.document-paraphrase-wrapper .document-tab[data-target="document-b-text"]').on('click', function() {
  $(this).addClass('active').siblings().removeClass('active');

  $('#document-b-text').show();
  $('#paraphrase-b-text').hide();
  $('#doc-b-divider').hide();

  $('#left-document-b-content').show();
  $('#left-paraphrase-b-content').hide();
});

$('.document-paraphrase-wrapper .paraphrase-tab[data-target="paraphrase-b-text"]').on('click', function() {
  $(this).addClass('active').siblings().removeClass('active');

  $('#document-b-text').hide();
  $('#paraphrase-b-text').show();
   $('#doc-b-divider').show();

  $('#left-document-b-content').hide();
  $('#left-paraphrase-b-content').show();
});

// Document C Tabs
$('.document-paraphrase-wrapper .document-tab[data-target="document-c-text"]').on('click', function() {
  $(this).addClass('active').siblings().removeClass('active');

  $('#document-c-text').show();
  $('#paraphrase-c-text').hide();
  $('#doc-c-divider').hide();

  $('#left-document-c-content').show();
  $('#left-paraphrase-c-content').hide();
});

$('.document-paraphrase-wrapper .paraphrase-tab[data-target="paraphrase-c-text"]').on('click', function() {
  $(this).addClass('active').siblings().removeClass('active');

  $('#document-c-text').hide();
  $('#paraphrase-c-text').show();
   $('#doc-c-divider').show();

  $('#left-document-c-content').hide();
  $('#left-paraphrase-c-content').show();
});

// Document D Tabs
$('.document-paraphrase-wrapper .document-tab[data-target="document-d-text"]').on('click', function() {
  $(this).addClass('active').siblings().removeClass('active');

  $('#document-d-text').show();
  $('#paraphrase-d-text').hide();
  $('#doc-d-divider').hide();

  $('#left-document-d-content').show();
  $('#left-paraphrase-d-content').hide();
});

$('.document-paraphrase-wrapper .paraphrase-tab[data-target="paraphrase-d-text"]').on('click', function() {
  $(this).addClass('active').siblings().removeClass('active');

  $('#document-d-text').hide();
  $('#paraphrase-d-text').show();
   $('#doc-c-divider').show();

  $('#left-document-d-content').hide();
  $('#left-paraphrase-d-content').show();
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
           style="right: 48px" title="Show caption">
        <img src="/nk360/american-revolution-perseverance/assets/images/info_white.svg"
             alt="More information"
             class="info-icon">
      </div>
    </div>
  `;

  $a.after(overlay);
}

// Use unique ids per control (avoid duplicate #timeline-img-1)
appendExpand('#fancy-map-1', 'expand-map-1', 'Expand map');
appendExpand('#fancy-map-2', 'expand-map-2', 'Expand map');
appendExpand('#fancy-map-3', 'expand-map-3', 'Expand map');
appendExpand('#fancy-map-4', 'expand-map-4', 'Expand map');
appendExpand('#fancy-map-5', 'expand-map-5', 'Expand map');
appendExpand('#fancy-map-6', 'expand-map-6', 'Expand map');
appendExpand('#fancy-map-7', 'expand-map-7', 'Expand map');
appendExpand('#fancy-map-8', 'expand-map-8', 'Expand map');

// make each image link a positioned block with no line-box
$('[id^="fancy-"]').css({ position: 'relative', display: 'block', lineHeight: 0, fontSize: 0 });

// take ONLY those slider-icons out of layout
$('[id^="fancy-"] > .slider-icons').attr(
  'style',
  'position:absolute; right:0px; bottom:0px; margin:0; padding:0; line-height:0; z-index:10;'
);

// prevent global img rules from stretching the small icon
$('[id^="fancy-"] > .slider-icons img').css({ display:'block', width:18, height:18, maxWidth:'none' });


// ----- Click + keyboard (Enter/Space) open the matching fancy link -----
for (let i = 1; i <= 7; i++) {
  const expandSel = `#expand-map-${i}`;
  const linkSel   = `#fancy-map-${i}`;

  $(document).on('click', expandSel, function (e) {
    e.preventDefault();
    $(linkSel).get(0)?.click();
  });

  $(document).on('keydown', expandSel, function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      $(linkSel).get(0)?.click();
    }
  });
}



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


// Challenge / Act of Perseverance -> write into #challenge-or-act-N
$(document).on('change', '.challenge-check-box.copy-checkbox-for-print', function () {
  const m = this.id.match(/^(challenge|act)-(\d+)$/);
  if (!m) return;

  const kind = m[1];
  const n = m[2];

  const $other = $('#' + (kind === 'challenge' ? 'act-' : 'challenge-') + n);
  const $out = $('#challenge-or-act-' + n);

  if (this.checked) {
    $other.prop('checked', false);
    $out.text(kind === 'challenge' ? 'Challenge' : 'Act of Perseverance');
  } else {
    // if user unchecked it and the other isn't checked, clear output
    const anyChecked = $('#challenge-' + n).is(':checked') || $('#act-' + n).is(':checked');
    if (!anyChecked) $out.text('');
  }
});





//Audio tabbing order
  (function () {
  function fixOnePlayer(player) {
    const controller = player.querySelector('.able-controller');
    if (!controller) return;

    const row   = controller.querySelector('.able-control-row');
    const left  = controller.querySelector('.able-left-controls');
    const right = controller.querySelector('.able-right-controls');
    const seek  = controller.querySelector('.able-seekbar-wrapper');

    // AUDIO: ensure Play comes before Seek in tab order by moving the seekbar
    if (player.classList.contains('able-audio') &&
        player.closest('.custom-audio-white') && row && left && seek) {
      // place seekbar inside the control row, right after the left controls
      if (seek.parentElement !== row || left.nextSibling !== seek) {
        row.insertBefore(seek, right || null);
      }
      // normalize seekbar head tabindex
      const head = seek.querySelector('.able-seekbar-head');
      if (head) head.tabIndex = 0;
    }

    // VIDEO: force Volume to be last on the right
    if (player.classList.contains('able-video') && right) {
      const vol = right.querySelector('.able-button-handler-volume');
      if (vol && vol !== right.lastElementChild) {
        right.appendChild(vol);
      }
    }
  }

  function fixAllPlayers() {
    document.querySelectorAll('.able-player').forEach(fixOnePlayer);
  }

  // Run after load (covers most cases)
  window.addEventListener('load', fixAllPlayers);

  // Also watch for AblePlayer rebuilding its UI
  const mo = new MutationObserver(() => fixAllPlayers());
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();