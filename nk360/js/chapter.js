$(document).ready(function () {


    // Init fancyBox
    $("[data-fancybox]").fancybox({
      // Options will go here
      wheel: false,
      transitionEffect: "slide",
      // thumbs          : false,
      // hash            : false,
      loop: false,
      // keyboard        : true,
      buttons: [
        "zoom",
        "close"
    ],
      // animationEffect : false,
      // arrows          : true,
      idleTime: false, // <— keep icons visible
      clickContent: false,
      afterLoad: function (instance, current) {
        current.$image.attr("alt", current.opts.$orig.find("img").attr("alt"));
      },
    });

  

    $('.slider-btn-expand').on('click', function () {
        let imgId = $(this).attr('id');
        alert(imgId)
        $(`img#${imgId}-photo`).trigger('click');

    })

    // Event listener for the div with tabindex="0"
    $('div.slider-div-expand').on('keydown', function(event) {
        let imgId = $(this).find('img.slider-btn-expand').attr('id');
      if (event.key === "Enter" || event.keyCode === 13) {
        $(`img#${imgId}-photo`).trigger('click');
      }
    });

    // //Downloads current image

    // Must use FileSaver.js 2.0.2 because 2.0.3 has issues.
    $('.slider-btn-download').on('click', function () {
        let imageId = $(this).attr('id');
        let img = document.querySelector(`img.${imageId}`);
        let imagePath = img.getAttribute('src');
        let fileName = getFileName(imagePath);
        saveAs(imagePath, fileName);
    });

    function getFileName(str) {
        return str.substring(str.lastIndexOf('/') + 1)
    }

    $('div.slider-download-div').on('keydown', function(event) {
        let imageId = $(this).find('img.slider-btn-download').attr('id');
      if (event.key === "Enter" || event.keyCode === 13) {
        let img = document.querySelector(`img.${imageId}`);
        let imagePath = img.getAttribute('src');
        let fileName = getFileName(imagePath);
        saveAs(imagePath, fileName);
      }
    });


// Helper: enable/disable focusability inside a panel
function setPanelFocusable(panel, enabled) {
  // Prefer the inert attribute (supported in modern browsers)
  if ('inert' in panel) {
    panel.inert = !enabled;
  } else {
    // Fallback: manage tabindex for focusable elements
    const focusables = panel.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusables.forEach(el => {
      if (enabled) {
        const prev = el.dataset.prevTabindex;
        if (prev === undefined || prev === '') el.removeAttribute('tabindex');
        else el.setAttribute('tabindex', prev);
        delete el.dataset.prevTabindex;
      } else {
        if (!el.dataset.prevTabindex) {
          el.dataset.prevTabindex = el.getAttribute('tabindex') ?? '';
        }
        el.setAttribute('tabindex', '-1');
      }
    });
  }
  panel.setAttribute('aria-hidden', enabled ? 'false' : 'true');
}

document.querySelectorAll('.accordion-item').forEach((item, i) => {
  const header = item.querySelector('.accordion-header');
  const content = item.querySelector('.accordion-content');
  const arrow   = header.querySelector('.accordion-arrow');

  // Make the header keyboard-activatable + ARIA wiring
  header.setAttribute('tabindex', '0');
  header.setAttribute('role', 'button');
  header.setAttribute('aria-expanded', 'false');
  const panelId = `acc-panel-${i}`;
  content.id = panelId;
  header.setAttribute('aria-controls', panelId);
  content.setAttribute('role', 'region');

  // Start collapsed: no tab into content
  content.style.maxHeight = null;
  setPanelFocusable(content, false);

  function isOpen(){ return header.classList.contains('active'); }

  function open() {
    header.classList.add('active');
    header.setAttribute('aria-expanded', 'true');
    arrow.style.transform = 'rotate(-180deg)';
    content.style.maxHeight = content.scrollHeight + 'px';
    setPanelFocusable(content, true);
  }

  function close() {
    header.classList.remove('active');
    header.setAttribute('aria-expanded', 'false');
    arrow.style.transform = 'rotate(0deg)';
    content.style.maxHeight = null;
    setPanelFocusable(content, false);
    // If focus was inside, return it to the header
    if (content.contains(document.activeElement)) header.focus();
  }

  function toggle(){ isOpen() ? close() : open(); }

  header.addEventListener('click', toggle);
  header.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    else if (e.key === 'ArrowDown' && !isOpen()) { e.preventDefault(); open(); }
    else if (e.key === 'ArrowUp' && isOpen())    { e.preventDefault(); close(); }
    else if (e.key === 'Escape' && isOpen())     { e.preventDefault(); close(); }
  });
});


