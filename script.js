/* ============================================================
   Selección Colombia — Lógica JavaScript
   Scroll suave · Menú móvil · Timeline acordeón · Filtros
   Datos dinámicos · IntersectionObserver · Año footer
   ============================================================ */

'use strict';

console.log("¡Bienvenido a la Selección Colombia!");

/* ===== 1. Datos de jugadores ===== */
const jugadores = [
    { nombre: "Carlos Valderrama", iniciales: "CV", era: "90s", posicion: "Mediocampista", partidos: 111, goles: 11, color: "#FFD700" },
    { nombre: "Freddy Rincón",   iniciales: "FR", era: "90s", posicion: "Mediocampista", partidos: 84,  goles: 17, color: "#CE0000" },
    { nombre: "René Higuita",    iniciales: "RH", era: "90s", posicion: "Portero",         partidos: 68,  goles: 3,  color: "#0033A0" },
    { nombre: "Faustino Asprilla", iniciales: "FA", era: "90s", posicion: "Delantero",     partidos: 57,  goles: 20, color: "#7B2D8E" },
    { nombre: "Iván Córdoba",    iniciales: "IC", era: "2000s", posicion: "Defensa",      partidos: 67,  goles: 5,  color: "#1B8E3B" },
    { nombre: "Mario Yepes",     iniciales: "MY", era: "2000s", posicion: "Defensa",      partidos: 102, goles: 6,  color: "#C0392B" },
    { nombre: "James Rodríguez", iniciales: "JR", era: "2010s", posicion: "Mediocampista", partidos: 98,  goles: 30, color: "#FFD700" },
    { nombre: "Radamel Falcao",  iniciales: "RF", era: "2010s", posicion: "Delantero",    partidos: 107, goles: 36, color: "#E74C3C" },
    { nombre: "David Ospina",    iniciales: "DO", era: "2010s", posicion: "Portero",      partidos: 128, goles: 0,  color: "#0033A0" },
    { nombre: "Juan Cuadrado",   iniciales: "JC", era: "2010s", posicion: "Defensa",      partidos: 117, goles: 12, color: "#2E86C1" },
    { nombre: "Luis Díaz",       iniciales: "LD", era: "2020s", posicion: "Delantero",    partidos: 65,  goles: 15, color: "#CE0000" },
    { nombre: "Jhon Arias",      iniciales: "JA", era: "2020s", posicion: "Mediocampista", partidos: 30,  goles: 5,  color: "#28B463" },
];

const eraLabels = {
    "90s":   "Años 90",
    "2000s": "Años 2000",
    "2010s": "Años 2010",
    "2020s": "Actuales",
};

/* ===== 2. Datos de partidos ===== */
const proximos = [
    { rival: "Colombia vs Brasil",     fecha: "14 Ago 2025", hora: "20:30", competicion: "Eliminatorias", etiqueta: "eliminatoria" },
    { rival: "Colombia vs Paraguay",   fecha: "09 Sep 2025", hora: "18:00", competicion: "Eliminatorias", etiqueta: "eliminatoria" },
    { rival: "Colombia vs Chile",      fecha: "14 Oct 2025", hora: "20:00", competicion: "Eliminatorias", etiqueta: "eliminatoria" },
];

const resultados = [
    { rival: "Colombia vs Uruguay",    fecha: "23 May 2025", score: "2-0", resultado: "win",  competicion: "Eliminatorias", etiqueta: "eliminatoria" },
    { rival: "Colombia vs Argentina",  fecha: "11 Jun 2025", score: "1-1", resultado: "draw", competicion: "Eliminatorias", etiqueta: "eliminatoria" },
    { rival: "Colombia vs Perú",       fecha: "07 Jul 2025", score: "3-1", resultado: "win",  competicion: "Copa América",  etiqueta: "copa-america" },
    { rival: "Colombia vs Ecuador",    fecha: "21 Mar 2025", score: "0-1", resultado: "loss", competicion: "Amistoso",      etiqueta: "amistoso" },
];

/* ===== 3. Datos de noticias ===== */
const noticias = [
    { dia: "10", mes: "Jul", titulo: "Convocatoria para las eliminatorias", descripcion: "El director técnico dio la lista de 26 convocados para los partidos contra Brasil y Paraguay en septiembre." },
    { dia: "08", mes: "Jul", titulo: "James Rodríguez: \"Estoy listo para la Tricolor\"", descripcion: "El mediocampista confirmó su disposición tras superar una lesión leve que lo marginó del mes pasado." },
    { dia: "05", mes: "Jul", titulo: "Luis Díaz brilla en la pretemporada", descripcion: "El delantero colombiano anota dobletes en los primeros juegos de preparación de pretemporada." },
    { dia: "02", mes: "Jul", titulo: "La Sub-20 se prepara para el Sudamericano", descripcion: "La categoría_sub-20 inicia la concentración en Barranquilla con vistas al torneo continental." },
    { dia: "28", mes: "Jun", titulo: "Fox Sports transmite todos los partidos", descripcion: "Se confirma que Fox Sports será el canal oficial para transmitir las eliminatorias de Colombia." },
];

