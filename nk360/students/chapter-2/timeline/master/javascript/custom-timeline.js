// Scales each .tl-scale 
(function(){
  function initScaler(root){
    const section = root.querySelector(':scope > .main-timeline-section');
    if (!section) return;

    const designW = parseFloat(root.dataset.designW) || 1200;
    const designH = parseFloat(root.dataset.designH) || 700;

    // lock the section to design pixels;
    section.style.width  = designW + 'px';
    section.style.height = designH + 'px';

function resize(){
  const available = root.clientWidth;
  const scale = Math.min(1, available / designW);

  // Prefer zoom (crisp text in Chromium); fall back to transform
  section.style.transformOrigin = 'top left';

  const isChromium = !!window.chrome && (!!window.CSS && CSS.supports('zoom', 1));
  if (isChromium) {
    section.style.zoom = scale;          
    section.style.transform = '';        
  } else {
    section.style.zoom = '';            
    section.style.transform = `scale(${scale})`; 
  }

  root.style.height = (designH * scale) + 'px';
}


    // respond to container changes
    const ro = new ResizeObserver(resize);
    ro.observe(root);
    window.addEventListener('load', resize, {passive:true});
    resize();
  }

  // Auto-init all instances on the page
  document.querySelectorAll('.tl-scale').forEach(initScaler);
})();





  /* text under title) + media (image & caption) -------- */
  const detailsMap = {
    'date-1763': `
      <p>After Britain wins the French and Indian War, King George III orders that no colonists should settle west of the Proclamation Line, located along the Appalachian Mountains. The order is supposed to prevent conflict caused by colonists moving onto Native land, but the British government does not enforce the proclamation.</p>
    `,
    'date-1774-1776': `
      <p>Over the course of at least nine councils between 1774 and 1776, during which both the British government and American colonists each try to convince the Haudenosaunee to support their side, the <span class="vocab-wrapper" tabindex="0" data-tippy-content-id="tooltip-grand-council"><span class="vocab">Grand Council</span><img src="/nk360/american-revolution-perseverance/assets/images/info_dark.svg" alt="sound icon" class="vocab-icon"></span> of the Haudenosaunee declare themselves friends of both sides, determining it is in their best interests to stay out of the conflict. This is decided repeatedly after careful consideration by <span class="audio-wrapper" data-audio-src="/nk360/american-revolution-perseverance/assets/audio/Onondaga_Hodiyanehson_Emerson-Shenandoah.mp3" tabindex="0"><span class="audio">Hodiya'neh'son</span><img src="/nk360/american-revolution-perseverance/assets/images/volume_up.png" alt="sound icon" class="audio-icon"></span> (chiefs), <span class="audio-wrapper" data-audio-src="/nk360/american-revolution-perseverance/assets/audio/Onondaga_Gayeñnehda-Gondiwehnyoñ_Emerson-Shenandoah.mp3" tabindex="0"><span class="audio">Gayeñ nehda'  Gondi'wehnyoñ</span><img src="/nk360/american-revolution-perseverance/assets/images/volume_up.png"" alt="sound icon" class="audio-icon"></span> (<span class="vocab-wrapper" tabindex="0" data-tippy-content-id="tooltip-clan-mothers"><span class="vocab">clan mothers</span><img src="/nk360/american-revolution-perseverance/assets/images/info_dark.svg" alt="vocab icon" class="vocab-icon"></span>) and other leaders.</p>
    `,
    'date-june-1775': `
      <p>One of the early acts of the <span class="vocab-wrapper" tabindex="0" data-tippy-content-id="tooltip-continental-congress"><span class="vocab">Continental Congress</span><img src="/nk360/american-revolution-perseverance/assets/images/info_dark.svg" alt="vocab icon" class="vocab-icon"></span> creates an Indian Department to improve relations between the new American government and Native nations. American leaders know that they need strong relationships with powerful and influential Native nations if their government is going to survive.</p>
    `,
    'date-nov-1775': `
      <p><span class="audio-wrapper" data-audio-src="/nk360/american-revolution-perseverance/assets/audio/Mohawk_Thayendanegea_Emerald-LeFort.mp3" tabindex="0"><span class="audio">Thayendanegea</span><img src="/nk360/american-revolution-perseverance/assets/images/volume_up.png" alt="sound icon" class="audio-icon"></span> (Joseph Brant) a Mohawk leader and brother-in-law to the British <span class="vocab-wrapper" tabindex="0" data-tippy-content-id="tooltip-superintendent"><span class="vocab">Superintendent of Indian Affairs</span><img src="/nk360/american-revolution-perseverance/assets/images/info_dark.svg" alt="vocab icon" class="vocab-icon"></span> travels to England to meet with British leadership and better understand the growing conflict between Britain and the Americans. He wants to make an informed decision about whether to support the British or Americans in the conflict.</p>
    `,
    'date-june-1776': `
      <p>A group of Haudenosaunee leaders travel to Philadelphia to speak to the <span class="vocab-wrapper" tabindex="0" data-tippy-content-id="tooltip-continental-congress"><span class="vocab">Continental Congress</span><img src="/nk360/american-revolution-perseverance/assets/images/info_dark.svg" alt="sound icon" class="vocab-icon"></span>. Congressional leaders address them as brothers and hope for continued friendship with the Haudenosaunee.</p>
    `,
    'date-1765': `
      <p>The British government passes the Stamp Act to raise funds by putting a tax on colonial documents.</p>
    `,
    'date-1773': `
      <p>Colonial protesters throw tea from a trade ship into the sea to protest increased taxation by the British government.</p>
    `,
    'date-1770': `
      <p>A street conflict that results in British soldiers killing several colonists.</p>
    `,
    'date-1774': `
      <p>Delegates from each colonial state meet in Philadelphia in response to the Intolerable Acts imposed by Britain.</p>
    `,
    'date-1775': `
      <p>The first major military engagements of the Revolutionary War between American militia and the British military.</p>
    `,
    'date-june-17-1775': `
      <p>British troops attack a colonial force in Boston, Massachusetts. The British win the battle but suffer heavy losses. Despite losing, colonial soldiers’ persistence gave many confidence in the American army.</p>
    `,
    'date-july-1776': `
      <p><span class="vocab-wrapper" tabindex="0" data-tippy-content-id="tooltip-continental-congress"><span class="vocab">Continental Congress</span><img src="/nk360/american-revolution-perseverance/assets/images/info_dark.svg" alt="sound icon" class="vocab-icon"></span> delegates sign the Declaration, officially proclaiming that the United States is an independent country from Britain. In the document’s <span class="vocab-wrapper" tabindex="0" data-tippy-content-id="tooltip-grievances"><span class="vocab">grievances</span><img src="/nk360/american-revolution-perseverance/assets/images/info_dark.svg" alt="sound icon" class="vocab-icon"></span> about the king, Thomas Jefferson writes that the king of England was encouraging the “merciless Indian Savages” to attack American colonists, even though colonists were invading Native land.</p>
    `,
  };

  const modalMedia = {
    'date-1763': {
      src: '/nk360/american-revolution-perseverance//img/timeline/timeline-img-1.jpg',
      caption: 'The Royal Proclamation of 1763, Courtesy Library and Archives of Canada',
      alt: 'A yellowed typeset page begins with an illustrated crest and the words “By the King, A Proclamation.”'
    },
    'date-1774-1776': {
      src: '/nk360/american-revolution-perseverance//img/timeline/timeline-img-3.jpg',
      caption: 'John Kahionhes Fadden (Akwesasne Mohawk, 1938–2022). <em>Tree of Peace</em>. Black and white drawing. Courtesy David Kanietakeron Fadden',
      alt:'A black-and-white drawing depicts a tree, an eagle, and geometric shapes and patterns.'
    },
    
    'date-nov-1775': {
      src: '/nk360/american-revolution-perseverance/assets/images/chapter-3/gilbert-stuart.png',
      caption: 'Gilbert Stuart (1755–1828) (possibly). <em>Thayendanegea otherwise Joseph Brant War Chief of the Mohawks</em>, ca. 1785. Oil on canvas. 85 x 72.5 cm. © The Trustees of the British Museum',
      alt: 'An oil painting portrait of a man depicts him looking to the side against a blue and cloudy sky, wearing a red and black cloak and a feather headdress.'
    },
    'date-june-1776': {
      src: '/nk360/american-revolution-perseverance//img/timeline/timeline-congress.jpg',
      caption: 'John Kahionhes Fadden (Akwesasne Mohawk, 1938–2022). <em>Independence Hall</em>. Black and white drawing. Courtesy David Kanietakeron Fadden',
      alt: 'A black-and-white drawing depicting a gathering of Native people and European men indoors.'
    },
    'date-june-1775': {
      src: '/nk360/american-revolution-perseverance//img/timeline/timeline-june-16-1775.png',
      caption: 'John Trumbull (1756–1843). <em>The Declaration of Independence</em>, 1818. Oil on canvas. 3.7 x 5.5 m. Architect of the Capitol',
      alt: 'An oil painting depicts men gathering indoors around a table stacked with papers.'
    },
    //This date shows TWO images 
    'date-july-1776': {
      src: [
        {
          url: '/nk360/american-revolution-perseverance/img/timeline/timeline-img-decolration.jpg',
          caption: 'John Trumbull (1756–1843). <em>The Declaration of Independence</em>, 1818. Oil on canvas. 3.7 x 5.5 m. Architect of the Capitol',
          alt: 'An oil painting depicts men gathering indoors around a table stacked with papers.'
        },
        {
          url: '/nk360/american-revolution-perseverance/img/timeline/timeline-decloration-document.png',
          caption: 'Highlighted text in the Declaration of Independence, Courtesy Mark Charles',
          alt: 'A yellowed typeset page titled “In Congress, July 4, 1776” includes an illustrated magnification of words in the text that read in script “the merciless Indian Savages.”'
        }
      ]
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
  /* Build overlays (unchanged behavior)*/
  const imgMap = {
    'date-1763':      '/nk360/american-revolution-perseverance/img/timeline/timeline-img-1.jpg',
    'date-1774-1776': '/nk360/american-revolution-perseverance//img/timeline/timeline-img-3.jpg',
    'date-june-1775': '/nk360/american-revolution-perseverance//img/timeline/timeline-june-16-1775.png',
    'date-nov-1775':  '/nk360/american-revolution-perseverance/assets/images/chapter-3/gilbert-stuart.png',
    'date-june-1776': '/nk360/american-revolution-perseverance//img/timeline/timeline-congress.jpg',
    'date-july-1776': '/nk360/american-revolution-perseverance//img/timeline/timeline-decloration-document.png'
  };

  Object.entries(imgMap).forEach(([id, url]) => {
    const box = document.querySelector(`#${id} .content-box`);
    if (!box) return;

    let overlay = box.querySelector('.content-box-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'content-box-overlay';
      overlay.id = id + '-overlay';
      overlay.innerHTML = `
        <div class="row g-3 align-items-center">
          <div class="col-12 col-lg-8 overlay-text"></div>
          <div class="col-12 col-lg-4 d-flex justify-content-end"><img alt=""></div>
        </div>`;
      const textCol = overlay.querySelector('.overlay-text');
      box.childNodes.forEach(n => textCol.appendChild(n.cloneNode(true)));
      box.appendChild(overlay);
      box.classList.add('overlayed');
      box.setAttribute('aria-hidden', 'true');
    }
    const imgEl = overlay.querySelector('img');
    if (imgEl) {
      const chosen = modalMedia[id] || {};

      // For date-july-1776, use the second image alt
      let altText = '';
      if (id === 'date-july-1776' && Array.isArray(chosen.src) && chosen.src[1]) {
        altText = chosen.src[1].alt || chosen.src[1].caption || 'Timeline image';
      } else {
        altText = chosen.alt || chosen.caption || (box.querySelector('p')?.textContent.trim() || 'Timeline image');
      }

      imgEl.src = url;
      imgEl.alt = altText;
    }
  });

const backdrop = document.getElementById('tm-backdrop');
const mediaEl  = backdrop.querySelector('.tm-media');
const titleEl  = document.getElementById('tm-title');
const subEl    = document.getElementById('tm-sub');
const bodyEl   = document.getElementById('tm-body');

const modal    = document.getElementById('timeline-modal');
const closeBtn = backdrop.querySelector('.tm-close');

let lastFocusedEl = null;

function getFocusableInModal() {
  // Only look inside the modal panel, not the whole page
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  return Array.from(modal.querySelectorAll(selectors))
    .filter(el => !el.hasAttribute('disabled'))
    .filter(el => el.offsetParent !== null); // visible-ish
}

document.addEventListener('keydown', function (e) {
  if (backdrop.hidden) return;          // only trap when modal is open
  if (e.key !== 'Tab') return;

  const focusables = getFocusableInModal();

  // If nothing focusable, keep focus on the modal itself
  if (!focusables.length) {
    e.preventDefault();
    modal.focus();
    return;
  }

  const first = focusables[0];
  const last  = focusables[focusables.length - 1];

  // If focus somehow escaped already, pull it back in
  if (!modal.contains(document.activeElement)) {
    e.preventDefault();
    first.focus();
    return;
  }

  // Normal wrap logic
  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});


// Make the modal focusable (so we can focus it programmatically)
if (modal && !modal.hasAttribute('tabindex')) {
  modal.setAttribute('tabindex', '-1');
}

// Your close control is an <img>, so make it keyboard-focusable + clickable like a button
if (closeBtn) {
  closeBtn.setAttribute('role', 'button');
  closeBtn.setAttribute('tabindex', '0');
  if (!closeBtn.getAttribute('aria-label')) closeBtn.setAttribute('aria-label', 'Close modal');

  closeBtn.addEventListener('click', closeModal);

  closeBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      closeModal();
    }
  });
}

