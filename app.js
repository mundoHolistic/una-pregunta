/*
  CONFIGURACIÓN
  ----------------------------------------------------
  Pegá acá tus enlaces reales de pago y el enlace de
  tu formulario actual del oráculo.

  Ejemplo PayPal.Me:
  https://paypal.me/TUUSUARIO

  Si tu PayPal.Me permite aporte variable, el usuario
  podrá elegir el importe en PayPal.

  Mercado Pago:
  pegá el link de pago que ya creaste.
*/

const CONFIG = {
  mercadoPagoUrl: "https://link.mercadopago.com.ar/mundoholistic",
  paypalUrl: "https://www.paypal.com/ncp/payment/B5WX9UBQ3LCU2",
  oracleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLScI44iWqor7BjNO48WVir8qxKDVO4x-NbEYHn1LiF8Vpxb-lA/viewform?usp=sharing&ouid=111228911347387194409"
};

const RESULTS = ["SÍ", "NO", "TODAVÍA NO"];

const home = document.getElementById("home");
const reveal = document.getElementById("reveal");
const revealBtn = document.getElementById("revealBtn");
const dots = document.getElementById("dots");
const thinkingText = document.getElementById("thinkingText");
const resultBox = document.getElementById("resultBox");
const resultTitle = document.getElementById("resultTitle");
const mercadoPagoLink = document.getElementById("mercadoPagoLink");
const paypalLink = document.getElementById("paypalLink");
const oracleFormLink = document.getElementById("oracleFormLink");

document.getElementById("year").textContent = new Date().getFullYear();

function setLinks() {
  mercadoPagoLink.href = CONFIG.mercadoPagoUrl;
  paypalLink.href = CONFIG.paypalUrl;
  oracleFormLink.href = CONFIG.oracleFormUrl;
}

function showScreen(screen) {
  home.classList.remove("is-active");
  reveal.classList.remove("is-active");

  screen.classList.add("is-active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================================================
   REINICIAR EXPERIENCIA
   ========================================================= */

function resetExperience() {
  resultBox.hidden = true;
  dots.hidden = false;

  thinkingText.textContent = "Buscando una respuesta";

  // Limpiamos animaciones anteriores
  thinkingText.classList.remove(
    "thinking-animation"
  );

  resultTitle.classList.remove(
    "reveal-animation"
  );

  revealBtn.disabled = false;

  showScreen(home);
}


/* =========================================================
   RESULTADO ALEATORIO
   ========================================================= */

function getRandomResult() {
  return RESULTS[
    Math.floor(Math.random() * RESULTS.length)
  ];
}


/* =========================================================
   SONIDOS DOODLE
   Se generan directamente en el navegador
   ========================================================= */

let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (
      window.AudioContext || window.webkitAudioContext
    )();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  return audioContext;
}


function playTone(
  frequency,
  duration,
  type = "sine",
  volume = 0.04
) {
  try {
    const ctx = getAudioContext();

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = type;

    oscillator.frequency.setValueAtTime(
      frequency,
      ctx.currentTime
    );

    gain.gain.setValueAtTime(
      0.0001,
      ctx.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      volume,
      ctx.currentTime + 0.02
    );

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      ctx.currentTime + duration
    );

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start();

    oscillator.stop(
      ctx.currentTime + duration
    );

  } catch (error) {
    // Si el navegador bloquea el audio,
    // la experiencia continúa normalmente.
    console.log("Audio no disponible.");
  }
}


/* =========================================================
   SONIDO AL COMENZAR LA REVELACIÓN
   ========================================================= */

function playRevealStartSound() {

  playTone(
    520,
    0.08,
    "sine",
    0.035
  );

  setTimeout(() => {

    playTone(
      660,
      0.12,
      "sine",
      0.025
    );

  }, 70);
}


/* =========================================================
   SONIDO AL APARECER LA RESPUESTA
   ========================================================= */

function playRevealResultSound() {

  playTone(
    660,
    0.10,
    "sine",
    0.035
  );

  setTimeout(() => {

    playTone(
      880,
      0.18,
      "sine",
      0.04
    );

  }, 90);
}


/* =========================================================
   REVELAR RESPUESTA
   ========================================================= */

function revealResult() {

  revealBtn.disabled = true;

  // Sonido inicial
  playRevealStartSound();


  /* -------------------------
     ESTADO INICIAL
     ------------------------- */

  resultBox.hidden = true;

  dots.hidden = false;

  thinkingText.textContent =
    "Buscando una respuesta";


  // Limpiamos cualquier animación anterior
  thinkingText.classList.remove(
    "thinking-animation"
  );

  resultTitle.classList.remove(
    "reveal-animation"
  );


  // Mostramos pantalla de revelación
  showScreen(reveal);


  /* -------------------------
     ANIMACIÓN DE ESPERA
     ------------------------- */

  // Forzamos al navegador a reiniciar
  // la animación cada vez que se hace clic.
  void thinkingText.offsetWidth;

  thinkingText.classList.add(
    "thinking-animation"
  );


  /* -------------------------
     ESPERAMOS LA RESPUESTA
     ------------------------- */

  window.setTimeout(() => {

    const result = getRandomResult();

    resultTitle.textContent = result;


    // Ocultamos los puntos
    dots.hidden = true;


    // Cambiamos el texto
    thinkingText.textContent =
      "Tu respuesta";


    // Detenemos la animación de espera
    thinkingText.classList.remove(
      "thinking-animation"
    );


    // Mostramos resultado
    resultBox.hidden = false;


    /* -------------------------
       ANIMACIÓN DEL RESULTADO
       SOLO SOBRE LA RESPUESTA
       ------------------------- */

    void resultTitle.offsetWidth;

    resultTitle.classList.add(
      "reveal-animation"
    );


    // Sonido de aparición
    playRevealResultSound();

  }, 1600);
}


/* =========================================================
   BOTÓN REVELAR
   ========================================================= */

revealBtn.addEventListener(
  "click",
  revealResult
);


/* =========================================================
   HACER OTRA PREGUNTA
   ========================================================= */

document
  .querySelectorAll("[data-reset]")
  .forEach((button) => {

    button.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        resetExperience();

      }
    );

  });


/* =========================================================
   LINKS
   ========================================================= */

setLinks();