/* ===== 4. Render dinámico de jugadores ===== */
function renderJugadores(filtro = 'all') {
    const grid = document.getElementById('jugadores-grid');
    const empty = document.getElementById('jugadores-empty');
    if (!grid) return;

    const lista = filtro === 'all' ? jugadores : jugadores.filter(j => j.era === filtro);

    if (lista.length === 0) {
        grid.innerHTML = '';
        empty.hidden = false;
        return;
    }
    empty.hidden = true;

    grid.innerHTML = lista.map(j => `
        <article class="jugador-card">
            <div class="jugador-avatar" style="background:${j.color};">${j.iniciales}</div>
            <div class="jugador-name">${j.nombre}</div>
            <div class="jugador-pos">${j.posicion}</div>
            <div class="jugador-stats">
                ${j.partidos} PJ<span class="stat-sep">·</span>${j.goles} goles
            </div>
            <span class="jugador-era-tag">${eraLabels[j.era] || j.era}</span>
        </article>
    `).join('');
}

/* ===== 5. Render dinámico de partidos ===== */
function renderPartidos() {
    const ulProx = document.getElementById('proximos-list');
    if (ulProx) {
        ulProx.innerHTML = proximos.map(p => `
            <li class="partido-item">
                <div class="partido-info">
                    <div class="partido-fechas">📅 ${p.fecha} · 🕐 ${p.hora}</div>
                    <div class="partido-vs">${p.rival}</div>
                    <div class="partido-comp"><span class="comp-tag ${p.etiqueta}">${p.competicion}</span></div>
                </div>
            </li>
        `).join('');
    }

    const ulRes = document.getElementById('resultados-list');
    if (ulRes) {
        ulRes.innerHTML = resultados.map(r => `
            <li class="partido-item resultado">
                <div class="partido-info">
                    <div class="partido-fechas">${r.fecha}</div>
                    <div class="partido-vs">${r.rival}</div>
                    <div class="partido-comp"><span class="comp-tag ${r.etiqueta}">${r.competicion}</span></div>
                </div>
                <span class="partido-score ${r.resultado}">${r.score}</span>
            </li>
        `).join('');
    }
}

/* ===== 6. Render dinámico de noticias ===== */
function renderNoticias() {
    const ul = document.getElementById('noticias-list');
    if (!ul) return;
    ul.innerHTML = noticias.map(n => `
        <li class="noticia-card">
            <div class="noticia-date">
                <span class="dia">${n.dia}</span>
                <span class="mes">${n.mes}</span>
            </div>
            <div class="noticia-body">
                <h4>${n.titulo}</h4>
                <p>${n.descripcion}</p>
            </div>
        </li>
    `).join('');
}

/* ===== 7. Filtros de jugadores por época ===== */
function initFiltros() {
    const botones = document.querySelectorAll('.filter-btn');
    botones.forEach(btn => {
        btn.addEventListener('click', () => {
            botones.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            renderJugadores(btn.dataset.era);
        });
    });
}

/* ===== 8. Timeline acordeón ===== */
function initTimeline() {
    const headers = document.querySelectorAll('.timeline-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const body = header.nextElementSibling;
            const isOpen = header.getAttribute('aria-expanded') === 'true';

            header.setAttribute('aria-expanded', String(!isOpen));
            item.classList.toggle('open');

            if (isOpen) {
                body.hidden = true;
            } else {
                body.hidden = false;
            }
        });
    });
}

/* ===== 9. Menú hamburguesa móvil ===== */
function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navList   = document.getElementById('nav-list');
    if (!hamburger || !navList) return;

    hamburger.addEventListener('click', () => {
        const open = navList.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', String(open));
        hamburger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });

    // Cerrar al hacer clic en un enlace
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

/* ===== 10. Scroll suave + highlight nav activa ===== */
function initSmoothScroll() {
    const links = document.querySelectorAll('#nav-list a[href^="#"]');
    const secciones = document.querySelectorAll('main section[id]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#' || href === '#inicio') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = document.getElementById('main-nav').offsetHeight;
                const pos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        });
    });

    // Highlight de la sección activa con IntersectionObserver
    const navMap = {};
    links.forEach(l => {
        const id = l.getAttribute('href').replace('#', '');
        if (id) navMap[id] = l;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(l => l.removeAttribute('aria-current'));
                const id = entry.target.id;
                if (navMap[id]) {
                    navMap[id].setAttribute('aria-current', 'page');
                }
            }
        });
    }, { rootMargin: '-40% 0px -50% 0px' });

    secciones.forEach(s => observer.observe(s));
}

/* ===== 11. Año dinámico en footer ===== */
function initYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
}

/* ===== 12. Animación de entrada con IntersectionObserver ===== */
function initSectionAnimations() {
    const sections = document.querySelectorAll('.section-fade');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    sections.forEach(s => observer.observe(s));
}

/* ===== 13. Lazy resize para cerrar menú al cambiar a desktop ===== */
function initResize() {
    let timer;
    window.addEventListener('resize', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            if (window.innerWidth >= 769) {
                const navList = document.getElementById('nav-list');
                const hamburger = document.getElementById('hamburger');
                if (navList) navList.classList.remove('open');
                if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
            }
        }, 150);
    });
}

/* ===== Init ===== */
document.addEventListener('DOMContentLoaded', () => {
    renderJugadores('all');
    renderPartidos();
    renderNoticias();
    initFiltros();
    initTimeline();
    initHamburger();
    initSmoothScroll();
    initYear();
    initSectionAnimations();
    initResize();
});
