document.addEventListener('DOMContentLoaded', () => {
  const GAP   = 4;
  const CAP   = 1500;
  const MIN_W = 120;
  const MAX_W = 900;
  const START_W = 120;                 // 

  const tl = document.querySelector('.tl-static');
  if (!tl) return;

  const track = tl.querySelector('.tl-track');
  const leftMarker  = track.querySelector('.marker.left-marker');
  const rightMarker = track.querySelector('.marker.right-marker');
  if (!leftMarker || !rightMarker) return;

  // set an initial width immediately
  track.style.setProperty('--tl-top-w', `${START_W}px`);

  function computeWidth() {
    const tr = track.getBoundingClientRect();
    const l  = leftMarker.getBoundingClientRect();
    const r  = rightMarker.getBoundingClientRect();

    const leftCenter  = (l.left + l.right) / 2 - tr.left;
    const rightCenter = (r.left + r.right) / 2 - tr.left;

    let distance = rightCenter - leftCenter;

    if (tr.width > CAP) {
      distance *= (CAP / tr.width);
    }

    const rawW = distance - GAP;
    const clamped = Math.max(MIN_W, Math.min(rawW, MAX_W));
    track.style.setProperty('--tl-top-w', `${clamped}px`);
  }

  computeWidth();
  window.addEventListener('resize', computeWidth, { passive: true });
});



// Bottom mobile timeline

