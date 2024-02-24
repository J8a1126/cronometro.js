const cronometro = document.getElementById('cronometro');
const botonInicioPausa = document.getElementById('boton-inicio-pausa');
const botonReiniciar = document.getElementById('boton-reiniciar');

let horas = 0;
let minutos = 0;
let segundos = 0;
let intervaloTiempo;
let estadoCronometro = 'pausado';

function actualizarCronometro() {
  segundos++;

  if (segundos === 60) {
    segundos = 0;
    minutos++;

    if (minutos === 60) {
      minutos = 0;
      horas++;
    }
  }

  const segundosFormato = asignarFormato(segundos);
  const minutosFormato = asignarFormato(minutos);
  const horasFormato = asignarFormato(horas);

  cronometro.innerText = `${horasFormato}:${minutosFormato}:${segundosFormato}`;
}

function asignarFormato(unidadTiempo) {
  return unidadTiempo < 10 ? '0' + unidadTiempo : unidadTiempo;
}

botonInicioPausa.addEventListener('click', function() {
  if (estadoCronometro === 'pausado') {
    intervaloTiempo = window.setInterval(actualizarCronometro, 1000);
    botonInicioPausa.innerHTML = '<i class="bi bi-pause-fill"></i>';
    botonInicioPausa.classList.remove('iniciar');
    botonInicioPausa.classList.add('pausar');
    estadoCronometro = 'ejecutando';
  } else {
    window.clearInterval(intervaloTiempo);
    botonInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>';
    botonInicioPausa.classList.remove('pausar');
    botonInicioPausa.classList.add('iniciar');
    estadoCronometro = 'pausado';
  }
});

botonReiniciar.addEventListener('click', function() {
  window.clearInterval(intervaloTiempo);
  horas = 0;
  minutos = 0;
  segundos = 0;

  cronometro.innerText = '00:00:00';

  botonInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>';
  botonInicioPausa.classList.remove('pausar');
  botonInicioPausa.classList.add('iniciar');

  estadoCronometro = 'pausado';
});
