document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const inputs = document.querySelectorAll('#formulario input');

    const expresiones = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/
    }

    const campos = {
        nombre: false,
        correo: false,
        telefono: false
    }

    const validarFormulario = (e) => {
        switch (e.target.name) {
            case 'nombre':
                validarCampo(expresiones.nombre, e.target, 'nombre');
                break;
            case 'correo':
                validarCampo(expresiones.correo, e.target, 'correo');
                break;
            case 'telefono':
                validarCampo(expresiones.telefono, e.target, 'telefono');
                break;
        }
    }

    const validarCampo = (expresion, input, campo) => {
        const formGroup = document.getElementById(`form-${campo}`);
        const formError = formGroup.querySelector('.form-error');

        if (expresion.test(input.value)) {
            formGroup.classList.remove('form-incorrecto');
            formGroup.classList.add('form-correcto');
            formGroup.querySelector('.form-validar').classList.add('fa-check-circle');
            formGroup.querySelector('.form-validar').classList.remove('fa-circle-xmark');
            formError.classList.remove('form-error-activo');
            campos[campo] = true;
        } else {
            formGroup.classList.add('form-incorrecto');
            formGroup.classList.remove('form-correcto');
            formGroup.querySelector('.form-validar').classList.add('fa-circle-xmark');
            formGroup.querySelector('.form-validar').classList.remove('fa-check-circle');
            formError.classList.add('form-error-activo');
            campos[campo] = false;
        }
    }

    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const mensajeError = document.getElementById('form-mensaje');
        const mensajeEnviado = document.getElementById('form-enviado');

        if (campos.nombre && campos.correo && campos.telefono) {
            formulario.reset();

            mensajeEnviado.classList.add('form-enviado-activo');
            setTimeout(() => {
                mensajeEnviado.classList.remove('form-enviado-activo');
            }, 5000);

            inputs.forEach((input) => {
                input.parentElement.classList.remove('form-correcto');
            });
        } else {
            mensajeError.classList.add('form-mensaje-activo');
            setTimeout(() => {
                mensajeEnviado.classList.remove('form-mensaje-activo');
            }, 5000);
        }
    });
});