(function(){
  const slides = [
    { year: '1774', text: 'American colonists’ violence against the Shawnee in the Ohio Valley also affects the Seneca and Cayuga.' },
    { year: 'November 11, 1775', text: '<span class="audio-wrapper" data-audio-src="/nk360/american-revolution-perseverance/assets/audio/Mohawk_Thayendanegea_Emerald-LeFort.mp3" tabindex="0"><span class="audio">Thayendanegea</span><img src="/nk360/american-revolution-perseverance/assets/images/volume_up.png" alt="sound icon" class="audio-icon"></span> (Joseph Brant) visits Britain to meet with British leaders and better understand the growing Revolutionary conflict.' },
    { year: 'June 11, 1776', text: 'Haudenosaunee leaders, including Oneida Chief <span class="audio-wrapper" data-audio-src="/nk360/american-revolution-perseverance/assets/audio/Oneida_Lakwilotákwas_Chelsea-Jocko.mp3" tabindex="0"><span class="audio">Lakwilotákwas</span><img src="/nk360/american-revolution-perseverance/assets/images/volume_up.png" alt="sound icon" class="audio-icon"></span> (Good Peter), are invited to Philadelphia to meet with the <span class="vocab-wrapper" tabindex="0" data-tippy-content-id="tooltip-continental-congress"><span class="vocab">Continental Congress</span><img src="/nk360/american-revolution-perseverance/assets/images/info_dark.svg" alt="vocab icon" class="vocab-icon"></span>.' },
    { year: 'August 6, 1777', text: 'Seneca and Mohawk warriors are drawn into the fight against the Americans and Oneida at the <span class="vocab-wrapper" tabindex="0" data-tippy-content-id="tooltip-stanwix"><span class="vocab">battle of Fort Stanwix</span><img src="/nk360/american-revolution-perseverance/assets/images/info_dark.svg" alt="vocab icon" class="vocab-icon"></span>.' }
  ];

  const root    = document.getElementById('miniTL');
  const stage   = root.querySelector('.mini-stage');
  const prevBtn = root.querySelector('.stl-prev');
  const nextBtn = root.querySelector('.stl-next');
  const counter = root.querySelector('.mini-counter');

    // Audio handler for mobile timeline only
  const mobileAudio = new Audio();
  mobileAudio.preload = 'auto';
  let currentMobileWrapper = null;
  
  const ICONS = {
    default: '/nk360/american-revolution-perseverance/assets/images/volume_up.png',
    hover: '/nk360/american-revolution-perseverance/assets/images/volume_up_filled.svg',
    playing: '/nk360/american-revolution-perseverance/assets/images/volume_off.svg'
  };
  
  function initMobileAudio() {
    stage.querySelectorAll('.audio-wrapper').forEach(wrapper => {
      const src = wrapper.dataset.audioSrc;
      const icon = wrapper.querySelector('.audio-icon');
      if (!src || !icon) return;

      // For mobile timeline - white icons, no color change
      icon.src = ICONS.default;
      wrapper.dataset.isHovering = 'false';

      wrapper.addEventListener('mouseenter', () => {
        wrapper.dataset.isHovering = 'true';
        if (!wrapper.classList.contains('playing')) {
          icon.src = ICONS.hover;
        }
      });

      wrapper.addEventListener('mouseleave', () => {
        wrapper.dataset.isHovering = 'false';
        if (!wrapper.classList.contains('playing')) {
          icon.src = ICONS.default;
        }
      });

      wrapper.addEventListener('click', async (e) => {
        e.preventDefault();

        // Stop currently playing
        if (currentMobileWrapper && currentMobileWrapper !== wrapper) {
          currentMobileWrapper.classList.remove('playing');
          const prevIcon = currentMobileWrapper.querySelector('.audio-icon');
          const prevIsHovering = currentMobileWrapper.dataset.isHovering === 'true';
          prevIcon.src = prevIsHovering ? ICONS.hover : ICONS.default;
          mobileAudio.pause();
          mobileAudio.currentTime = 0;
        }

        // Toggle play/stop
        if (wrapper.classList.contains('playing')) {
          wrapper.classList.remove('playing');
          mobileAudio.pause();
          mobileAudio.currentTime = 0;
          currentMobileWrapper = null;
          
          icon.src = wrapper.dataset.isHovering === 'true' ? ICONS.hover : ICONS.default;
          return;
        }

        // Start audio
        currentMobileWrapper = wrapper;
        mobileAudio.src = src;
        try {
          await mobileAudio.play();
          wrapper.classList.add('playing');
          icon.src = ICONS.playing;
        } catch (err) {
          console.warn('Playback failed:', err);
        }
      });
    });
  }
  
  mobileAudio.addEventListener('ended', () => {
    if (!currentMobileWrapper) return;
    const icon = currentMobileWrapper.querySelector('.audio-icon');
    currentMobileWrapper.classList.remove('playing');
    
    if (currentMobileWrapper.dataset.isHovering === 'true') {
      icon.src = ICONS.hover;
    } else {
      icon.src = ICONS.default;
    }
    
    currentMobileWrapper = null;
  });

  let i = 0;

  function render(idx){
    const s = slides[idx];
    stage.innerHTML = `
      <article class="mini-card" role="group" aria-roledescription="slide" aria-label="${idx+1} of ${slides.length}">
        <h3 class="tl-year">${s.year}</h3>
        <p class="tl-text">${s.text}</p>
      </article>`;
    counter.textContent = `${idx+1}/${slides.length}`;
    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx === slides.length - 1;
    initMobileAudio();
  }

  // wire up
  prevBtn.addEventListener('click', () => { if (i>0){ i--; render(i); prevBtn.focus(); }});
  nextBtn.addEventListener('click', () => { if (i<slides.length-1){ i++; render(i); nextBtn.focus(); }});

  // keyboard on the whole widget
  root.addEventListener('keydown', (e) => {
    const k = e.key.toLowerCase();
    if (k === 'arrowleft'  || k === 'a') prevBtn.click();
    if (k === 'arrowright' || k === 'd') nextBtn.click();
  });

  // simple swipe
  let sx = 0;
  stage.addEventListener('touchstart', e => sx = e.touches[0].clientX, {passive:true});
  stage.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) (dx < 0 ? nextBtn : prevBtn).click();
  }, {passive:true});

  render(i);
})();
