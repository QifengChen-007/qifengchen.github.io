(function () {
    'use strict';

    var root = document.documentElement;
    var toggle = document.querySelector('.theme-toggle');
    var themeMeta = document.querySelector('meta[name="theme-color"]');

    function updateThemeControl() {
        var dark = root.dataset.theme === 'dark';
        toggle.setAttribute('aria-pressed', String(dark));
        toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
        toggle.querySelector('.theme-label').textContent = dark ? 'Day' : 'Night';
        toggle.querySelector('.theme-icon').textContent = dark ? '☼' : '☾';
        if (themeMeta) themeMeta.content = dark ? '#1d2622' : '#f4f1e8';
    }

    if (toggle) {
        toggle.hidden = false;
        updateThemeControl();
        toggle.addEventListener('click', function () {
            root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
            try { localStorage.setItem('qifeng-theme', root.dataset.theme); } catch (error) { /* Optional preference storage. */ }
            updateThemeControl();
        });
    }

    var links = Array.from(document.querySelectorAll('.nav-links a[data-section]'));
    var sections = links.map(function (link) { return document.getElementById(link.dataset.section); });
    var pending = false;

    function markCurrentSection() {
        var header = document.querySelector('.site-header');
        var offset = header ? header.getBoundingClientRect().height + 30 : 100;
        var current = 0;
        sections.forEach(function (section, index) {
            if (section && section.getBoundingClientRect().top <= offset) current = index;
        });
        if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = links.length - 1;
        links.forEach(function (link, index) {
            if (index === current) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
        pending = false;
    }

    function requestSectionUpdate() {
        if (!pending) { pending = true; window.requestAnimationFrame(markCurrentSection); }
    }

    window.addEventListener('scroll', requestSectionUpdate, { passive: true });
    window.addEventListener('resize', requestSectionUpdate);
    window.addEventListener('load', requestSectionUpdate);
    markCurrentSection();
}());