function setAccordionState(expand = true) {
  $('.accordion-item').each(function () {
    const header = $(this).find('.accordion-header')[0];
    const content = $(this).find('.accordion-content')[0];
    const arrow = $(header).find('.accordion-arrow')[0];

    if (expand) {
      if (!$(header).hasClass('active')) {
        $(header).addClass('active');
        header.setAttribute('aria-expanded', 'true');
        arrow.style.transform = 'rotate(-180deg)';
        content.style.maxHeight = content.scrollHeight + 'px';
        setPanelFocusable(content, true);
      }
    } else {
      if ($(header).hasClass('active')) {
        $(header).removeClass('active');
        header.setAttribute('aria-expanded', 'false');
        arrow.style.transform = 'rotate(0deg)';
        content.style.maxHeight = null;
        setPanelFocusable(content, false);
        if (content.contains(document.activeElement)) header.focus();
      }
    }
  });
}

// Single toggle button
$('#expand-all')
  .attr({ tabindex: 0, role: 'button' })
  .on('click keydown', function(e) {
    if (e.type === 'click' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();

      // Check if any accordion is closed
      const anyClosed = $('.accordion-item .accordion-header')
        .toArray()
        .some(h => h.getAttribute('aria-expanded') === 'false');

      // If any are closed, expand all; otherwise collapse all
      setAccordionState(anyClosed);

      //  Update button text
      $(this).text(anyClosed ? 'Close All' : 'Expand All');
    }
  });

