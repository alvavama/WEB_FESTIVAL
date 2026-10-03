/* =========================================================
   MENÚ MÓVIL + NAV QUE SE OCULTA
   JavaScript nativo (ES5). Se carga al final del <body>.
   ========================================================= */
(function () {
    'use strict';

    var nav = document.querySelector('nav');
    var menuButton = document.querySelector('.burger');
    var menu = document.getElementById('menu');

    // ¿Estamos en móvil? Mismo punto de corte que en el CSS (768px)
    var mobileQuery = window.matchMedia ? window.matchMedia('(max-width: 768px)') : null;

    function isMobile() {
        return mobileQuery ? mobileQuery.matches : window.innerWidth <= 768;
    }

    /* ---------- 1. MENÚ MÓVIL A PANTALLA COMPLETA ---------- */
    // Solo ponemos y quitamos clases: las animaciones (transition) están en el CSS

    function openMenu() {
        menu.classList.add('is-open');
        document.body.classList.add('menu-open');      // bloquea el scroll de fondo
        nav.classList.remove('nav--hidden');           // el nav siempre visible con el menú abierto
        menuButton.setAttribute('aria-expanded', 'true');
        menuButton.setAttribute('aria-label', 'Cerrar menú');
    }

    function closeMenu() {
        menu.classList.remove('is-open');
        document.body.classList.remove('menu-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Abrir menú');
    }

    function toggleMenu() {
        if (menu.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    if (nav && menuButton && menu) {
        menuButton.addEventListener('click', toggleMenu);

        // Cerrar el menú al pulsar cualquier enlace
        // (bucle for clásico: en ES5 no usamos forEach sobre NodeList)
        var links = menu.querySelectorAll('a');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', closeMenu);
        }

        // Cerrar con la tecla Escape
        document.addEventListener('keydown', function (event) {
            if ((event.key === 'Escape' || event.keyCode === 27) && menu.classList.contains('is-open')) {
                closeMenu();
                menuButton.focus();
            }
        });
    }

    /* ---------- 2. NAV QUE SE OCULTA AL BAJAR (SOLO MÓVIL) ---------- */
    var lastScrollY = window.pageYOffset;
    var ticking = false;       // evita recalcular más de una vez por fotograma
    var DELTA = 8;             // px mínimos de scroll para reaccionar (evita temblores)

    function updateNav() {
        var currentY = window.pageYOffset;

        // Línea inferior del nav en cuanto se ha hecho algo de scroll
        if (currentY > 20) {
            nav.classList.add('is-scrolled');
        } else {
            nav.classList.remove('is-scrolled');
        }

        // En escritorio, con el menú abierto o arriba del todo: nav siempre visible
        if (!isMobile() || menu.classList.contains('is-open') || currentY <= 0) {
            nav.classList.remove('nav--hidden');
            lastScrollY = currentY;
            ticking = false;
            return;
        }

        var diff = currentY - lastScrollY;

        if (Math.abs(diff) > DELTA) {
            if (diff > 0 && currentY > nav.offsetHeight) {
                nav.classList.add('nav--hidden');      // bajando: ocultar
            } else if (diff < 0) {
                nav.classList.remove('nav--hidden');   // subiendo: mostrar
            }
            lastScrollY = currentY;
        }

        ticking = false;
    }

    if (nav && menu) {
        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(updateNav);
                ticking = true;
            }
        });

        // Si se navega con teclado y el foco entra en el nav, mostrarlo
        nav.addEventListener('focusin', function () {
            nav.classList.remove('nav--hidden');
        });

        // Al pasar a tamaño escritorio: cerrar el menú y mostrar el nav
        window.addEventListener('resize', function () {
            if (!isMobile()) {
                closeMenu();
                nav.classList.remove('nav--hidden');
            }
        });

        updateNav();
    }
})();
