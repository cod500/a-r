$(document).ready(function () {
  $('#elements').children('img[src=""], img:not([src])').remove();

  // ----- Fancybox -----
  $('[data-fancybox]').fancybox({
    wheel: false,
    transitionEffect: "slide",
    loop: true,
    toolbar: true,
    clickContent: false,
     idleTime: false, // <— keep icons visible
  });

  // ----- overlay controls OUTSIDE the anchor -----
  $('.img-bank-item a.slider-map[data-fancybox]').each(function () {
    const $a = $(this);
    const $img = $a.find('img[id^="bank-"]');
    const imageId = ($img.attr('id') || '').replace(/^bank-/, ''); // e.g. img-1-photo
    if (!imageId) return;

    const overlay = $(`
      <div class="img-bank-icons" aria-hidden="false">
        <button type="button" class="select-image-div" data-image-id="${imageId}" tabindex="0" aria-label="Add image" title="Add image">
          <img class="select-image" src="/nk360/american-revolution-perseverance/assets/images/white-add.svg" alt="">
        </button>
        <div class="img-bank-expand" tabindex="0" role="button" aria-label="Expand image" title="Expand image">
          <img src="/nk360/american-revolution-perseverance/assets/images/white-expand.svg" alt="">
        </div>
      </div>
    `);

    $a.after(overlay);
  });

  // ----- Selection state -----
  let count = 0;
  const MAX_SELECTED = 5;

  // toggle 3-col vs 5-col by real DOM count
function updateCollageColumns() {
  $('#elements').removeClass('collage-3').addClass('collage-5');
}

  updateCollageColumns(); 

  function getImageIdFromTile($tile) {
    const classes = ($tile.attr('class') || '').split(/\s+/);
    const match = classes.find(c => /^img-.*-photo$/.test(c));
    if (match) return match;
    const childId = ($tile.find('img[id^="bank-"]').attr('id') || '').replace(/^bank-/, '');
    return childId || null;
  }

  function isAlreadyChosen(imageId) {
    const faded = $(`.${imageId}`).css('opacity') === '0.5';
    const disabledById = $('#' + imageId).is(':disabled');
    const disabledByData = $(`[data-image-id="${imageId}"]`).is(':disabled');
    return faded || disabledById || disabledByData || $(`#selected-${imageId}`).length > 0;
  }

  function markChosen(imageId) {
    $(`.${imageId}`).css('opacity', '0.5');
    $(`[data-image-id="${imageId}"]`).prop('disabled', true);
    $('#' + imageId).prop('disabled', true);
  }

  function addElement(imageId) {
    if (count >= MAX_SELECTED || isAlreadyChosen(imageId)) return;

    markChosen(imageId);
    count += 1;

    const imgSource = $(`#bank-${imageId}`).attr('src');

    $("#elements").append(`
      <div class='selected-img-bank-item' id='selected-${imageId}'>
        <div class="img-frame">
          <img class='img-bank-height' src='${imgSource}' alt="">
          <div class='close-img-div' data-selected-img='${imageId}' tabindex="0" aria-label="Remove image" title="Remove image">
            <img class='deselect-image' src='/nk360/american-revolution-perseverance/assets/images/close_dark.png' alt="">
          </div>
        </div>
      </div>
    `);

    updateCollageColumns();
  }

  function deleteELement(e, item) {
    e.preventDefault();

    const $close = $(item);
    const parentId = $close.attr('data-selected-img');

    // restore source state
    $(`.${parentId}`).css('opacity', '1');
    $('#' + parentId).prop('disabled', false);
    $(`[data-image-id="${parentId}"]`).prop('disabled', false);

    // remove the whole selected tile so layout collapses correctly
    $close.closest('.selected-img-bank-item').fadeOut(200, function () {
      $(this).remove();
      count = Math.max(0, count - 1);
      updateCollageColumns();
    });
  }

  // ----- ADD  -----
  $(document).on('click', '.select-image-div', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const imageId = $(this).data('image-id');
    if (!imageId) return;
    addElement(imageId);
  });

  $(document).on('keydown', '.select-image-div', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      const imageId = $(this).data('image-id');
      if (!imageId) return;
      addElement(imageId);
    }
  });

  // ----- EXPAND -----
  $(document).on('click', '.img-bank-expand', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const a = $(this).closest('.img-bank-item').find('a[data-fancybox]')[0];
    if (a) a.click();
  });

  $(document).on('keydown', '.img-bank-expand', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      const a = $(this).closest('.img-bank-item').find('a[data-fancybox]')[0];
      if (a) a.click();
    }
  });

  // ----- DELETE handlers -----
  $("#elements").on("click", ".close-img-div", function (e) {
    deleteELement(e, this);
  });

  $("#elements").on("keydown", ".close-img-div", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopImmediatePropagation();
      deleteELement(e, this);
    }
  });

  // ----- Clear all -----
  $('#clearAll').on('click', function () {
    $('#elements').empty();
    count = 0;
    $('[data-image-id]').prop('disabled', false);
    $('.img-bank-item').css('opacity', '1');
    $('.img-bank-item [id^="img-"]').prop('disabled', false);
    updateCollageColumns();
  });

  // ----- Native Drag & Drop -----
  const DRAG_TARGETS = '.img-bank-item, .img-bank-item a.slider-map, .img-bank-item img';
  $(DRAG_TARGETS).attr('draggable', true);

  let dragged = false;

  $(document).on('dragstart', DRAG_TARGETS, function (e) {
    const $tile = $(this).closest('.img-bank-item');
    const id = getImageIdFromTile($tile);
    if (!id) return;

    dragged = true;

    const dt = e.originalEvent.dataTransfer;
    dt.effectAllowed = 'copy';
    dt.setData('text/plain', id);

    const imgEl = $tile.find('img[id^="bank-"]')[0] || $tile.find('img').get(0);
    if (imgEl && dt.setDragImage) {
      dt.setDragImage(imgEl, imgEl.width / 2, imgEl.height / 2);
    }
  });

  // Suppress anchor click (Fancybox) immediately after a drag
  $(document).on('click', '.img-bank-item a.slider-map', function (e) {
    if (dragged) {
      e.preventDefault();
      dragged = false;
    }
  });

  const $drop = $('#elements');

  $drop.on('dragover', function (e) {
    e.preventDefault();
    this.classList.add('drop-hover'); 
    e.originalEvent.dataTransfer.dropEffect = 'copy';
  });

  $drop.on('dragleave', function () {
    this.classList.remove('drop-hover');
  });

  $drop.on('drop', function (e) {
    e.preventDefault();
    this.classList.remove('drop-hover');
    const id = e.originalEvent.dataTransfer.getData('text/plain');
    if (!id) return;
    addElement(id); 
  });
});


// $(function () {
//   const $bank = $('#elements');
//   if (!$bank.length || $('#collage-rail').length) return;

//   // build the list
//   const $ol = $('<ol>', {
//     id: 'collage-rail',
//     class: 'discussion-question-list collage-rail w-100',
//     start: 2
//   }).append(
//     $('<li>', {
//       class: 'collage-question w-75',
//       text: 'What does each image you selected represent about Haudenosaunee lifeways in the 1770s?'
//     })
//   );

//   // attach it *inside* the bank (so it inherits the same rail)
//   $bank.append($ol);

//   // reserve space below the bank so the absolutely-positioned list doesn’t overlap later content
//   function reserveSpace() {
//     const h = $ol.outerHeight(true) || 0;
//     $bank.css('padding-bottom', (h + 16) + 'px'); // 16px breathing room
//   }
//   reserveSpace();

//   // recalc on resize / font load / image load
//   let t;
//   const debounced = () => { clearTimeout(t); t = setTimeout(reserveSpace, 80); };
//   $(window).on('resize orientationchange', debounced);
//   if (document.fonts && document.fonts.ready) document.fonts.ready.then(reserveSpace);
//   $bank.on('load', 'img', debounced);
// });