const tooltipById = {
  "chapter-1-main-image": "American Revolution: Haudenosaunee Perseverance <br>© Smithsonian National Museum of the American Indian, 2024",
  "chapter-2-main-image": "<em>Independence Hall</em> by John Kahiones Fadden",
  "chapter-3-main-image": "American Revolution: Haudenosaunee Perseverance <br>© Smithsonian National Museum of the American Indian, 2024 Ganondagan State Historic Site, Victor, NY",
  "chapter-3-map-image": "Doug Stevens/Flyboy Graphics © 2024 National Museum of the American Indian<br><br><em>This map is for educational purposes made with Native scholarship, to provide a representation of political boundaries and locations at a certain point in time.</em>",
  "chapter-4-main-image": "<em>Sullivan's Campaign</em>, watercolor by Ernest Smith (Tonawanda Seneca, Heron Clan), 1936. Courtesy of the RMSC. Rochester, NY",
  "chapter-5-main-image": "Replica of the Hiawatha belt, National Museum of the American Indian 26/9056",
   "chapter-sum-main-image": "Treaty of Canandaigua, 2014 Alex Hamer Photo",
     "expand-jack":"Union Jack Flag, iStock by Getty Images/Kajdi Szabolcs",
   "expand-replica":"Replica of the Hiawatha wampum belt, ca,<br> 1990–2010. Polymer clay beads, imitation sinew.<br> 72 x 14 x .5 cm. National Museum of the<br> American Indian 26/9056",
   "expand-bird":"Charles Bird King (1785–1862). <em>Red Jacket. Seneca War Chief</em>, ca. 1837–1844. Hand-colored lithograph on paper. 49.9 x 34.6 cm. Library of Congress, LC-DIG-ppmsca-05086",
   "expand-flag":"Reproduction, 20th c. of 13 Star flag 1777–1794<br> Division of Military History, National Museum<br> of American History, Smithsonian Institution",
   "expand-washington":"John Faed (1819–1902). <em>Washington Receiving a Salute on the Field of Trenton</em>, 1856. Oil on canvas. 142.2 x 105.4 cm. Westervelt Warner Museum of American Art",
   "expand-mariam":"The Miriam and Ira D. Wallach Division of Art, Prints and Photographs: Picture Collection, The New York Public Library. \"Destruction of Indian villages\" New York Public Library Digital Collections.",
   "expand-sullivan":"<em>Sullivan's Campaign</em>, watercolor by Ernest Smith (Tonawanda Seneca, Heron Clan), 1936. Courtesy of the RMSC. Rochester, NY",
   "expand-map":"Doug Stevens/Flyboy Graphics © 2024 National Museum of the American Indian <br><br><em>This map is for educational purposes made with Native scholarship, to provide a representation of political boundaries and locations at a certain point in time.</em>",
   "expand-jamison":"Buffalo Creek, New York",
   "expand-gilbert":"Gilbert Stuart (1755–1828) (possibly). <em>Thayendanegea otherwise Joseph Brant War Chief of the Mohawks</em>, ca. 1785. Oil on canvas. 85 x 72.5 cm. © The Trustees of the British Museum",
   "expand-john":"John Trumbull (1756–1843). <em>Good Peter, Chief of the Oneida Indians</em>, ca. 1717–1793. Oil on wood. 10.5 x 8.3 cm. Trumbull Collection, Yale University Art Gallery, New Haven, CT 1832.67",
   "expand-mary":"Portrait of Mary Jamison, Artist unkown. Private Collection",
   "expand-map-1":"Doug Stevens/Flyboy Graphics © 2024 National Museum of the American Indian  <br><br><em>This map is for educational purposes made with Native scholarship, to provide a representation of political boundaries and locations at a certain point in time.</em>",
  "expand-map-2":"Doug Stevens/Flyboy Graphics © 2024 National Museum of the American Indian  <br><br><em>This map is for educational purposes made with Native scholarship, to provide a representation of political boundaries and locations at a certain point in time.</em>",
  "expand-map-3":"Doug Stevens/Flyboy Graphics © 2024 National Museum of the American Indian  <br><br><em>This map is for educational purposes made with Native scholarship, to provide a representation of political boundaries and locations at a certain point in time.</em>",
  "expand-map-4":"Doug Stevens/Flyboy Graphics © 2024 National Museum of the American Indian  <br><br><em>This map is for educational purposes made with Native scholarship, to provide a representation of political boundaries and locations at a certain point in time.</em>",
  "expand-map-5":"Doug Stevens/Flyboy Graphics © 2024 National Museum of the American Indian  <br><br><em>This map is for educational purposes made with Native scholarship, to provide a representation of political boundaries and locations at a certain point in time.</em>",
  "expand-map-6":"Doug Stevens/Flyboy Graphics © 2024 National Museum of the American Indian  <br><br><em>This map is for educational purposes made with Native scholarship, to provide a representation of political boundaries and locations at a certain point in time.</em>",
  "expand-map-7":"Doug Stevens/Flyboy Graphics © 2024 National Museum of the American Indian  <br><br><em>This map is for educational purposes made with Native scholarship, to provide a representation of political boundaries and locations at a certain point in time.</em>",
  "expand-map-8":"Doug Stevens/Flyboy Graphics © 2024 National Museum of the American Indian  <br><br><em>This map is for educational purposes made with Native scholarship, to provide a representation of political boundaries and locations at a certain point in time.</em>",
  "expand-union":"The Royal Proclamation of 1763, Courtesy Library and Archives of Canada",
  "expand-neutrality":"John Kahionhes Fadden (Akwesasne Mohawk, 1938–2022). <em>Tree of Peace</em>. Black and white drawing. Courtesy David Kanietakeron Fadden",
  "expand-capitol":"John Trumbull (1756–1843). <em>The Declaration of Independence</em>, 1818. Oil on canvas. 3.7 x 5.5 m. Architect of the Capitol",
  "expand-capitol-2":"John Trumbull (1756–1843). <em>The Declaration of Independence</em>, 1818. Oil on canvas. 3.7 x 5.5 m. Architect of the Capitol",
  "expand-declaration":"Highlighted text in the Declaration of Independence, Courtesy Mark Charles",
  "timeline-marker-date-1763-fancy-0-expand":"The Royal Proclamation of 1763, Courtesy Library and Archives of Canada",
  "timeline-marker-date-june-1775-fancy-0-expand":"John Trumbull (1756–1843). <em>The Declaration of Independence</em>, 1818. Oil on canvas. 3.7 x 5.5 m. Architect of the Capitol",
  "timeline-marker-date-june-1776-fancy-0-expand":"John Kahionhes Fadden (Akwesasne Mohawk, 1938–2022). <em>Independence Hall</em>. Black and white drawing. Courtesy David Kanietakeron Fadden",
  "timeline-marker-date-1774-1776-fancy-0-expand":"John Kahionhes Fadden (Akwesasne Mohawk, 1938–2022). <em>Tree of Peace</em>. Black and white drawing. Courtesy David Kanietakeron Fadden",
  "timeline-marker-date-nov-1775-fancy-0-expand":"Gilbert Stuart (1755–1828) (possibly). <em>Thayendanegea otherwise Joseph Brant War Chief of the Mohawks</em>, ca. 1785. Oil on canvas. 85 x 72.5 cm. © The Trustees of the British Museum",
  "timeline-marker-1":"John Trumbull (1756–1843). <em>The Declaration of Independence</em>, 1818. Oil on canvas. 3.7 x 5.5 m. Architect of the Capitol",
  "timeline-marker-date-july-1776-fancy-1-expand":"Highlighted text in the Declaration of Independence, Courtesy Mark Charles"


};

