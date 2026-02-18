document.addEventListener('DOMContentLoaded', () => {

    // ── Sticky Header (Simplified & Robust) ─────────
    const header = document.querySelector('.site-header');

    function checkScroll() {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Initial check
    checkScroll();

    // Listener
    window.addEventListener('scroll', checkScroll, { passive: true });

    // 2. Hero Media Toggle
    const mediaBtns = document.querySelectorAll('.media-toggle-btn');
    const heroMediaLayers = document.querySelectorAll('.hero-media');

    mediaBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and layers
            mediaBtns.forEach(b => b.classList.remove('active'));
            heroMediaLayers.forEach(l => l.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding layer
            const targetType = btn.getAttribute('data-type'); // "video" or "images"
            if (targetType === 'video') {
                document.getElementById('hero-video').classList.add('active');
            } else {
                document.getElementById('hero-images').classList.add('active');
            }
        });
    });

    // 3. Why Attend Audience Toggle
    const toggleBtns = document.querySelectorAll('.audience-toggle-btn');
    const attendPanels = document.querySelectorAll('.why-attend-body');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleBtns.forEach(b => b.classList.remove('active'));
            attendPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const target = btn.getAttribute('data-audience');
            const panel = document.getElementById(`panel-${target}`);
            if (panel) panel.classList.add('active');
        });
    });

    // 3b. Hero Media Card Toggle (Photo / Video)
    const mediaCardBtns = document.querySelectorAll('.media-card-btn');
    mediaCardBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            mediaCardBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // 3c. Language Switcher
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // Future: swap content based on btn.dataset.lang
        });
    });

    // 4. Scroll-Driven Timeline (IntersectionObserver)
    const timelineSteps = document.querySelectorAll('.timeline-step');
    const timelineTrack = document.querySelector('.timeline-track');

    // Observer for revealing steps
    const observerOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px"
    };

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-step');
            }
        });
    }, observerOptions);

    timelineSteps.forEach(step => {
        timelineObserver.observe(step);
    });

    // 5. FAQ Editorial Accordion & Switch (Updated for new markup)
    const faqSwitchBtns = document.querySelectorAll('.tab-btn');
    const faqGroups = document.querySelectorAll('.faq-group');

    // Switch Logic (Visitor / Exhibitor)
    faqSwitchBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons
            faqSwitchBtns.forEach(b => b.classList.remove('active'));
            // Hide all groups
            faqGroups.forEach(g => g.classList.remove('active'));

            // Activate clicked button
            btn.classList.add('active');

            // Show target group
            const target = btn.getAttribute('data-target');
            const targetGroup = document.getElementById(`faq-${target}`);
            if (targetGroup) targetGroup.classList.add('active');
        });
    });

    // Accordion Logic (Dark Theme)
    const accordionHeaders = document.querySelectorAll('.accordion-header-dark');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement; // .accordion-item-dark
            const body = header.nextElementSibling; // .accordion-body-dark
            const isActive = item.classList.contains('active');

            // Optional: Close other items in the same group (Accordion behavior)
            const parentGroup = item.closest('.faq-group');
            if (parentGroup) {
                const siblings = parentGroup.querySelectorAll('.accordion-item-dark');
                siblings.forEach(sibling => {
                    if (sibling !== item) {
                        sibling.classList.remove('active');
                        // Reset max-height if set via JS (though we might use CSS only if simple, but JS is smoother)
                        const siblingBody = sibling.querySelector('.accordion-body-dark');
                        if (siblingBody) siblingBody.style.maxHeight = null;

                        // Update icon if needed (handled by CSS generally via .active class)
                        const icon = sibling.querySelector('.acc-icon');
                        if (icon) icon.textContent = '+';
                    }
                });
            }

            // Toggle current item
            item.classList.toggle('active');

            // Handle Icon
            const icon = header.querySelector('.acc-icon');
            if (item.classList.contains('active')) {
                if (icon) icon.textContent = '−'; // Minus sign
                body.style.maxHeight = body.scrollHeight + 'px';
            } else {
                if (icon) icon.textContent = '+';
                body.style.maxHeight = null;
            }
        });
    });



    // 5. Nav Overlay Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navOverlay = document.getElementById('navOverlay');

    function openMenu() {
        navOverlay.classList.add('open');
        menuToggle.classList.add('open');
        menuToggle.setAttribute('aria-expanded', 'true');
        navOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navOverlay.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        navOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (menuToggle && navOverlay) {
        menuToggle.addEventListener('click', () => {
            navOverlay.classList.contains('open') ? closeMenu() : openMenu();
        });

        // Close when a nav link is clicked
        navOverlay.querySelectorAll('.nav-overlay-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close on Escape key
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeMenu();
        });
    }

    // ── Venue Photo Slider ──────────────────────────────────────────
    const venueSlides = document.querySelectorAll('.venue-slide');
    const venueDots = document.querySelectorAll('.venue-dot');
    const venuePrev = document.getElementById('venuePrev');
    const venueNext = document.getElementById('venueNext');
    let venueIndex = 0;
    let venueTimer;

    function goToVenueSlide(n) {
        venueSlides[venueIndex].classList.remove('active');
        venueDots[venueIndex].classList.remove('active');
        venueIndex = (n + venueSlides.length) % venueSlides.length;
        venueSlides[venueIndex].classList.add('active');
        venueDots[venueIndex].classList.add('active');
    }

    function startVenueAuto() {
        venueTimer = setInterval(() => goToVenueSlide(venueIndex + 1), 5000);
    }

    function resetVenueAuto() {
        clearInterval(venueTimer);
        startVenueAuto();
    }

    if (venueSlides.length) {
        venuePrev && venuePrev.addEventListener('click', () => { goToVenueSlide(venueIndex - 1); resetVenueAuto(); });
        venueNext && venueNext.addEventListener('click', () => { goToVenueSlide(venueIndex + 1); resetVenueAuto(); });
        venueDots.forEach(dot => {
            dot.addEventListener('click', () => { goToVenueSlide(+dot.dataset.index); resetVenueAuto(); });
        });
        startVenueAuto();
    }

    // ── Venue Video Play Button ──────────────────────────────────────
    const venuePlayBtn = document.getElementById('venuePlayBtn');
    const venueVideoThumb = document.getElementById('venueVideoThumb');
    const venueVideoFrame = document.getElementById('venueVideoFrame');
    const venueYouTube = document.getElementById('venueYouTube');

    if (venuePlayBtn) {
        venuePlayBtn.addEventListener('click', () => {
            // Load the iframe src (triggers autoplay)
            venueYouTube.src = venueYouTube.dataset.src;
            venueVideoThumb.style.display = 'none';
            venueVideoFrame.style.display = 'block';
            // Pause auto-advance while video is playing
            clearInterval(venueTimer);
        });
    }

    // ── Hero Collage: One-time Init (Static) ──────────
    // Auto-rotation disabled per user request. 
    // Images are static as defined in HTML.

    // ── Venue Accordion ─────────────────────────────────────────────
    document.querySelectorAll('.venue-acc-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.venue-acc-item');
            const isOpen = item.classList.contains('open');
            // Close all
            document.querySelectorAll('.venue-acc-item').forEach(i => i.classList.remove('open'));
            // Toggle clicked
            if (!isOpen) item.classList.add('open');
            header.setAttribute('aria-expanded', !isOpen);
        });
    });
});
