const loader = document.getElementById('loader');
  loader.addEventListener('click', () => {
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 600);
  });
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 600);
    }, 2000);
  });

  // ── CURSOR ──
  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursorDot');
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    dot.style.left    = e.clientX + 'px';
    dot.style.top     = e.clientY + 'px';
  });

  // ── PROGRESS BAR ──
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    document.getElementById('progressBar').style.width = pct + '%';
  });

  // ── PARTICLES ──
  tsParticles.load('particles', {
    particles: {
      number: { value: 60 },
      color: { value: ['#8b5cf6','#00d4ff'] },
      links: { enable: true, color: '#8b5cf6', opacity: 0.2 },
      move: { enable: true, speed: 0.8 },
      size: { value: { min: 1, max: 3 } },
      opacity: { value: 0.4 }
    },
    interactivity: {
      events: { onHover: { enable: true, mode: 'repulse' } }
    }
  });

  // ── REVEAL ON SCROLL ──
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
  }, { threshold: 0.1 });
  reveals.forEach(r => revealObs.observe(r));

  // ── COUNTERS ──
  document.querySelectorAll('.counter').forEach(c => {
    const target = +c.dataset.target;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        let n = 0;
        const step = Math.ceil(target / 40);
        const t = setInterval(() => {
          n = Math.min(n + step, target);
          c.textContent = n + (target === 100 ? '%' : '+');
          if (n >= target) clearInterval(t);
        }, 40);
        obs.disconnect();
      }
    });
    obs.observe(c);
  });

  // ── SKILL BARS ──
  document.querySelectorAll('.skill-bar-fill').forEach(bar => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        bar.style.width = bar.dataset.width;
        obs.disconnect();
      }
    });
    obs.observe(bar);
  });

  // ── SKILLS CAROUSEL ──
  const track = document.getElementById('skillsTrack');
  let idx = 0;
  document.getElementById('nextSkill').addEventListener('click', () => {
    const cards = track.children;
    const w = cards[0].offsetWidth + 24;
    const max = cards.length - 3;
    if (idx < max) { idx++; track.style.transform = `translateX(-${idx * w}px)`; }
  });
  document.getElementById('prevSkill').addEventListener('click', () => {
    if (idx > 0) {
      idx--;
      const w = track.children[0].offsetWidth + 24;
      track.style.transform = `translateX(-${idx * w}px)`;
    }
  });

  // ── VANILLA TILT ──
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.tilt'), { max: 15, speed: 400, glare: true, 'max-glare': 0.2 });
  }

  // ── SIDEBAR ACTIVE ──
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.sidebar-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  });

  // ── MOBILE MENU ──
  document.getElementById('menuBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('show');
  });

  // ── DARK / LIGHT MODE ──
  const toggle = document.getElementById('modeToggle');
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    toggle.innerHTML = document.body.classList.contains('light')
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  });

  // ── THEME COLOR ──
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.documentElement.style.setProperty('--primary', btn.dataset.color);
    });
  });

  // ── SEND BUTTON ──
  document.getElementById('sendBtn').addEventListener('click', () => {
    document.getElementById('popup').classList.add('show');
  });

  // ── GSAP SCROLL ANIMATIONS ──
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.hero-title', { duration: 1.2, y: 60, opacity: 0, ease: 'power4.out', delay: 0.2 });
