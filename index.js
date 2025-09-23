 
    /* Carousel (autoplay, dots, pause on hover, clickable dots) */
    (function(){
      const track = document.getElementById('track');
      const slides = track ? Array.from(track.children) : [];
      const dotsEl = document.getElementById('dots');
      if(!track || slides.length === 0) return;

      let current = 0;
      const delay = 3500;
      let timer = null;

      function createDots(){
        slides.forEach((_, i) => {
          const dot = document.createElement('button');
          dot.className = 'dot' + (i === 0 ? ' active' : '');
          dot.setAttribute('aria-label', 'Go to slide ' + (i+1));
          dot.dataset.index = i;
          dot.addEventListener('click', () => {
            current = i;
            goTo(current);
            restart();
          });
          dotsEl.appendChild(dot);
        });
      }

      function goTo(index){
        track.style.transform = `translateX(-${index * 100}%)`;
        Array.from(dotsEl.children).forEach((d, idx) => d.classList.toggle('active', idx === index));
      }

      function next(){
        current = (current + 1) % slides.length;
        goTo(current);
      }

      function start(){ timer = setInterval(next, delay); }
      function stop(){ if(timer){ clearInterval(timer); timer = null; } }
      function restart(){ stop(); start(); }

      // pause on hover/focus
      track.addEventListener('mouseenter', stop);
      track.addEventListener('mouseleave', start);
      track.addEventListener('focusin', stop);
      track.addEventListener('focusout', start);

      // keyboard support for dots (arrow navigation)
      document.addEventListener('keydown', (e) => {
        if(document.activeElement && document.activeElement.tagName === 'INPUT') return; // don't break typing
        if(e.key === 'ArrowRight') { next(); restart(); }
        if(e.key === 'ArrowLeft') { current = (current-1 + slides.length) % slides.length; goTo(current); restart(); }
      });

      createDots();
      goTo(0);
      start();
    })();

    /* Simple form handler (no backend) */
    function submitForm(evt){
      evt.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if(!name || !email || !message){
        alert('Please fill name, email and message.');
        return;
      }

      // Replace this with EmailJS, Formspree, or your backend integration as needed
      alert(`Thanks ${name} — message received!\n\nWe'll contact you at: ${email}`);
      evt.target.reset();
    }

 