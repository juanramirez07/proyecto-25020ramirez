document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formularioContacto');
  const nombre = document.getElementById('nombre');
  const correo = document.getElementById('correo');
  const mensaje = document.getElementById('mensaje');

  function validarCampo(campo, mensajeError) {
    const valor = campo.value.trim();
    const errorDiv = campo.nextElementSibling;
    if (valor === '') {
      errorDiv.textContent = mensajeError;
      campo.classList.add('error');
      return false;
    } else {
      errorDiv.textContent = '';
      campo.classList.remove('error');
      return true;
    }
  }

  function validarCorreo(campo) {
    const valor = campo.value.trim();
    const errorDiv = campo.nextElementSibling;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(valor)) {
      errorDiv.textContent = 'Correo inválido';
      campo.classList.add('error');
      return false;
    } else {
      errorDiv.textContent = '';
      campo.classList.remove('error');
      return true;
    }
  }

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombreValido = validarCampo(nombre, 'Ingrese su nombre');
    const correoValido = validarCorreo(correo);
    const mensajeValido = validarCampo(mensaje, 'Ingrese su mensaje');

    if (nombreValido && correoValido && mensajeValido) {
      console.log('Formulario enviado correctamente');
      formulario.reset();
    } else {
      console.log('Hay campos inválidos');
    }
  });
});