// 1) Create the overlays
$('.chapter-main-image').each(function () {
  const $img = $(this);
  const imageId = $img.attr('id');
  if (!imageId) return;

  const content = tooltipById[imageId];
  if (!content) return;

  const $overlay = $(`
    <div class="chapter-main-icon"
         data-image="${imageId}"
         role="button"
         tabindex="0"
         aria-label="More information"
         aria-expanded="false"
         title="Show caption">
      <img src="/nk360/american-revolution-perseverance/assets/images/info_white.svg"
           alt=""
           class="info-icon"
           draggable="false">
    </div>
  `);

  $img.parent().append($overlay);
});

// 2) Delegate tippy ONCE
tippy.delegate('body', {
  target: '.chapter-main-icon',
  allowHTML: true,
  content(reference) {
    return tooltipById[reference.dataset.image] || '';
  },
  appendTo: () => document.body,
  placement: 'top',
  offset: [0, 10],
  theme: 'nk',
  interactive: true,
  hideOnClick: true,
  trigger: 'click',

  onShow(instance) {
    const ref = instance.reference;
    const pop = instance.popper;

    ref.setAttribute('aria-expanded', 'true');

    // Link the popup to the trigger so SR can announce it
    if (pop && pop.id) {
      ref.setAttribute('aria-describedby', pop.id);
    }

    // Nudge SR to re-announce (keeps focus on the icon, doesn't change tab order)
    requestAnimationFrame(() => {
      if (ref && ref.focus) ref.focus({ preventScroll: true });
    });
  },

  onHide(instance) {
    const ref = instance.reference;
    ref.setAttribute('aria-expanded', 'false');
    ref.removeAttribute('aria-describedby');
  }
});

$(document).off('keydown.tippyInfo').on('keydown.tippyInfo', '.chapter-main-icon', function (e) {
  const key = e.key || e.keyCode;
  const isEnter = key === 'Enter' || key === 13;
  const isSpace = key === ' ' || key === 'Spacebar' || key === 32;
  if (!isEnter && !isSpace) return;

  e.preventDefault();
  this.click();
});




  // EXPAND (open Fancybox)
$(document).on('click', '.slider-div-expand', function (e) {
  e.preventDefault(); e.stopPropagation();
  const a = $(this).closest('.img-bank-item').find('a[data-fancybox]')[0];
  if (a) a.click();
});
$(document).on('keydown', '.slider-div-expand', function (e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault(); e.stopPropagation();
    const a = $(this).closest('.img-bank-item').find('a[data-fancybox]')[0];
    if (a) a.click();
  }
});

