(function () {
    var header = document.getElementById('siteHeader');
    var toggle = document.querySelector('.menu-toggle');
    var mobileNav = document.getElementById('mobileNav');

    function onScroll() {
        if (!header) return;
        if (header.classList.contains('is-solid')) {
            header.classList.add('is-scrolled');
            return;
        }
        header.classList.toggle('is-scrolled', window.scrollY > 24);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toggle && mobileNav) {
        toggle.addEventListener('click', function () {
            var open = mobileNav.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        });

        mobileNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileNav.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-label', 'Open menu');
            });
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
                mobileNav.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-label', 'Open menu');
            }
        });
    }

    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(function (el) { io.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }

    // Contact / booking inquiry forms
    document.querySelectorAll('[data-inquiry-form]').forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var status = form.querySelector('[data-form-status]');
            var name = (form.querySelector('[name="name"]') || {}).value || '';
            var email = (form.querySelector('[name="email"]') || {}).value || '';
            var phone = (form.querySelector('[name="phone"]') || {}).value || '';
            var message = (form.querySelector('[name="message"]') || {}).value || '';
            var checkIn = (form.querySelector('[name="checkin"]') || {}).value || '';
            var checkOut = (form.querySelector('[name="checkout"]') || {}).value || '';
            var guests = (form.querySelector('[name="guests"]') || {}).value || '';
            var room = (form.querySelector('[name="room"]') || {}).value || '';

            name = name.trim();
            email = email.trim();
            phone = phone.trim();
            message = message.trim();

            if (!name || !email || !message) {
                if (status) {
                    status.textContent = 'Please fill in your name, email, and message.';
                    status.classList.add('is-visible');
                }
                return;
            }

            var subject = encodeURIComponent(
                (form.dataset.inquiryForm === 'book' ? 'Booking Inquiry from ' : 'Website Inquiry from ') + name
            );

            var lines = [
                'Name: ' + name,
                'Email: ' + email,
                'Phone: ' + phone
            ];

            if (checkIn) lines.push('Check-in: ' + checkIn);
            if (checkOut) lines.push('Check-out: ' + checkOut);
            if (guests) lines.push('Guests: ' + guests);
            if (room) lines.push('Room preference: ' + room);

            lines.push('', 'Message:', message);

            var body = encodeURIComponent(lines.join('\n'));
            window.location.href = 'mailto:seascapeinnhampton@gmail.com?subject=' + subject + '&body=' + body;

            if (status) {
                status.textContent = 'Opening your email app with the message ready to send.';
                status.classList.add('is-visible');
            }

            form.reset();
        });
    });

    // Gallery lightbox
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightboxImage');
    var lightboxCaption = document.getElementById('lightboxCaption');
    var lightboxClose = document.getElementById('lightboxClose');

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function openLightbox(src, caption) {
        if (!lightbox || !lightboxImg) return;
        lightboxImg.src = src;
        lightboxImg.alt = caption || '';
        if (lightboxCaption) lightboxCaption.textContent = caption || '';
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (lightboxClose) lightboxClose.focus();
    }

    document.querySelectorAll('[data-lightbox]').forEach(function (trigger) {
        trigger.addEventListener('click', function () {
            var img = trigger.querySelector('img');
            if (!img) return;
            var full = trigger.getAttribute('data-full') || img.src;
            var caption = trigger.getAttribute('data-caption') || (img.alt || '');
            openLightbox(full, caption);
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLightbox();
    });

    // Prefill room preference from query string on book page
    var params = new URLSearchParams(window.location.search);
    var roomParam = params.get('room');
    var roomSelect = document.querySelector('select[name="room"]');
    if (roomParam && roomSelect) {
        roomSelect.value = roomParam;
    }
})();
