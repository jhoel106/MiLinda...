const MI_WHATSAPP_REAL = "51970056175";
const MI_FECHA_SECRETA = "1912"; 
let intervaloPensamientos; 
let valorPinActual = "";

// Asegurar que la pág 1 sea visible al cargar
window.addEventListener('DOMContentLoaded', () => {
    const p1 = document.getElementById('page1');
    if (p1) {
        p1.style.display = 'flex';
        p1.style.opacity = '1';
        p1.classList.add('active');
    }
});



/* ==========================================
   SECCIÓN 2: PÁGINA 1 (INICIO)
   ========================================== */
function startExperience() {
    console.log("Iniciando...");
    const music = document.getElementById('bgMusic');
    if(music) music.play().catch(() => console.log("Esperando interacción para música"));

    const p1 = document.getElementById('page1');
    p1.style.transition = "opacity 0.8s ease";
    p1.style.opacity = "0";

    setTimeout(() => {
        goToPage(2);
    }, 800);
}

/* ==========================================
   SECCIÓN 3: PÁGINA 2 (BUCLE DE PENSAMIENTOS)
   ========================================== */
const pensamientos = [
    "Desde que me di cuenta de mis errores, no veo colores en mi vida.",
    "Miro la pantalla esperando una señal que no llega.",
    "El silencio de tus notificaciones es el ruido más fuerte que he escuchado.",
    "Tu ausencia me demostró que no hay nadie más que me llegue a comprender.",
    "Mi habitación se siente vacía sin tu presencia.",
    "Mirar el celular perdió significado al no tener un propósito.",
    "¿En qué momento permití que mi error nos alejara tanto?",
    "Cada recuerdo rosa ahora tiene un tinte gris.",
    "Extraño a mi niña linda, la que me hacía mejor persona.",
    "Escribo mensajes que nunca envío por miedo a tu silencio.",
    "Me duele saber que yo fui el arquitecto de esta distancia.",
    "El mundo sigue girando, pero el mío se detuvo en tu último 'visto'.",
    "Eres el pensamiento que no me deja dormir y el primero al despertar.",
    "No busco excusas, solo busco una oportunidad para reparar lo roto.",
    "Perdóname por no haber valorado la joya que tenía frente a mí."
];

function initPage2Scroll() {
    const textElement = document.getElementById('dynamic-thought');
    const counterElement = document.getElementById('thought-counter');
    
    // Si no existen los elementos, salimos para evitar errores
    if (!textElement || !counterElement) return;

    let idx = 0;
    const total = pensamientos.length;

    // IMPORTANTE: Limpiar cualquier intervalo activo antes de empezar uno nuevo
    if (intervaloPensamientos) clearInterval(intervaloPensamientos);

    const actualizarInterfaz = (i) => {
        textElement.innerText = pensamientos[i];
        counterElement.innerText = `${i + 1} / ${total}`;
    };

    // Estado inicial: Mostramos el primero de inmediato
    actualizarInterfaz(0);
    textElement.classList.add('show');

    // Iniciamos el bucle
    intervaloPensamientos = setInterval(() => {
        // 1. Ocultar con transición
        textElement.classList.remove('show');
        
        // 2. Esperar a que termine de ocultarse para cambiar el texto
        setTimeout(() => {
            idx = (idx + 1) % total;
            actualizarInterfaz(idx);
            // 3. Mostrar con transición
            textElement.classList.add('show');
        }, 1500); // Este tiempo debe coincidir con la transición del CSS
    }, 5000); 
}
/* ==========================================
   SECCIÓN 4: PÁGINA 3 (LÍNEA DE TIEMPO)
   ========================================== */