// INFO (open Tippy)
function getTipContent(el){
  const id = el.dataset.image || '';
  if (window.tooltipById && window.tooltipById[id]) return window.tooltipById[id];
  const $a = $(el).closest('.img-bank-item').find('a[data-fancybox]');
  return $a.data('caption') || '';
}

const tippyOpts = {
  allowHTML:true,
  content(reference){ return getTipContent(reference); },
  trigger:'manual',
  interactive:true,
  appendTo:document.body,
  placement:'top',
  popperOptions:{
    modifiers:[
      { name:'flip', enabled:false },
      { name:'preventOverflow', options:{ boundary:'viewport', tether:true } }
    ]
  },
  offset:[0,10],
  theme:'nk',
  hideOnClick:true,
  onClickOutside(i){ i.hide(); }
};

$(document).on('click', '.chapter-main-icon', function(e){
  e.preventDefault(); e.stopPropagation();
  $('nav.module-nav').removeClass('nav-locked');
  if (!this._tippy) tippy(this, tippyOpts);
  this._tippy.state.isShown ? this._tippy.hide() : this._tippy.show();
});
$(document).on('keydown', '.chapter-main-icon', function(e){
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault(); e.stopPropagation();
    if (!this._tippy) tippy(this, tippyOpts);
    this._tippy.state.isShown ? this._tippy.hide() : this._tippy.show();
  }
});

$(document)
  .on('mouseenter', '.chapter-main-icon img', function(){ $(this).attr('src','/nk360/american-revolution-perseverance/assets/images/info_hover_white.svg'); })
  .on('mouseleave', '.chapter-main-icon img', function(){ $(this).attr('src','/nk360/american-revolution-perseverance/assets/images/info_white.svg'); });

tippy.delegate('body', {
  target: '.vocab-wrapper',
  allowHTML: true,
  interactive: true,
  trigger: 'mouseenter focus click',
  placement: 'top',
  offset: [0, 10],
  theme: 'custom-dark',
  hideOnClick: false,
  maxWidth: 300,
  appendTo: document.body,
  aria: {
    content: 'describedby',
    expanded: 'auto'
  },
  onShow(instance) {
    // Dynamically set aria-label when tooltip is about to show
    const reference = instance.reference;
    const vocabText = reference.querySelector('.vocab')?.textContent;
    if (vocabText && !reference.hasAttribute('aria-label')) {
      reference.setAttribute('aria-label', `Definition of ${vocabText}`);
    }
    if (!reference.hasAttribute('role')) {
      reference.setAttribute('role', 'button');
    }
  },
  content(reference) {
    const id = reference.getAttribute('data-tippy-content-id');
    if (!id) return '';
    const node = document.getElementById(id);
    return node ? node.innerHTML : '';
  },
  popperOptions: {
    modifiers: [
      { name: 'preventOverflow', options: { padding: 4 } }
    ]
  },
});


// Disable right click for image
$(function () {
    var disabledImageSelector = 'img:not(.right-click-enabled)';

    // 1. Core Disabling Logic: Applies to ALL standard images that are NOT enabled for right-click.
    $(document)
        .on('contextmenu', disabledImageSelector, function (e) { 
            e.preventDefault(); 
        })
        .on('dragstart', disabledImageSelector, function (e) { 
            e.preventDefault(); 
        });

    // 2. Applies the draggable attribute to ALL images.
    $('img').attr('draggable', 'false');

    var fancyboxSelector = '.fancybox-image:not(.right-click-enabled), .fancybox-content img:not(.right-click-enabled)';

    $(document)
        .on('contextmenu', fancyboxSelector, function (e) { 
            e.preventDefault(); 
        })
        .on('dragstart', fancyboxSelector, function (e) { 
            e.preventDefault(); 
        });
});

const NO_RESPONSE_TEXT = 'No response given.';

// copies an input -> its -hidden target AND handles no-response styling

function toPrintParagraphs(raw) {
  return String(raw || '')
    .replace(/\r\n?/g, '\n')  // normalize
    .replace(/\n/g, '\n\n');  // double line breaks = paragraph feel in print
}


