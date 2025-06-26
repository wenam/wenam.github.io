function typeWriter(bubble, text, speed = 22) {
  return new Promise(resolve => {
    let i = 0;
    bubble.innerHTML = '';
    bubble.classList.add('typing');
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '|';
    bubble.appendChild(cursor);

    function type() {
      if (i < text.length) {
        cursor.before(text[i]);
        i++;
        bubble.style.width = 'auto';
        setTimeout(type, speed);
      } else {
        cursor.remove();
        resolve();
      }
    }
    type();
  });
}

function animateChatBubbles(container) {
  const bubbles = Array.from(container.querySelectorAll('.chat-bubble'));
  let observer;
  let started = false;

  function startSequence() {
    if (started) return;
    started = true;
    let p = Promise.resolve();
    bubbles.forEach(bubble => {
      const text = bubble.getAttribute('data-text');
      p = p.then(() => typeWriter(bubble, text));
    });
  }

  observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      startSequence();
      observer.disconnect();
    }
  }, { threshold: 0.2 });

  observer.observe(container);
}

document.querySelectorAll('.chat-col').forEach(chatCol => {
  animateChatBubbles(chatCol);
});