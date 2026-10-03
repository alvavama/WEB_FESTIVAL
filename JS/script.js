(function () {
    'use strict';

    var nav = document.querySelector('nav');
    var menuButton = document.querySelector('.burger');
    var menu = document.getElementById('menu');

    var mobileQuery = window.matchMedia ? window.matchMedia('(max-width: 768px)') : null;

    function isMobile() {
        return mobileQuery ? mobileQuery.matches : window.innerWidth <= 768;
    }

    function openMenu() {
        menu.classList.add('is-open');
        document.body.classList.add('menu-open');
        nav.classList.remove('nav--hidden');
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

        var links = menu.querySelectorAll('a');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', closeMenu);
        }

        document.addEventListener('keydown', function (event) {
            if ((event.key === 'Escape' || event.keyCode === 27) && menu.classList.contains('is-open')) {
                closeMenu();
                menuButton.focus();
            }
        });
    }

        var lastScrollY = window.pageYOffset;
    var ticking = false;
    var DELTA = 8;

    function updateNav() {
        var currentY = window.pageYOffset;

        if (currentY > 20) {
            nav.classList.add('is-scrolled');
        } else {
            nav.classList.remove('is-scrolled');
        }

        if (!isMobile() || menu.classList.contains('is-open') || currentY <= 0) {
            nav.classList.remove('nav--hidden');
            lastScrollY = currentY;
            ticking = false;
            return;
        }

        var diff = currentY - lastScrollY;

        if (Math.abs(diff) > DELTA) {
            if (diff > 0 && currentY > nav.offsetHeight) {
                nav.classList.add('nav--hidden');
            } else if (diff < 0) {
                nav.classList.remove('nav--hidden');
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

        nav.addEventListener('focusin', function () {
            nav.classList.remove('nav--hidden');
        });

        window.addEventListener('resize', function () {
            if (!isMobile()) {
                closeMenu();
                nav.classList.remove('nav--hidden');
            }
        });

        updateNav();
    }
})();

function costeTotal() {
    let numeroEntradas = document.getElementById("numero").value;
    let costePorEntrada = 0;
    let valorExposicion = document.getElementById("exposicion").value;
    if (valorExposicion === "e1") {
        costePorEntrada = 15;
    } else if (valorExposicion === "e2") {
        costePorEntrada = 20;
    }
    let costeEntradas = (numeroEntradas * costePorEntrada) + " €";
    document.getElementById("coste").innerHTML = costeEntradas;
}

function comprar() {
    let nombre = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellidos").value;
    let telefono = document.getElementById("telefono").value;
    let numeroEntradas = document.getElementById("numero").value;
    let valorExposicion = document.getElementById("exposicion").value;

    let error = "";
    if (nombre === "") {
        error = "Error";
    } else if (apellidos === "") {
        error = "Error";
    } else if (telefono === "") {
        error = "Error";
    } else if (numeroEntradas === "") {
        error = "Error";
    } else if (valorExposicion === "") {
        error = "Error";
    }
    document.getElementById("error").innerHTML = error;

    if (error === "") {
        let nombreExposicion = "";
        if (valorExposicion === "e1") {
            nombreExposicion = "Reducida (-25 años/+60) - 15 €";
        } else {
            nombreExposicion = "General - 20 €";
        }
        document.getElementById("nom").innerHTML = nombre;
        document.getElementById("ape").innerHTML = apellidos;
        document.getElementById("tel").innerHTML = telefono;
        document.getElementById("ex").innerHTML = nombreExposicion;
        document.getElementById("num").innerHTML = numeroEntradas;
        document.getElementById("ct").innerHTML = document.getElementById("coste").innerHTML;
        document.getElementById("modal-compra").style.display = "flex";
    }
    return false;
}

function cerrarVentana() {
    document.getElementById("modal-compra").style.display = "none";
}