function openModal() {
  lastFocusedEl = document.activeElement;

  backdrop.hidden = false;

  // Keep your existing scroll behavior (unchanged)
  document.body.style.overflow = 'auto';
  document.body.style.overflowX = 'hidden';

  // Move focus INTO the modal (close button first, otherwise the modal container)
  requestAnimationFrame(() => {
    if (closeBtn && typeof closeBtn.focus === 'function') {
      closeBtn.focus({ preventScroll: true });
    } else if (modal && typeof modal.focus === 'function') {
      modal.focus({ preventScroll: true });
    }
  });
}

function closeModal() {
  backdrop.hidden = true;
  document.body.style.overflow = '';

  // Restore focus to what opened the modal (timeline item, etc.)
  if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
    lastFocusedEl.focus({ preventScroll: true });
  }
}

// Clicking on the backdrop closes
backdrop.addEventListener('click', (e) => {
  if (e.target === backdrop) closeModal();
});

// ESC closes
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !backdrop.hidden) closeModal();
});

function openFromArticle(article) {
  const id  = article.id;
  const box = article.querySelector('.content-box');

  const p1 = box?.querySelector('p:nth-of-type(1)'); // date
  const p2 = box?.querySelector('p:nth-of-type(2)'); // title
  const dateText  = p1 ? p1.textContent.trim() : '';
  const titleText = p2 ? p2.textContent.trim() : (p1 ? p1.textContent.trim() : id);

  const overlayImg = document.querySelector(`#${id}-overlay img`);
  const chosen     = modalMedia[id] || {};
  const group      = id + '-gallery';

  // mediaList = [{ url, caption }]
  let mediaList = [];

  if (Array.isArray(chosen.src)) {
    mediaList = chosen.src
      .map(item => typeof item === 'string'
        ? { url: item, caption: chosen.caption || '', alt: chosen.alt || '' }
        : item)
      .filter(m => m && m.url);
  } else if (typeof chosen.src === 'string' && chosen.src) {
    mediaList = [{ url: chosen.src, caption: chosen.caption || '', alt: chosen.alt || '' }];
  } else if (overlayImg?.getAttribute('src')) {
    mediaList = [{ url: overlayImg.getAttribute('src'), caption: '' }];
  }

  const gridEl   = backdrop.querySelector('.tm-grid');
  const copyEl   = backdrop.querySelector('.tm-copy');
  const modal    = document.getElementById('timeline-modal');

  if (mediaList.length) {
    gridEl.classList.remove('tm--no-media');

    const capForA = chosen.caption;
    // clear old inline image if we had one from a previous open
    if (copyEl) {
      const oldInline = copyEl.querySelector('.tm-inline-media');
      if (oldInline) oldInline.remove();
    }

    // ---------- SPECIAL LAYOUT FOR date-july-1776 ----------
    if (id === 'date-july-1776' && mediaList.length === 2) {
      const first  = mediaList[0]; // painting – goes in text column
      const second = mediaList[1]; // document – stays in media column

      // Left column: only the document image
      mediaEl.innerHTML = `
        <div class="document-img fancy-img">
          <a data-fancybox="${group}"
             class="slider-map"
             href="${second.url}"
             data-caption="${second.caption || capForA}"
             id="${id}-fancy-1">
            <img src="${second.url}"
                 id="${id}-img-1"
                 class="img-fluid img-slider slider-map outside-slider w-100 timeline-img-1-img border border-dark"
                 alt="${second.alt || capForA}">
          </a>
        </div>
      `;

      // Text column: inline painting above the date
      if (copyEl) {
        const inlineDiv = document.createElement('div');
        inlineDiv.className = 'tm-inline-media fancy-img';
        inlineDiv.style.maxWidth = '340px';
        inlineDiv.style.marginBottom = '16px';
        inlineDiv.innerHTML = `
          <a data-fancybox="${group}"
             class="slider-map"
             href="${first.url}"
             data-caption="${first.caption || capForA}"
             id="${id}-fancy-0">
            <img src="${first.url}"
                 id="${id}-img-0"
                 class="img-fluid img-slider slider-map outside-slider w-100 timeline-img-1-img border border-dark"
                 alt="${first.alt || capForA}">
          </a>
        `;

        const subNode = copyEl.querySelector('#tm-sub');
        // insert inline image between title and date
        if (subNode) {
          copyEl.insertBefore(inlineDiv, subNode);
        } else {
          copyEl.insertBefore(inlineDiv, copyEl.firstChild);
        }
      }
    } else {
      // ---------- DEFAULT LAYOUT FOR ALL OTHER IDS ----------
      mediaEl.innerHTML = mediaList.map((m, idx) => {
        const aId   = `${id}-fancy-${idx}`;
        const imgId = `${id}-img-${idx}`;
        const cap   = (m && m.caption != null) ? m.caption : capForA;

        return `
          <div class="document-img fancy-img" ${idx ? 'style="margin-top:18px"' : ''}>
            <a data-fancybox="${group}"
               class="slider-map"
               href="${m.url}"
               data-caption="${cap}"
               id="${aId}">
              <img src="${m.url}"
                   id="${imgId}"
                   class="img-fluid img-slider slider-map outside-slider w-100 timeline-img-1-img border border-dark"
                   alt="${m.alt || cap}">
            </a>
          </div>
        `;
      }).join('');
    }

    // activate Fancybox for *all* anchors in this group (media + inline)
    if (window.jQuery && jQuery.fancybox) {
      jQuery(`[data-fancybox="${group}"]`).fancybox({
        backFocus: false,
        buttons: ["zoom", "close"],
        idleTime: false, // <— keep icons visible
      });
    }
  } else {
    gridEl.classList.add('tm--no-media');
    mediaEl.innerHTML = '';
    // remove any inline image just in case
    if (copyEl) {
      const oldInline = copyEl.querySelector('.tm-inline-media');
      if (oldInline) oldInline.remove();
    }
  }

  // Scroll + title color when there are two media items
  modal.style.overflowY = '';
  if (mediaList.length === 2) {
    modal.style.overflowY = 'auto';
    titleEl.style.color = '#A55F41';
  } else {
    modal.style.overflowY = '';
    titleEl.style.color = '';
  }

  // ----- Title (with special line-break layouts for some IDs) -----
  let htmlTitle = null;

  if (id === 'date-june-1775') {
    htmlTitle = 'The Second Continental<br>Congress creates an Indian<br>Department';
  } else if (id === 'date-june-1776') {
    htmlTitle = 'Haudenosaunee delegation<br>visits Continental Congress';
  } else if (id === 'date-1774-1776') {
    htmlTitle = 'Haudenosaunee leaders<br>declare neutrality';
  } else if (id === 'date-nov-1775') {
    htmlTitle = 'Thayendanegea (Joseph Brant),<br>Mohawk leader, visits Britain';
  }

  if (titleEl) {
    if (htmlTitle) {
      titleEl.innerHTML = htmlTitle;
    } else {
      titleEl.textContent = titleText;
    }
  }

  if (subEl) {
    subEl.textContent = dateText;
  }
  if (bodyEl) {
    bodyEl.innerHTML = detailsMap[id] || '';
    initVocabTooltips(bodyEl);
  }

  openModal();
}


  /* content-box AND .meta-date as click/keyboard triggers ------ */
  document.querySelectorAll('.timeline-article').forEach(article => {
    if (!article.id) return;

    const triggers = article.querySelectorAll('.content-box, .meta-date');
    triggers.forEach(el => {
      el.style.cursor = 'pointer';
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');

      el.addEventListener('click', () => openFromArticle(article));
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openFromArticle(article);
        }
      });
    });
  });

    document.querySelectorAll('.tl-scale').forEach(el => {
    el.classList.add('timeline-ready');
  });
});

