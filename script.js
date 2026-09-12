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

// --- Lógica del Personalizador Interactivo Avanzado ---
    const chainButtons = document.querySelectorAll('[data-target="chain"] .opt-btn');
    const accentButtons = document.querySelectorAll('[data-target="accent"] .color-btn');
    const charmButtons = document.querySelectorAll('[data-target="charm"] .opt-btn');

    const previewChain = document.getElementById('preview-chain');
    const previewAccent = document.getElementById('preview-accent');
    const previewCharm = document.getElementById('preview-charm');
    
    const resumenPieza = document.getElementById('resumen-pieza');
    const colorNameLabel = document.getElementById('color-name-label');
    const whatsappCustomBtn = document.getElementById('whatsapp-custom-btn');

    // Estado actual detallado
    let selectedChain = "Eslabón Clásico";
    let selectedAccent = "Violeta Orquídea";
    let selectedCharm = "✨ Estrella";

    function updateWhatsAppLink() {
        // Mensaje de WhatsApp elegante y estructurado con emojis profesionales
        const mensaje = `✨ *NUEVA SOLICITUD DE DISEÑO EXCLUSIVO* ✨\n\n` +
                        `Hola, Orquídea Dorada. Me he enamorado de esta combinación personalizada en su web y deseo encargarla:\n\n` +
                        `🔗 *Estilo de Cadena:* ${selectedChain}\n` +
                        `🎨 *Tono de Detalle:* ${selectedAccent}\n` +
                        `💎 *Símbolo Central:* ${selectedCharm}\n\n` +
                        `Quedo atenta para coordinar detalles y pago. ¡Gracias!`;
                        
        const numeroWhatsApp = "584222342319"; // Reemplaza con tu número real
        whatsappCustomBtn.href = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    }

    // Manejo de botones de Cadena
    chainButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            chainButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const value = btn.getAttribute('data-value');
            selectedChain = btn.getAttribute('data-text');
            
            previewChain.className = "jewel-chain " + value;
            resumenPieza.innerText = `Pulsera ${selectedChain} + ${selectedAccent} + ${selectedCharm}`;
            updateWhatsAppLink();
        });
    });

    // Manejo de botones de Acrílico/Color
    accentButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            accentButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const value = btn.getAttribute('data-value');
            selectedAccent = btn.getAttribute('data-text');
            
            previewAccent.className = "jewel-accent " + value;
            colorNameLabel.innerText = selectedAccent;
            resumenPieza.innerText = `Pulsera ${selectedChain} + ${selectedAccent} + ${selectedCharm}`;
            updateWhatsAppLink();
        });
    });

    // Manejo de botones de Dije
    charmButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            charmButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const value = btn.getAttribute('data-value');
            selectedCharm = btn.getAttribute('data-text');
            
            previewCharm.className = "jewel-charm " + value;
            resumenPieza.innerText = `Pulsera ${selectedChain} + ${selectedAccent} + ${selectedCharm}`;
            updateWhatsAppLink();
        });
    });

    // --- Lógica del Selector Dinámico de AR ---
    const catButtons = document.querySelectorAll('.ar-cat-btn');
    const modelViewer = document.getElementById('dynamic-model-viewer');
    const dynamicHint = document.getElementById('ar-dynamic-hint');

    catButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Cambiar estado activo visual de los botones
            catButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Obtener los datos del botón presionado
            const modelSrc = btn.getAttribute('data-model');
            const instructionText = btn.getAttribute('data-instruction');

            // Actualizar el modelo 3D en el visor de forma dinámica
            modelViewer.src = modelSrc;

            // Actualizar la instrucción que guía a la usuaria sobre dónde enfocar
            dynamicHint.innerText = instructionText;
        });
    });

    // Inicializar enlace al cargar
    updateWhatsAppLink();