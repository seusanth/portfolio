/* ==========================================================================
   Santh Designer — Interações do portfólio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    /* ------------------------- Cabeçalho e menu ------------------------- */
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');

    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const closeMenu = () => {
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
    };

    menuToggle.addEventListener('click', () => {
        const open = document.body.classList.toggle('menu-open');
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

    /* ---------------------- Animação de entrada ------------------------ */
    const revealItems = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, i) => {
            if (!entry.isIntersecting) return;
            entry.target.style.transitionDelay = `${Math.min(i * 70, 280)}ms`;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealItems.forEach(item => revealObserver.observe(item));

    /* ------------------------- Barras de skills ------------------------ */
    document.querySelectorAll('.skill').forEach(skill => {
        skill.style.setProperty('--level', skill.dataset.level);
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.4 });
        observer.observe(skill);
    });

    /* ---------------------- Link ativo na navegação -------------------- */
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = [...nav.querySelectorAll('a')];
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        });
    }, { threshold: 0, rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(section => sectionObserver.observe(section));

    /* -------------------------- Filtros -------------------------------- */
    const filters = document.querySelectorAll('.filter');
    const cards = [...document.querySelectorAll('.project-card')];

    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            const value = filter.dataset.filter;
            filters.forEach(btn => btn.classList.toggle('active', btn === filter));
            cards.forEach(card => {
                const show = value === 'todos' || card.dataset.category === value;
                card.classList.toggle('is-hidden', !show);
                if (show) card.classList.add('is-visible');
            });
        });
    });

    /* -------------------------- Lightbox ------------------------------- */
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const closeButton = document.getElementById('lightboxClose');
    const prevButton = document.getElementById('lightboxPrev');
    const nextButton = document.getElementById('lightboxNext');
    let visibleCards = [];
    let currentIndex = 0;

    const render = () => {
        const card = visibleCards[currentIndex];
        const img = card.querySelector('img');
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxTitle.textContent = card.dataset.title;
        lightboxDescription.textContent = card.dataset.description;
    };

    const openLightbox = card => {
        visibleCards = cards.filter(item => !item.classList.contains('is-hidden'));
        currentIndex = visibleCards.indexOf(card);
        render();
        lightbox.hidden = false;
        document.body.classList.add('lightbox-open');
        closeButton.focus();
    };

    const closeLightbox = () => {
        lightbox.hidden = true;
        document.body.classList.remove('lightbox-open');
        lightboxImage.src = '';
    };

    const step = direction => {
        currentIndex = (currentIndex + direction + visibleCards.length) % visibleCards.length;
        render();
    };

    cards.forEach(card => card.addEventListener('click', () => openLightbox(card)));
    closeButton.addEventListener('click', closeLightbox);
    prevButton.addEventListener('click', () => step(-1));
    nextButton.addEventListener('click', () => step(1));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

    window.addEventListener('keydown', e => {
        if (lightbox.hidden) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') step(-1);
        if (e.key === 'ArrowRight') step(1);
    });

    /* ----------------------------- Rodapé ------------------------------ */
    document.getElementById('year').textContent = new Date().getFullYear();
});
