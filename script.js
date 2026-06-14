document.addEventListener('DOMContentLoaded', () => {

  const logo = document.getElementById('logo');

  const typeText = document.getElementById("typeText");

  const text = "THE SITE WILL BE AVAILABLE SOON";
  let i = 0;

  const colors = [
    '#FFD700',
    '#FF4D6D',
    '#00D4FF',
    '#7CFF6B',
    '#FFFFFF',
    '#FF9F1C'
  ];

  function spawnConfetti() {

    const rect = logo.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const count = 120;

    for (let i = 0; i < count; i++) {

      const el = document.createElement('div');
      el.classList.add('confetti');

      el.style.background =
        colors[Math.floor(Math.random() * colors.length)];

      el.style.left = originX + 'px';
      el.style.top = originY + 'px';

      const angle = Math.random() * Math.PI * 2;
      const speed = 6 + Math.random() * 10;

      let vx = Math.cos(angle) * speed;
      let vy = Math.sin(angle) * speed - 6;

      let x = originX;
      let y = originY;

      const gravity = 0.25;
      const friction = 0.98;

      const size = 8 + Math.random() * 8;
      el.style.width = size + 'px';
      el.style.height = size + 'px';

      el.style.borderRadius =
        Math.random() > 0.5 ? '50%' : '3px';

      document.body.appendChild(el);

      function animate() {
        vx *= friction;
        vy *= friction;
        vy += gravity;

        x += vx;
        y += vy;

        el.style.transform =
          `translate(${x - originX}px, ${y - originY}px) rotate(${x + y}deg)`;

        if (y > window.innerHeight + 120) {
          el.remove();
        } else {
          requestAnimationFrame(animate);
        }
      }

      requestAnimationFrame(animate);
    }
  }

  function typeWriter() {
    if (i < text.length) {
      typeText.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 80);
    } else {
      // 💥 ВАЖНО: конфетти запускаются ТОЛЬКО ПОСЛЕ печати
      spawnConfetti();
    }
  }

  // старт через 2 секунды
  setTimeout(() => {
    typeWriter();
  }, 1000);

});