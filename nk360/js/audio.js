document.addEventListener('DOMContentLoaded', () => {
  const globalAudio = new Audio();
  globalAudio.preload = 'auto';
  let currentWrapper = null;

  document.querySelectorAll('.audio-wrapper').forEach(wrapper => {
    const src = wrapper.dataset.audioSrc;
    const icon = wrapper.querySelector('.audio-icon');
    if (!src || !icon) return;

    // Accessibility
    wrapper.setAttribute('role', 'button');
    wrapper.setAttribute('tabindex', '0');
    const audioText = wrapper.textContent.trim();
    wrapper.setAttribute('aria-label', `Play audio pronunciation of ${audioText}`);

    const ICONS = {
      default: '/nk360/american-revolution-perseverance/assets/images/volume_up.png',
      hover: '/nk360/american-revolution-perseverance/assets/images/volume_up_filled.svg',
      playing: '/nk360/american-revolution-perseverance/assets/images/volume_off.svg'
    };

    /* -----------------------------------------
       CHAPTER REVIEW COLOR VARIANT (DISABLED)
       -----------------------------------------
    const isChapterReview = wrapper.closest('#chapter-review');
    const COLORS = isChapterReview
      ? { default: '#96B8DC', hover: '#81A9D5' }
      : { default: '#2B5582', hover: '#24476D' };
    ----------------------------------------- */

    // Global colors (used everywhere)
    const COLORS = {
      default: '#2B5582',
      hover: '#24476D'
    };

    // Init
    icon.dataset.state = 'default';
    icon.src = ICONS.default;
    wrapper.style.color = COLORS.default;
    wrapper.dataset.isHovering = 'false';

    // Hover visuals
    wrapper.addEventListener('mouseenter', () => {
      wrapper.dataset.isHovering = 'true';
      if (!wrapper.classList.contains('playing')) {
        icon.src = ICONS.hover;
        wrapper.style.color = COLORS.hover;
      }
    });

    wrapper.addEventListener('mouseleave', () => {
      wrapper.dataset.isHovering = 'false';
      if (!wrapper.classList.contains('playing')) {
        icon.src = ICONS.default;
        wrapper.style.color = COLORS.default;
      }
    });

    // Toggle audio
    const toggleAudio = async (e) => {
      e.preventDefault();

      // Stop previously playing audio
      if (currentWrapper && currentWrapper !== wrapper) {
        currentWrapper.classList.remove('playing');
        const prevIcon = currentWrapper.querySelector('.audio-icon');
        const prevIsHovering = currentWrapper.dataset.isHovering === 'true';

        prevIcon.src = prevIsHovering ? ICONS.hover : ICONS.default;
        currentWrapper.style.color = prevIsHovering
          ? COLORS.hover
          : COLORS.default;

        globalAudio.pause();
        globalAudio.currentTime = 0;
      }

      // Stop same audio
      if (wrapper.classList.contains('playing')) {
        wrapper.classList.remove('playing');
        globalAudio.pause();
        globalAudio.currentTime = 0;
        currentWrapper = null;

        icon.src = wrapper.dataset.isHovering === 'true'
          ? ICONS.hover
          : ICONS.default;

        wrapper.style.color = wrapper.dataset.isHovering === 'true'
          ? COLORS.hover
          : COLORS.default;

        return;
      }

      // Start audio
      currentWrapper = wrapper;
      globalAudio.src = src;

      try {
        await globalAudio.play();
        wrapper.classList.add('playing');
        icon.src = ICONS.playing;
        wrapper.style.color = COLORS.default;
      } catch (err) {
        console.warn('Playback failed:', err);
      }
    };

    wrapper.addEventListener('click', toggleAudio);
    wrapper.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        toggleAudio(e);
      }
    });
  });

  globalAudio.addEventListener('ended', () => {
    if (!currentWrapper) return;

    const icon = currentWrapper.querySelector('.audio-icon');

    /* -----------------------------------------
       CHAPTER REVIEW COLOR VARIANT (DISABLED)
       -----------------------------------------
    const isChapterReview = currentWrapper.closest('#chapter-review');
    const COLORS = isChapterReview
      ? { default: '#96B8DC', hover: '#81A9D5' }
      : { default: '#2B5582', hover: '#24476D' };
    ----------------------------------------- */

    const COLORS = {
      default: '#2B5582',
      hover: '#24476D'
    };

    const ICONS = {
      default: '/nk360/american-revolution-perseverance/assets/images/volume_up.png',
      hover: '/nk360/american-revolution-perseverance/assets/images/volume_up_filled.svg'
    };

    currentWrapper.classList.remove('playing');

    if (currentWrapper.dataset.isHovering === 'true') {
      icon.src = ICONS.hover;
      currentWrapper.style.color = COLORS.hover;
    } else {
      icon.src = ICONS.default;
      currentWrapper.style.color = COLORS.default;
    }

    currentWrapper = null;
  });
});