//Expand Icons for modal
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.slider-div-expand');
  if (!btn) return;
  const anchor = btn.closest('.fancy-img')?.querySelector('a[data-fancybox]');
  if (anchor) {
    e.preventDefault();
    e.stopPropagation();
    anchor.click();
  }
});

document.addEventListener('keydown', (e) => {
  const btn = e.target.closest('.slider-div-expand');
  if (!btn) return;
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    e.stopPropagation();
    const anchor = btn.closest('.fancy-img')?.querySelector('a[data-fancybox]');
    anchor?.click();
  }
});

// add one expand icon to a fancybox anchor
function addExpandIconToAnchor(anchorElem, expandId, ariaLabel) {
  if (!anchorElem) return;

  // derive a unique id if none was provided
  const resolvedId =
    expandId ||
    (anchorElem.id ? anchorElem.id + '-expand' : 'expand-' + Math.random().toString(36).slice(2, 9));

  // BLOCK duplicates
  if (anchorElem.dataset.hasIcons === '1') return;
  if (anchorElem.nextElementSibling && anchorElem.nextElementSibling.classList.contains('slider-icons')) {
    anchorElem.dataset.hasIcons = '1';
    return;
  }

  // match existing anchor positioning rules (kept)
  anchorElem.style.position = 'relative';
  anchorElem.style.display  = 'block';
  anchorElem.style.lineHeight = 0;
  anchorElem.style.fontSize   = 0;

  // compute per-id top offset (NUMBER)
  let topStyle = 0;
  if (resolvedId === 'date-1763-fancy-0-expand' || resolvedId === 1) {
    topStyle = 0;
  }
  if (resolvedId === 'date-1774-1776-fancy-0-expand') {
    topStyle = 0;
  }

  console.log(resolvedId)


  // <div class="slider-icons">
  const wrap = document.createElement('div');
  wrap.className = 'slider-icons';
  wrap.style.cssText = 'position:absolute; right:0; bottom:0; margin:0; padding:0; line-height:0; z-index:10; top:auto';

  //   <div class="slider-div-expand border border-dark" id="${expandId}" role="button" tabindex="0" aria-label="${ariaLabel}">
  const btn = document.createElement('div');
  btn.className = 'slider-div-expand border border-dark';
  btn.id = resolvedId; // unique id always set
  btn.setAttribute('role', 'button');
  btn.setAttribute('tabindex', '0');
  btn.setAttribute('style', `top: ${topStyle}px;`);   // <-- FIXED
  btn.setAttribute('title', 'Expand image');  // <-- ADD THIS
  if (ariaLabel) btn.setAttribute('aria-label', ariaLabel);

  //     <img class="slider-btn slider-btn-expand" src="/nk360/american-revolution-perseverance/assets/images/dark-expand_content.svg" alt="Expand image">
  const img = document.createElement('img');
  img.className = 'slider-btn slider-btn-expand';
  img.src = '/nk360/american-revolution-perseverance/assets/images/dark-expand_content.svg';
  img.alt = 'Expand image';
  img.style.display = 'block';
  img.style.width   = '18px';
  img.style.height  = '18px';
  img.style.maxWidth = 'none';

  btn.appendChild(img);
  wrap.appendChild(btn);

  //   <div class="chapter-main-icon" data-image="${expandId}" aria-expanded="false" style="right: 48px">
  const info = document.createElement('div');
  info.className = 'chapter-main-icon';
  info.setAttribute('data-image', resolvedId);
  info.setAttribute('aria-expanded', 'false');
  info.setAttribute('tabindex', '0');
  info.setAttribute('style', `right: 48px; top: ${topStyle}px;`); // <-- apply same top
  info.dataset.image = `timeline-marker-${resolvedId}`;

  //     <img src="/nk360/american-revolution-perseverance/assets/images/info_white.svg" alt="More information" class="info-icon">
  const infoImg = document.createElement('img');
  infoImg.src = '/nk360/american-revolution-perseverance/assets/images/info_white.svg';
  infoImg.alt = 'More information';
  infoImg.className = 'info-icon';
  infoImg.title = 'Show caption';


  info.appendChild(infoImg);
 wrap.insertBefore(info, btn);


  // place the overlay AFTER the <a data-fancybox> anchor, not inside it
  const parent = anchorElem.parentNode;
  if (parent) {
    const cs = window.getComputedStyle(parent);
    if (cs.position === 'static') parent.style.position = 'relative';
    parent.insertBefore(wrap, anchorElem.nextSibling);
  }

  anchorElem.dataset.hasIcons = '1';
}