function initPage3Timeline() {
    const items = document.querySelectorAll('.timeline-item');
    
    // Función para detectar el scroll en la página 3
    const revealItems = () => {
        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
            }
        });
    };

    // Estilo inicial
    items.forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        item.style.transition = "all 0.6s ease-out";
    });

    // Escuchar el scroll de la sección
    document.getElementById('page3').addEventListener('scroll', revealItems);
    revealItems(); // Llamada inicial
}
function goToPage(pageNum) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none';
    });
    
    const targetPage = document.getElementById('page' + pageNum);
    if (targetPage) {
    targetPage.style.display = 'flex';
    
        // DENTRO DE TU FUNCIÓN goToPage
    if (targetPage) {
        targetPage.style.display = 'flex';
        
        // ... otras inicializaciones
        if(pageNum === 4) {
            initPage4Letter(); // ¡Aquí se inicia toda la magia de la carta!
        }

        setTimeout(() => {
            targetPage.classList.add('active');
            // ... otros console.logs
        }, 50);
    }

    setTimeout(() => {
        targetPage.classList.add('active'); 
        
        if(pageNum === 2) initPage2Scroll();
        if(pageNum === 3) console.log("Timeline animándose...");
    }, 50);
}
}


/* ==========================================
  SECCION 5 CONFIGURACIÓN DE LA CARTA Y AUDIO
   ========================================== */

const cartaTexto = `Mi niña, perdón por todos los acontecimientos que pasaron. Mis fallas hicieron que te 
alejes de todo lo que se estaba construyendo poco a poco. Perdón por no fijarme en los detalles, por actuar sin pensar en 
cómo te sentías, y por permitir que mis propios problemas volvieran tristes tus días alegres.

Jamás fue mi intención involucrarte en mis tormentas. Perdón por dejar que nuestros momentos lindos se volvieran monótonos, 
por esa falta de iniciativa que, aunque tenga llena de ideas en mi mente, en la realidad no hice nada. Perdón por no escuchar tu silencio, 
que lo decía todo... 

No he sabido disculparme como te mereces, pero hoy quiero intentarlo de verdad. Eres la luz de mi oscuridad y mi razón para 
crecer cada día más. Solo espero que puedas darme una oportunidad de hacer lo correcto, de amarte bien, como debió ser desde 
el comienzo. No dejes que nuestro universo se apague.`;

let cartaIndex = 0;
let typingInterval;

