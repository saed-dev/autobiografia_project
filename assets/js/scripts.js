/* ============================================================
   AUTOBIOGRAFIA — Santos Eduardo Júnior
   scripts/main.js
   ============================================================ */

// ── 1. Barra de progresso de leitura ──────────────────────
const progressBar = document.getElementById('progressBar');

function updateProgress() {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const progress   = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
}

// ── 2. Header sticky com mudança de estilo ao scroll ──────
const siteHeader = document.getElementById('siteHeader');

function updateHeader() {
    siteHeader.classList.toggle('scrolled', window.scrollY > 80);
}

// ── 3. Ouvintes de scroll (agrupados para performance) ────
window.addEventListener('scroll', () => {
    updateProgress();
    updateHeader();
}, { passive: true });

// chamada inicial para definir estado correcto logo no carregamento
updateHeader();
updateProgress();


// ── 4. Slideshow hero ─────────────────────────────────────
const slides  = document.querySelectorAll('.slide');
const dots    = document.querySelectorAll('.dot');
let   current = 0;
let   slideInterval;

/**
 * Vai para o slide com o índice indicado.
 * @param {number} index
 */
function goToSlide(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');

    current = (index + slides.length) % slides.length; // wrap seguro

    slides[current].classList.add('active');
    dots[current].classList.add('active');
}

function nextSlide() {
    goToSlide(current + 1);
}

function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5500); // muda a cada 5,5 s
}

// Clique nos pontos de navegação
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        goToSlide(i);
        startSlideshow(); // reinicia o temporizador
    });
});

// Iniciar slideshow automático
startSlideshow();

// Pausa quando a página não está visível (economiza recursos)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(slideInterval);
    } else {
        startSlideshow();
    }
});


// ── 5. Menu hamburger (mobile) ────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

function toggleMenu() {
    const isOpen = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
    mobileNav.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);

// Fechar ao clicar num link
mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    });
});

// Fechar com tecla Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        toggleMenu();
        hamburger.focus();
    }
});


// ── 6. Revelação de elementos ao scroll ───────────────────
//    Usa Intersection Observer para fade-in + slide-up
const revealElements = document.querySelectorAll('.reveal-section, .reveal-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target); // anima apenas uma vez
        }
    });
}, {
    threshold:  0.1,
    rootMargin: '0px 0px -60px 0px' // activa um pouco antes de entrar totalmente
});

revealElements.forEach(el => revealObserver.observe(el));