(function initModalExpandIcons(){
  // watch the whole backdrop/modal so we catch images in tm-media *and* tm-copy
  const modalRoot = document.querySelector('#tm-backdrop');
  if (!modalRoot) return;

  function addIcons() {
    modalRoot
      .querySelectorAll('a[data-fancybox]')
      .forEach(addExpandIconToAnchor);
  }

  // run once for current content
  addIcons();

  // observe future injections (every time you open a new card)
  const mo = new MutationObserver(() => {
    addIcons();
  });
  mo.observe(modalRoot, { childList: true, subtree: true });
})();


document.addEventListener('DOMContentLoaded', () => {
  const articles = document.querySelectorAll('.timeline-article');
  if (!articles.length) return;

  function isInsideCircle(e, el) {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const r  = Math.min(rect.width, rect.height) / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    return (dx * dx + dy * dy) <= (r * r);
  }

  articles.forEach(article => {
    const dot  = article.querySelector('.meta-date');
    if (!dot) return;

    const overlay = article.querySelector('.content-box-overlay');
    const box     = article.querySelector('.content-box');
    const hoverTarget = overlay || box;
    if (!hoverTarget) return;

    const isNeutralDot = article.id === 'date-1774-1776';

    // Turn hover on/off for dot + target
    function setHover(on) {
      const active = !!on;

      if (!isNeutralDot) {
        dot.classList.toggle('dot-hover', active);
      }

      if (overlay) {
        overlay.classList.toggle('overlay-hover', active);
      } else if (box) {
        box.classList.toggle('box-hover', active);
      }
    }

    // ---------- DOT: hover + click + keyboard ----------
    if (!isNeutralDot) {
      // Normal behavior for all other dots
      dot.addEventListener('mousemove', e => {
        const inside = isInsideCircle(e, dot);
        setHover(inside);
      });

      dot.addEventListener('mouseleave', () => {
        setHover(false);
      });

      dot.setAttribute('tabindex', '0');
      dot.setAttribute('role', 'button');

      dot.addEventListener('click', e => {
        if (!isInsideCircle(e, dot)) return;
        if (typeof openFromArticle === 'function') {
          openFromArticle(article);
        }
      });

      dot.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (typeof openFromArticle === 'function') {
            openFromArticle(article);
          }
        }
      });
    } else {
      // 🧊 Make THIS dot completely non-interactive
      dot.style.pointerEvents = 'none';
      dot.removeAttribute('tabindex');
      dot.removeAttribute('role');
    }

    // ---------- HOVER / FOCUS from the box or overlay ----------
    if (!hoverTarget.hasAttribute('tabindex')) {
      hoverTarget.setAttribute('tabindex', '0');
    }
    if (!hoverTarget.hasAttribute('role')) {
      hoverTarget.setAttribute('role', 'button');
    }

    hoverTarget.addEventListener('mouseenter', () => {
      setHover(true);
    });

    hoverTarget.addEventListener('mouseleave', () => {
      setHover(false);
    });

    hoverTarget.addEventListener('focus', () => {
      setHover(true);
    });

    hoverTarget.addEventListener('blur', () => {
      setHover(false);
    });

    hoverTarget.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (typeof openFromArticle === 'function') {
          openFromArticle(article);
        }
      }
    });
  });
});