function initPage4Letter() {
    const envelope = document.getElementById('letterEnvelope');
    const paper = document.getElementById('letterPaper');
    const typedContent = document.getElementById('typedLetterContent');
    const signature = document.querySelector('.letter-signature');
    const audioContainer = document.getElementById('audioPlayerContainer');
    const poemAudio = document.getElementById('poemAudio');
    const playBtn = document.getElementById('playAudioBtn');
    const pauseBtn = document.getElementById('pauseAudioBtn');
    const progressBar = document.getElementById('audioProgressBar');
    const currentTimeSpan = document.getElementById('currentTime');
    const totalTimeSpan = document.getElementById('totalTime');
    const btnFinal = document.getElementById('goToPage5Btn');

    // 1. Limpieza inicial (Reset)
    clearInterval(typingInterval);
    cartaIndex = 0;
    typedContent.innerHTML = '';
    paper.classList.remove('show');
    envelope.classList.remove('open', 'fade-out');
    signature.classList.remove('visible');
    audioContainer.style.display = 'none';
    btnFinal.style.display = 'none';
    
    // Reset Audio y Tiempos
    poemAudio.pause();
    poemAudio.currentTime = 0;
    progressBar.style.width = '0%';
    playBtn.style.display = 'flex';
    pauseBtn.style.display = 'none';
    currentTimeSpan.innerText = "0:00";
    totalTimeSpan.innerText = "0:00";

    // Función auxiliar para formatear tiempo (Segundos -> 0:00)
    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    // Cargar duración total cuando el audio esté listo
    poemAudio.onloadedmetadata = () => {
        totalTimeSpan.innerText = formatTime(poemAudio.duration);
    };

    // 2. Apertura del sobre
    envelope.onclick = () => {
        envelope.classList.add('open');
        setTimeout(() => {
            envelope.classList.add('fade-out');
            setTimeout(() => {
                paper.classList.add('show');
                // Empezar a escribir cuando la carta esté arriba
                setTimeout(typeLetter, 1200);
            }, 600);
        }, 800);
    };

    // 3. Función de escritura letra por letra
    function typeLetter() {
        if (cartaIndex < cartaTexto.length) {
            typedContent.innerHTML += cartaTexto.charAt(cartaIndex);
            cartaIndex++;
            
            // Scroll automático para que ella vea lo que se escribe
            paper.scrollTop = paper.scrollHeight;
            
            typingInterval = setTimeout(typeLetter, 50);
        } else {
            // Al terminar la carta:
            signature.classList.add('visible');
            
            // Aparece el mensaje y el reproductor de audio
            setTimeout(() => {
                audioContainer.style.display = 'block'; // Usamos block para mantener el diseño CSS
                paper.scrollTo({ top: paper.scrollHeight, behavior: 'smooth' });
            }, 1000);
        }
    }

    // 4. Lógica del Reproductor de Audio
    playBtn.onclick = (e) => {
        e.stopPropagation();
        poemAudio.play().catch(error => console.log("Error al reproducir:", error));
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'flex';
    };

    pauseBtn.onclick = (e) => {
        e.stopPropagation();
        poemAudio.pause();
        playBtn.style.display = 'flex';
        pauseBtn.style.display = 'none';
    };

    // Actualizar barra de progreso y tiempo actual
    poemAudio.ontimeupdate = () => {
        const progress = (poemAudio.currentTime / poemAudio.duration) * 100;
        progressBar.style.width = `${progress}%`;
        currentTimeSpan.innerText = formatTime(poemAudio.currentTime);
    };

    // Al terminar el audio, habilitar botón de Página 5
    poemAudio.onended = () => {
        playBtn.style.display = 'flex';
        pauseBtn.style.display = 'none';
        btnFinal.style.display = 'inline-block';
        
        // Scroll final suave para mostrar el botón de siguiente
        setTimeout(() => {
            paper.scrollTo({ top: paper.scrollHeight, behavior: 'smooth' });
        }, 300);
    };
}


// CONFIGURACIÓN
const MI_TELEFONO = "51970056175"; // Reemplaza con tu número (código de país + número)
const FECHA_CLAVE = "1510"; // Ejemplo: 15 de Octubre -> 1510

function sendWhatsapp() {
    const mensaje = encodeURIComponent("Si mi niño, te perdono... pero no lo vuelvas a hacer. Te amo ❤️");
    window.open(`https://wa.me/${MI_TELEFONO}?text=${mensaje}`, '_blank');
}

function checkSecretKey() {
    const input = document.getElementById('secretKey').value;
    const hint = document.getElementById('errorHint');

    if (input === FECHA_CLAVE) {
        // Si es correcto, vamos a la página 6 (La revelación)
        goToPage(6);
    } else {
        // Mensaje de error personalizado
        hint.innerText = "Es una fecha que quiza no recuerdes, pero esta en nuestra linea de tiempo...";
        
        // Efecto de sacudida al input
        const inputEl = document.getElementById('secretKey');
        inputEl.style.borderColor = "red";
        setTimeout(() => inputEl.style.borderColor = "#ddd", 1000);
    }
}


/* ==========================================
   SECCIÓN: LÓGICA DE LA PÁGINA 5 (EL PIN)
   ========================================== */


// 2. FUNCIONES DEL MODAL Y TECLADO
function openKeypad() {
    const modal = document.getElementById('keypadModal');
    if (modal) {
        console.log("Abriendo teclado..."); // Esto te servirá para ver si hace clic en la consola (F12)
        modal.style.display = 'flex'; 
        clearNum(); // Reinicia el pin
    } else {
        console.error("No se encontró el elemento keypadModal");
    }
}

function closeKeypad() {
    const modal = document.getElementById('keypadModal');
    if (modal) {
        modal.style.display = 'none';
        valorPinActual = ""; 
    }
}