function ensurePrintMirrors(scopeSelector){
  $(scopeSelector).find('table.challenge-table textarea.form-control').each(function(){
    const $ta = $(this);

    // create mirror once
    if ($ta.next('.print-cell-text').length === 0) {
      $ta.after('<div class="print-cell-text"></div>');
    }

    // sync mirror now
    const v = ($ta.val() || '');
    const isEmpty = v.trim().length === 0;
    const $mirror = $ta.next('.print-cell-text');

    $mirror
  .text(isEmpty ? NO_RESPONSE_TEXT : toPrintParagraphs(v))
  .toggleClass('no-response', isEmpty);

  });
}

// keep mirrors updated as user types
$(document).on('input change', 'table.challenge-table textarea.form-control', function(){
  ensurePrintMirrors('#chapter-review-print');
});

function copyToHidden(inputEl) {
  const id = inputEl.id;
  if (!id) return;

  const $target = $('#' + id + '-hidden');
  if (!$target.length) return;

  const v = inputEl.value || '';
  const isEmpty = v.trim().length === 0;

  if ($target.is('input, textarea, select')) {
    $target.val(isEmpty ? NO_RESPONSE_TEXT : toPrintParagraphs(v));
  } else {
    $target.text(isEmpty ? NO_RESPONSE_TEXT : toPrintParagraphs(v));
  }

  // toggle class for print styling
  $target.toggleClass('no-response', isEmpty);
  if (isEmpty) $target.attr('data-no-response', '1');
  else $target.removeAttr('data-no-response');
}

$(document).on('input change', '.copy-text-for-print', function () {
  copyToHidden(this);
});

function syncHiddenAnswers(scopeSelector) {
  $(scopeSelector).find('.copy-text-for-print').each(function () {
    copyToHidden(this);
  });
}



// sync on load + Firefox restore
$(function () {
  syncHiddenAnswers('body');
});
$(window).on('pageshow', function () {
  setTimeout(() => syncHiddenAnswers('body'), 0);
  setTimeout(() => syncHiddenAnswers('body'), 150);
});

// Print buttons
$('#print-btn-1').on('click', function () {
  syncHiddenAnswers('#all-documents');
  $('#all-documents').printThis({
    header:
      "<div style='margin-bottom:8px'>" +
        "<img style='width:60%' src='/nk360/american-revolution-perseverance/img/horizontal-smithsonian-dark.svg'><br>" +
        "<img src='/nk360/american-revolution-perseverance/img/nk-360-header-dark.svg'><br>" +
        "<p style=\"font-size:12px; margin-top:10px;font-weight:600; font-family:'Hiragino Kaku Gothic Pro','Hiragino Sans','Yu Gothic','Meiryo','Segoe UI',Arial,sans-serif;\">" +
          "American Revolution: Haudenosaunee Perseverance" +
        "</p>" +
        "<hr style='margin:4px 0 0; border:0; border-top:1px solid #000;'>" +
      "</div>",
    printDelay: 750
  });
});

$('#print-btn-2').on('click', function () {
  syncHiddenAnswers('#chapter-review-print');
  ensurePrintMirrors('#chapter-review-print');
  $('#chapter-review-print').printThis({
    header:
      "<div style='margin-bottom:8px'>" +
        "<img style='width:60%' src='/nk360/american-revolution-perseverance/img/horizontal-smithsonian-dark.svg'><br>" +
        "<img src='/nk360/american-revolution-perseverance/img/nk-360-header-dark.svg'><br>" +
        "<p style=\"font-size:12px; margin-top:10px;font-weight:600; font-family:'Hiragino Kaku Gothic Pro','Hiragino Sans','Yu Gothic','Meiryo','Segoe UI',Arial,sans-serif;\">" +
          "American Revolution: Haudenosaunee Perseverance" +
        "</p>" +
        "<hr style='margin:4px 0 0; border:0; border-top:1px solid #000;'>" +
      "</div>"
  });
});