// Ensure each .meta-date has a child we can animate
document.querySelectorAll('.timeline-article .meta-date').forEach(md => {
  if (!md.querySelector('.dot-indicator')) {
    const s = document.createElement('span');
    s.className = 'dot-indicator';
    s.setAttribute('aria-hidden', 'true');
    md.appendChild(s);
  }
});



$(function () {
  // For every timeline on the page
  $('.horizontal-timeline').each(function () {
    var $tl = $(this);

    // Make/return the marker element
    function marker() {
      var $m = $tl.find('.slide-marker');
      if (!$m.length) {
        $m = $('<div class="slide-marker" role="status" aria-live="polite"></div>');
        $tl.find('.events-content').append($m);
      }
      return $m;
    }

    function updateMarker() {
      var $events = $tl.find('.events a');
      if (!$events.length) return;
      var total = $events.length;
      var idx = $events.index($events.filter('.selected'));
      if (idx < 0) idx = 0; // fallback if none selected yet
      marker().text((idx + 1) + '/' + total);
    }

    // Initial update (after plugin builds DOM)
    setTimeout(updateMarker, 400);

    // Update on plugin’s own events (fired by this build)
    $tl.on('initialised.horizontalTimeline eventChanged.horizontalTimeline', updateMarker);

    // Safety: update on direct date clicks too
    $tl.on('click', '.events a', function () {
      setTimeout(updateMarker, 0);
    });
  });
});