// 3. FUNCIONES DE MARCACIÓN
function pressNum(num) {
    if (valorPinActual.length < 4) {
        valorPinActual += num;
        updateDots();
        
        // Limpiar mensaje de error si empieza a escribir de nuevo
        const errorEl = document.getElementById('numpadError');
        if (errorEl) errorEl.innerText = "";
    }
}

function clearNum() {
    valorPinActual = "";
    updateDots();
    const errorEl = document.getElementById('numpadError');
    if (errorEl) errorEl.innerText = "";
}

// Actualiza visualmente las bolitas (puntos)
function updateDots() {
    const dots = document.querySelectorAll('.dots-container span');
    dots.forEach((dot, index) => {
        if (index < valorPinActual.length) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// 4. COMPROBACIÓN DEL PIN
function checkSecretKey() {
    if (valorPinActual === MI_FECHA_SECRETA) {
        // ÉXITO: Cerramos teclado y vamos a la página 6
        closeKeypad();
        goToPage(6); 
    } else {
        // ERROR: Mostramos mensaje y vibramos
        const errorEl = document.getElementById('numpadError');
        if (errorEl) {
            errorEl.innerText = "Quizá no recuerdes la fecha, pero está en la línea del tiempo...";
        }
        
        // Efecto visual de vibración en la cajita del teclado
        const container = document.querySelector('.numpad-container');
        if (container) {
            container.classList.add('shake');
            setTimeout(() => {
                container.classList.remove('shake');
            }, 500);
        }

        // Reiniciamos el pin para que intente de nuevo
        valorPinActual = "";
        setTimeout(updateDots, 300);
    }
}

// 5. LÓGICA DE WHATSAPP
function sendWhatsapp() {
    const mensaje = encodeURIComponent("Si jhoel, te perdono... pero no lo vuelvas a hacer que me voy ❤️");
    const link = `https://wa.me/${MI_WHATSAPP_REAL}?text=${mensaje}`;
    window.open(link, '_blank');
}





/* ==========================================
   LÓGICA PÁGINA 6: CORREGIDA
   ========================================== */

function answerFinal(respuesta) {
    console.log("Respuesta recibida:", respuesta); // Para depuración
    let mensajeWS = "";
    
    if (respuesta === 'si') {
        mensajeWS = "¡Acepto salir contigo! Pero quiero algo más... no es sufuciente ❤️";
    } else {
        mensajeWS = "Aún estoy molesta contigo, así que lo pensaré... 🌙";
    }
    
    // Asegúrate de que MI_WHATSAPP_REAL esté definida (ej: const MI_WHATSAPP_REAL = "51900...")
    const url = `https://wa.me/${MI_WHATSAPP_REAL}?text=${encodeURIComponent(mensajeWS)}`;
    window.open(url, '_blank');
}

function startPetals() {
    const container = document.getElementById('petalsContainer');
    if (!container) return;

    const symbols = ['🌸', '❤️', '✨', '💖', '🌹'];
    
    const petalInterval = setInterval(() => {
        const p6 = document.getElementById('page6');
        // Si la página 6 deja de ser visible, detenemos el generador
        if (!p6 || p6.style.display === 'none') {
            clearInterval(petalInterval);
            return;
        }

        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        
        const duration = Math.random() * 3 + 3;
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.fontSize = (Math.random() * 20 + 15) + 'px';
        petal.style.animationDuration = duration + 's';
        
        container.appendChild(petal);
        setTimeout(() => petal.remove(), duration * 1000);
    }, 300);
}

// Esta es la función que debes tener para cambiar de página
function checkSecretKey() {
    if (valorPinActual === MI_FECHA_SECRETA) {
        closeKeypad();
        goToPage(6); // Asumiendo que esta función oculta P5 y muestra P6
        
        // Pequeño delay para asegurar que el DOM cargó
        setTimeout(startPetals, 300); 
    } else {
        // ... (tu lógica de error que ya funciona)
        const errorEl = document.getElementById('numpadError');
        if (errorEl) errorEl.innerText = "Clave incorrecta...";
        valorPinActual = "";
        updateDots();
    }
}

