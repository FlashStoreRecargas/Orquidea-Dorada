// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {

    // 1. Cambio de apariencia de la barra de navegación al hacer scroll
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Menú Desplegable para Móviles (Toggle)
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'rgba(42, 19, 65, 0.98)';
                navLinks.style.padding = '20px';
                navLinks.style.textAlign = 'center';
            }
        });
    }

    // 3. Desplazamiento suave para los enlaces del menú
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Cerrar menú móvil si está abierto
                if (window.innerWidth <= 768 && navLinks) {
                    navLinks.style.display = 'none';
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Agrega esto al final de tu archivo script.js, DENTRO del document.addEventListener('DOMContentLoaded', ...)

    // --- Ocultar Preloader al cargar ---
    // Usamos window.onload para asegurar que todo el contenido (imágenes, etc.) esté listo
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            // Le damos un pequeño retraso de medio segundo por estética
            setTimeout(() => {
                preloader.classList.add('preloader-hidden');
            }, 2000);
        }
    });

    // --- Efecto de Revelación al hacer Scroll ---
    function revealElements() {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        // La distancia desde abajo donde queremos que se active la animación
        const elementVisible = 100; 

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }

    // Escuchar el evento de scroll
    window.addEventListener('scroll', revealElements);
    
    // Llamar a la función una vez al inicio por si hay elementos ya visibles
    revealElements();

    // --- Contador Regresivo ---
    
    // Configura aquí la fecha de lanzamiento (Mes Día, Año Hora:Minuto:Segundo)
    const countdownDate = new Date("December 24, 2026 20:00:00").getTime();

    const timerInterval = setInterval(function() {
        // Obtener la fecha y hora actual
        const now = new Date().getTime();
        
        // Encontrar la diferencia entre ahora y la fecha de lanzamiento
        const distance = countdownDate - now;

        // Si la cuenta regresiva termina, mostrar un mensaje
        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("countdown-timer").innerHTML = "<h3 style='color: var(--primary-violet); font-family: var(--font-heading); margin-top: 20px;'>¡La nueva colección ya está disponible!</h3>";
            return;
        }

        // Cálculos de tiempo para días, horas, minutos y segundos
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Actualizar el HTML (añadiendo un cero a la izquierda si el número es menor a 10)
        document.getElementById("days").innerText = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
        
    }, 1000); // Se actualiza cada 1 segundo (1000 milisegundos)

});

// --- Control del Modal de Contacto ---
const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalOverlay = document.getElementById('modal-contacto');

if (openModalBtn && closeModalBtn && modalOverlay) {
    // Abrir la ventana flotante al hacer clic en "Escríbenos"
    openModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modalOverlay.classList.add('active');
    });

    // Cerrar al hacer clic en el botón X
    closeModalBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    // Cerrar al hacer clic fuera de la ventana
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });

    // Cerrar al presionar la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            modalOverlay.classList.remove('active');
        }
    });
}