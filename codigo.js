// RESPONSIVE MENU ------------------------------------------------

const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".nav-responsive ul");
const menuLinks = document.querySelectorAll(".nav-responsive ul li a");

// Función para alternar el menú
menuBtn.addEventListener("click", () => {
  menu.classList.toggle("show");
});

// Cerrar el menú al hacer clic en cualquier enlace
menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("show"); // Elimina la clase 'show' para cerrar el menú
  });
});

// GALERIA -----------------------------------------

const imageSources = [
  'images/galeria/craneo-tattoo.jpg',
  'images/galeria/choco-tattoo.jpg',
  'images/galeria/divina02-tattoo.jpg', 
  'images/galeria/batman-tattoo.jpg', 'images/galeria/estrella-tattoo.jpg', 'images/galeria/majinboo-tattoo.jpg',
  'images/galeria/pantera-tattoo01.jpg', 'images/galeria/pantera-tattoo02.jpg', 'images/galeria/pantera-tattoo03.jpg',
  'images/galeria/bicho-tattoo.jpg', 'images/galeria/grillo-tattoo.jpg', 'images/galeria/hands-tattoo.jpg',
  'images/galeria/armadura-tattoo.jpg', 'images/galeria/divi-aguila-tattoo.jpg', 'images/galeria/escudo-tattoo.jpg',
  'images/galeria/flor-tattoo.jpg', 'images/galeria/flor-tattoo.jpg02.jpg', 'images/galeria/flor-tattoo03.jpg',
  'images/galeria/ojo-tigre.jpg', 'images/galeria/aguila-tattoo.jpg', 'images/galeria/manos-tattoo.jpg',
  'images/galeria/sabio-tattoo.jpg', 'images/galeria/jefesapo-tattoo.jpg', 'images/galeria/rinnegan-tattoo.jpg',
  'images/galeria/serpiente-tattoo.jpg', 'images/galeria/tatto-perro.jpg', 'images/galeria/indio-tattoo.jpg',
  'images/galeria/japon-tattoo.jpg', 'images/galeria/japon02-tattoo.jpg', 'images/galeria/japon03-tattoo.jpg',
  'images/galeria/estrella02-tattoo.jpg', 'images/galeria/gatito-tattoo.jpg', 'images/galeria/sol-tattoo.jpg',
  'images/galeria/lapida-tatto.jpg', 'images/galeria/joker-tattoo.jpg', 'images/galeria/ojo-tigre02.jpg',
  'images/galeria/divina-tattoo.jpg', 'images/galeria/rosa-tattoo.jpg', 'images/galeria/respeto-tattoo.jpg',
  'images/galeria/tribal-tattoo.jpg', 'images/galeria/tribal02-tattoo.jpg', 'images/galeria/reloj-tatttoo.jpg',
  'images/galeria/witcher-tattoo.jpg', 'images/galeria/witcher02-tattoo.jpg', 'images/galeria/witcher03-tattoo.jpg',
  'images/galeria/chicarobot-tattoo.jpg', 'images/galeria/vaca-tattoo.jpg', 'images/galeria/tortuga-tattoo.jpg',
  'images/galeria/casero-tattoo.jpg', 'images/galeria/leon-tattoo.jpg', 'images/galeria/sirena-tattoo.jpg'
];

let currentIndex = 0;

function openLightbox(imageSrc) {
  currentIndex = imageSources.indexOf(imageSrc);
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = imageSrc;
  lightbox.style.display = 'flex';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
}

function showImage(index) {
  const lightboxImg = document.getElementById('lightbox-img');
  currentIndex = (index + imageSources.length) % imageSources.length;
  lightboxImg.src = imageSources[currentIndex];
}

function nextImage(event) {
  event.stopPropagation(); // evitar que se cierre el lightbox al hacer click
  showImage(currentIndex + 1);
}

function prevImage(event) {
  event.stopPropagation();
  showImage(currentIndex - 1);
}

// Navegación por teclado ---------
document.addEventListener('keydown', function (event) {
  const lightbox = document.getElementById('lightbox');
  if (lightbox.style.display === 'flex') {
    if (event.key === 'ArrowRight') {
      nextImage(event);
    } else if (event.key === 'ArrowLeft') {
      prevImage(event);
    } else if (event.key === 'Escape') {
      closeLightbox();
    }
  }
});

// Navegación TOUCH - MOBILE ----------
let touchStartX = 0;
let touchEndX = 0;

const lightbox = document.getElementById('lightbox');

lightbox.addEventListener('touchstart', function (e) {
  touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', function (e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const threshold = 50; // píxeles mínimos para contar como swipe
  const distance = touchEndX - touchStartX;

  if (Math.abs(distance) > threshold) {
    if (distance > 0) {
      // swipe a la derecha -> imagen anterior
      showImage(currentIndex - 1);
    } else {
      // swipe a la izquierda -> imagen siguiente
      showImage(currentIndex + 1);
    }
  }
}


// CONTACTO -----------------------------------------

document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Evita el envío tradicional
  
  const form = e.target;
  const formData = new FormData(form);

  fetch(form.action, {
      method: 'POST',
      body: formData,
  })
  .then(response => response.text())
  .then(data => {
      document.getElementById('response-message').innerText = data;
      form.reset(); // Limpia el formulario tras enviarlo
  })
  .catch(error => console.error('Error:', error));
});

