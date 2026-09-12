const formulario = document.getElementById('form-calificaciones');
const contenedorLista = document.getElementById('lista-alumnos');
const botonLimpiar = document.getElementById('btn-limpiar');
let alumnos = JSON.parse(localStorage.getItem('bd_calificaciones')) || [];

function mostrarAlumnos() {
    contenedorLista.innerHTML = '';

    if (alumnos.length === 0) {
        contenedorLista.innerHTML = '<p class="mensaje-vacio">Aún no hay registros de estudiantes.</p>';
        botonLimpiar.style.display = 'none';
        return;
    }

    botonLimpiar.style.display = 'block';

    alumnos.forEach((alumno) => {
        const claseEstado = alumno.estado === 'Aprobado' ? 'aprobado' : 'reprobado';
        const div = document.createElement('div');
        div.classList.add('registro-item');
        
        div.innerHTML = `
            <div class="registro-header">${alumno.nombre}</div>
            <div class="registro-materias">
                Matemáticas: ${alumno.matematicas} | 
                Español: ${alumno.espanol} | 
                Historia: ${alumno.historia}
            </div>
            <div class="registro-footer">
                <span>Promedio: ${alumno.promedio}</span>
                <span class="estado ${claseEstado}">${alumno.estado}</span>
            </div>
        `;

        contenedorLista.appendChild(div);
    });
}

formulario.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const nombre = document.getElementById('nombre').value;
    const matematicas = parseFloat(document.getElementById('matematicas').value);
    const espanol = parseFloat(document.getElementById('espanol').value);
    const historia = parseFloat(document.getElementById('historia').value);

    let promedio = (matematicas + espanol + historia) / 3;
    promedio = Math.round(promedio * 10) / 10;

    const estado = promedio >= 6 ? 'Aprobado' : 'Reprobado';
    alumnos.push({ nombre, matematicas, espanol, historia, promedio, estado });
    localStorage.setItem('bd_calificaciones', JSON.stringify(alumnos));
    mostrarAlumnos();
    formulario.reset();
});

botonLimpiar.addEventListener('click', function() {
    if (confirm('¿Borrar todos los registros?')) {
        alumnos = [];
        localStorage.setItem('bd_calificaciones', JSON.stringify(alumnos));
        mostrarAlumnos();
    }
});
mostrarAlumnos();