$('#print-btn-3').on('click', function () {
  syncHiddenAnswers('#chapter-review-print');
  ensurePrintMirrors('#chapter-review-print');
  $('#chapter-review-print').printThis({
    header:
      "<div style='margin-bottom:8px'>" +
        "<img style='width:60%' src='/nk360/american-revolution-perseverance/img/horizontal-smithsonian-dark.svg'><br>" +
        "<img src='/nk360/american-revolution-perseverance/img/nk-360-header-dark.svg'><br>" +
        "<p style=\"font-size:12px; margin-top:10px;font-weight:600; font-family:'Hiragino Kaku Gothic Pro','Hiragino Sans','Yu Gothic','Meiryo','Segoe UI',Arial,sans-serif;\">" +
          "American Revolution: Haudenosaunee Perseverance" +
        "</p>" +
        "<hr style='margin:4px 0 0; border:0; border-top:1px solid #000;'>" +
      "</div>"
  });
});





  /******************************
      BOTTOM SCROLL TOP BUTTON
   ******************************/
$(document).ready(function() {
    var scrollTop = $(".scrollTop");

    var vhThreshold = $(window).height() * 0.01;

    // Re-calculate the threshold if the window is resized
    $(window).resize(function() {
        vhThreshold = $(this).height();
    });

    $(window).scroll(function() {

        var topPos = $(this).scrollTop();

        if (topPos > vhThreshold) {
            $(scrollTop).css("opacity", "1");
        } else {
            $(scrollTop).css("opacity", "0");
        }

    }); // scroll END

    //Click event to scroll to top
    $(scrollTop).click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;

    }); // click() scroll top EMD

}); // ready() END

function getMinHeightPx(ta) {
  // Use the textarea's rows attribute as the baseline (default 2)
  const rows = parseInt(ta.getAttribute('rows') || '2', 10);

  const cs = getComputedStyle(ta);
  let lh = parseFloat(cs.lineHeight);
  if (!isFinite(lh)) {
    const fs = parseFloat(cs.fontSize) || 16;
    lh = fs * 1.2;
  }

  const pt = parseFloat(cs.paddingTop) || 0;
  const pb = parseFloat(cs.paddingBottom) || 0;
  const bt = parseFloat(cs.borderTopWidth) || 0;
  const bb = parseFloat(cs.borderBottomWidth) || 0;

  return Math.ceil(rows * lh + pt + pb + bt + bb);
}


 (function () {
  const SELECTOR = 'table.challenge-table textarea.form-control';

  function setHeightImportant(el, px) {
    el.style.setProperty('height', px + 'px', 'important');
    el.style.setProperty('overflow', 'hidden', 'important');
  }

function autoSizeOne(ta) {
  const minH = getMinHeightPx(ta);

  ta.style.setProperty('height', 'auto', 'important');
  const h = Math.max(ta.scrollHeight, minH);

  setHeightImportant(ta, h);
  return h;
}


  function syncRow(tr) {
    if (!tr) return;
    const tas = tr.querySelectorAll(SELECTOR);
    if (!tas.length) return;

    // Measure each and set both to the max height
    let maxH = 0;
    tas.forEach(ta => {
      const h = autoSizeOne(ta);
      if (h > maxH) maxH = h;
    });
    tas.forEach(ta => setHeightImportant(ta, maxH));
  }

  function init() {
    const tas = document.querySelectorAll(SELECTOR);
    console.log('[challenge autosize] found', tas.length, 'textareas');
    tas.forEach(ta => {
      // set a sane starting size
      ta.style.setProperty('resize', 'none', 'important');
      ta.style.setProperty('box-sizing', 'border-box', 'important');
      // initial sizing per row
      syncRow(ta.closest('tr'));
    });
  }

  // Live updates
  document.addEventListener('input', (e) => {
    if (e.target.matches(SELECTOR)) {
      syncRow(e.target.closest('tr'));
    }
  }, true);

  // Re-sync on resize (wrapping changes heights)
  window.addEventListener('resize', () => {
    document.querySelectorAll('table.challenge-table tbody tr').forEach(syncRow);
  });

  // If DOM is ready, init now; otherwise init on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // If the table gets injected later, catch it
  const mo = new MutationObserver(() => init());
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();



});

