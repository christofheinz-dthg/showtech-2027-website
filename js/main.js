import translations from './translations.js';

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

    // 3c. Language Switcher Dropdown
    const langSwitcherDropdown = document.getElementById('langSwitcherDropdown');
    const langSwitcherBtn = document.getElementById('langSwitcherBtn');
    const langDropdownItems = document.querySelectorAll('.lang-dropdown-item');
    const currentLangText = document.querySelector('.current-lang');

    function applyTranslations(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const text = translations[lang] ? translations[lang][key] : null;
            if (text !== null && text !== undefined) {
                if (el.tagName === 'INPUT') {
                    el.placeholder = text;
                } else if (el.tagName === 'IMG') {
                    el.alt = text;
                } else if (el.hasAttribute('aria-label')) {
                    el.setAttribute('aria-label', text);
                } else {
                    el.innerHTML = text;
                }
            }
        });
        
        // Update language toggle buttons visual state
        langDropdownItems.forEach(item => {
            if (item.getAttribute('data-lang') === lang) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        if (currentLangText) {
            currentLangText.textContent = lang.toUpperCase();
        }
        
        // Update active indicator if it's currently showing Menu/Menü or if it needs to update a section name
        const activeIndicator = document.getElementById('headerSectionIndicator');
        if (activeIndicator) {
            const indicatorText = activeIndicator.querySelector('.indicator-text');
            if (indicatorText) {
                const textVal = indicatorText.textContent.trim();
                if (textVal === 'Menu' || textVal === 'Menü' || !textVal) {
                    indicatorText.textContent = lang === 'en' ? 'Menu' : 'Menü';
                } else {
                    const activeLink = document.querySelector('.nav-overlay-inner a.nav-overlay-link.active');
                    if (activeLink) {
                        indicatorText.textContent = activeLink.textContent.trim();
                    }
                }
            }
        }

        // Save lang selection in localStorage
        localStorage.setItem('showtech_lang', lang);
    }

    if (langSwitcherBtn && langSwitcherDropdown) {
        langSwitcherBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = langSwitcherDropdown.classList.contains('open');
            if (isOpen) {
                langSwitcherDropdown.classList.remove('open');
                langSwitcherBtn.setAttribute('aria-expanded', 'false');
            } else {
                langSwitcherDropdown.classList.add('open');
                langSwitcherBtn.setAttribute('aria-expanded', 'true');
            }
        });

        // Click on item
        langDropdownItems.forEach(item => {
            item.addEventListener('click', () => {
                const lang = item.getAttribute('data-lang');
                applyTranslations(lang);

                // Close dropdown
                langSwitcherDropdown.classList.remove('open');
                langSwitcherBtn.setAttribute('aria-expanded', 'false');
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!langSwitcherDropdown.contains(e.target)) {
                langSwitcherDropdown.classList.remove('open');
                langSwitcherBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Load saved language or fallback to 'de'
    const savedLang = localStorage.getItem('showtech_lang') || 'de';
    applyTranslations(savedLang);

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
    const activeIndicator = document.getElementById('headerSectionIndicator');

    function openMenu() {
        navOverlay.classList.add('open');
        if (header) {
            header.classList.add('menu-active');
        }
        if (menuToggle) {
            menuToggle.classList.add('open');
            menuToggle.setAttribute('aria-expanded', 'true');
        }
        navOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (activeIndicator) {
            activeIndicator.classList.add('menu-open');
            activeIndicator.classList.add('visible');
            const indicatorText = activeIndicator.querySelector('.indicator-text');
            if (indicatorText && !indicatorText.textContent.trim()) {
                const currentLang = localStorage.getItem('showtech_lang') || 'de';
                indicatorText.textContent = currentLang === 'en' ? 'Menu' : 'Menü';
            }
        }
    }

    function closeMenu() {
        navOverlay.classList.remove('open');
        if (header) {
            header.classList.remove('menu-active');
        }
        if (menuToggle) {
            menuToggle.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
        navOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (activeIndicator) {
            activeIndicator.classList.remove('menu-open');
        }
        // Recalculate sticky indicator visibility based on current scroll position
        handleStickyHeaderIndicator();
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

    // ── Exhibitors Slider ────────────────────────────────────────────
    const exhibitorTrack = document.getElementById('exhibitorTrack');
    if (exhibitorTrack) {
        const baseUrl = window.LANDINGPAGE_URL || '';
        const logos = [
            { name: "Gerriets", url: baseUrl + "assets/logos/gerriets.jpg" },
            { name: "Multisenses", url: baseUrl + "assets/logos/multisenses.png" },
            { name: "Müller BBM", url: baseUrl + "assets/logos/mueller_bbm.png" },
            { name: "VBG", url: baseUrl + "assets/logos/vbg.png" },
            { name: "WilhelmWestholt", url: baseUrl + "assets/logos/westholt.png" },
            { name: "PAN Acoustics", url: baseUrl + "assets/logos/pan_acoustics.png" },
            { name: "Shure", url: baseUrl + "assets/logos/shure.png" },
            { name: "SBS Bühnentechnik", url: baseUrl + "assets/logos/sbs_buehnentechnik.png" },
            { name: "Kunkel Consulting", url: baseUrl + "assets/logos/kunkel.png" },
            { name: "A. Hausmann GmbH", url: baseUrl + "assets/logos/hausmann.png" },
        ];

        [...logos, ...logos, ...logos].forEach(({ name, url }) => {
            const div = document.createElement('div');
            div.className = 'logo-item';
            const img = document.createElement('img');
            img.src = url;
            img.alt = name;
            div.appendChild(img);
            exhibitorTrack.appendChild(div);
        });
    }

    // ── Mobile Card Flip on Scroll (Stages Section) ──────────────────
    function handleMobileFlip() {
        if (window.innerWidth > 768) {
            // Remove active class on desktop size to allow normal CSS hover
            document.querySelectorAll('.flip-card').forEach(card => {
                card.classList.remove('active');
            });
            return;
        }

        const cards = document.querySelectorAll('.flip-card');
        const centerY = window.innerHeight / 2;

        let closestCard = null;
        let minDistance = Infinity;

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenterY = rect.top + rect.height / 2;
            const distance = Math.abs(centerY - cardCenterY);

            if (distance < minDistance) {
                minDistance = distance;
                closestCard = card;
            }
        });

        cards.forEach(card => {
            // Only flip the card closest to center, and only if it's reasonably near the center (within 220px)
            if (card === closestCard && minDistance < 220) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    // ── Mobile Timeline Highlight on Scroll (Road to Showtech Section) ────
    function handleMobileTimelineActive() {
        if (window.innerWidth > 768) {
            // Remove active-scroll class on desktop size to allow normal CSS hover
            document.querySelectorAll('.timeline-new-item').forEach(item => {
                item.classList.remove('active-scroll');
            });
            return;
        }

        const items = document.querySelectorAll('.timeline-new-item');
        const centerY = window.innerHeight / 2;

        let closestItem = null;
        let minDistance = Infinity;

        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemCenterY = rect.top + rect.height / 2;
            const distance = Math.abs(centerY - itemCenterY);

            if (distance < minDistance) {
                minDistance = distance;
                closestItem = item;
            }
        });

        items.forEach(item => {
            // Only highlight the item closest to center, and only if it's reasonably near the center (within 250px)
            if (item === closestItem && minDistance < 250) {
                item.classList.add('active-scroll');
            } else {
                item.classList.remove('active-scroll');
            }
        });
    }

    // ── Sticky Navigation Section Indicator ──────────────────────────
    function handleStickyHeaderIndicator() {
        // If the menu is open, make sure the indicator remains visible and is not modified by scroll events
        const indicator = document.getElementById('headerSectionIndicator');
        const indicatorText = indicator ? indicator.querySelector('.indicator-text') : null;
        
        if (navOverlay && navOverlay.classList.contains('open')) {
            if (indicator) {
                indicator.classList.add('visible');
                // Ensure text is not empty
                if (indicatorText && !indicatorText.textContent.trim()) {
                    indicatorText.textContent = 'Menü';
                }
            }
            return;
        }

        const sectionIds = [
            'factsandfigures',
            'exhibitor2027',
            'moreinfo',
            'booking',
            'stages',
            'venue',
            'timeline',
            'faq'
        ];

        let activeSectionId = null;
        const threshold = 120;
        
        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                const rect = el.getBoundingClientRect();
                if (el.id === 'factsandfigures') {
                    // Slight adjustments for facts section boundaries
                    if (rect.top <= threshold + 50 && rect.bottom >= threshold) {
                        activeSectionId = id;
                    }
                } else {
                    if (rect.top <= threshold && rect.bottom >= threshold) {
                        activeSectionId = id;
                    }
                }
            }
        });

        if (!activeSectionId && window.scrollY > 300) {
            let closestSec = null;
            let closestDist = Infinity;
            sectionIds.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    const dist = Math.abs(rect.top - threshold);
                    if (dist < closestDist) {
                        closestDist = dist;
                        closestSec = id;
                    }
                }
            });
            activeSectionId = closestSec;
        }

        const heroEl = document.getElementById('hero');
        if (heroEl) {
            const rect = heroEl.getBoundingClientRect();
            if (rect.bottom > threshold) {
                activeSectionId = null;
            }
        }

        const overlayLinks = document.querySelectorAll('.nav-overlay-inner a.nav-overlay-link');
        overlayLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Mobile vs Desktop handling
        if (window.innerWidth <= 768) {
            // On mobile, indicator is visible if the header is scrolled (sticky state active)
            const isHeaderScrolled = header && header.classList.contains('scrolled');
            if (indicator) {
                if (isHeaderScrolled) {
                    indicator.classList.add('visible');
                    header.classList.add('has-active-section');
                    if (activeSectionId) {
                        const navLink = document.querySelector(`.nav-overlay-inner a[href="#${activeSectionId}"]`);
                        if (navLink) {
                            navLink.classList.add('active');
                            if (indicatorText) {
                                indicatorText.textContent = navLink.textContent.trim();
                            }
                        }
                    } else {
                        // Display default menu text when at the top of the scrolled page
                        if (indicatorText) {
                            const currentLang = localStorage.getItem('showtech_lang') || 'de';
                            indicatorText.textContent = currentLang === 'en' ? 'Menu' : 'Menü';
                        }
                    }
                } else {
                    indicator.classList.remove('visible');
                    header.classList.remove('has-active-section');
                }
            }
        } else {
            // Desktop behavior: only visible when activeSectionId is set (scrolled past hero)
            if (activeSectionId) {
                header.classList.add('has-active-section');
                if (indicator) {
                    indicator.classList.add('visible');
                    
                    const navLink = document.querySelector(`.nav-overlay-inner a[href="#${activeSectionId}"]`);
                    if (navLink) {
                        navLink.classList.add('active');
                        if (indicatorText) {
                            indicatorText.textContent = navLink.textContent.trim();
                        }
                    }
                }
            } else {
                header.classList.remove('has-active-section');
                if (indicator) {
                    indicator.classList.remove('visible');
                }
            }
        }
    }

    if (activeIndicator) {
        activeIndicator.addEventListener('click', () => {
            if (navOverlay && navOverlay.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Attach listeners for scroll and resize
    window.addEventListener('scroll', handleMobileFlip, { passive: true });
    window.addEventListener('resize', handleMobileFlip);
    window.addEventListener('scroll', handleMobileTimelineActive, { passive: true });
    window.addEventListener('resize', handleMobileTimelineActive);
    window.addEventListener('scroll', handleStickyHeaderIndicator, { passive: true });
    window.addEventListener('resize', handleStickyHeaderIndicator);

    // Initial trigger
    handleMobileFlip();
    handleMobileTimelineActive();
    handleStickyHeaderIndicator();
});
