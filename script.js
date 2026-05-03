/* ══════════════════════════════
   KINETIC TYPE · SCRIPT
══════════════════════════════ */

// ── 모달 ──
function handleSubmit(e) {
  e.preventDefault();
  document.getElementById('successModal').classList.add('active');
}
function closeModal() {
  document.getElementById('successModal').classList.remove('active');
}
document.getElementById('successModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// ── 스크롤 인터섹션 애니메이션 ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.tl-item, .card, .who-item, .what-text').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 100);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.tl-item, .card, .who-item, .what-text').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    obs.observe(el);
  });
});

// ── 마우스 커서 트레일 효과 ──
const trail = [];
const TRAIL_COUNT = 6;
for (let i = 0; i < TRAIL_COUNT; i++) {
  const dot = document.createElement('div');
  dot.style.cssText = `
    position: fixed; width: ${8 - i}px; height: ${8 - i}px;
    border-radius: 50%; pointer-events: none; z-index: 9999;
    background: ${i === 0 ? '#0057ff' : 'transparent'};
    border: 1px solid rgba(0,87,255,${0.6 - i * 0.08});
    transform: translate(-50%,-50%);
    transition: left ${i * 30 + 30}ms ease, top ${i * 30 + 30}ms ease;
  `;
  document.body.appendChild(dot);
  trail.push(dot);
}

document.addEventListener('mousemove', (e) => {
  trail.forEach(dot => {
    dot.style.left = e.clientX + 'px';
    dot.style.top  = e.clientY + 'px';
  });
});

// ── 타입 브레이크 호버 글리치 ──
document.querySelectorAll('.tb-outline').forEach(el => {
  el.addEventListener('mouseenter', () => {
    el.style.animation = 'glitch 0.3s steps(2) 2';
  });
  el.addEventListener('animationend', () => {
    el.style.animation = '';
  });
});

// ── 네비 스크롤 효과 ──
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 60) {
    nav.style.borderBottomColor = 'rgba(0,0,0,.15)';
  } else {
    nav.style.borderBottomColor = 'rgba(0,0,0,.08)';
  }
});

// ── 글리치 키프레임 동적 삽입 ──
const style = document.createElement('style');
style.textContent = `
  @keyframes glitch {
    0%   { transform: translate(0); filter: none; }
    25%  { transform: translate(-4px, 2px); filter: hue-rotate(90deg); }
    50%  { transform: translate(4px, -2px); filter: hue-rotate(180deg); }
    75%  { transform: translate(-2px, 4px); filter: hue-rotate(270deg); }
    100% { transform: translate(0); filter: none; }
  }
`;
document.head.appendChild(style);
