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
    { year: 'April 16, 1779', text: 'An American general leads an army invasion through Mohawk and Onondaga territories, destroying homes and crops and forcing Haudenosaunee people to run for their lives. ' },
    { year: 'May 1779', text: 'General George Washington orders the destruction of Haudenosaunee towns and crops partly in response to British attacks, aided by Senecas and Mohawks, against American settlements.' },
    { year: 'June–October 1779', text: 'Under General Washington’s orders, American generals invade Haudenosaunee territory with the goal of destroying crops, killing animals, and capturing as many people as they can.' },
     { year: 'November 1779', text: 'After fleeing for their lives, Haudenosaunee people try to survive the harshest winter on record at Fort Niagara, where there is not enough room or supplies. Many lives are lost.' },
    { year: 'Spring 1780', text: 'After the winter thaw, many Haudenosaunee people return to their homes to rebuild. A multicultural community is established at Buffalo Creek, which becomes a thriving town by 1783.' }
  ];

  const root    = document.getElementById('miniTL');
  const stage   = root.querySelector('.mini-stage');
  const prevBtn = root.querySelector('.stl-prev');
  const nextBtn = root.querySelector('.stl-next');
  const counter = root.querySelector('.mini-counter');

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
