// ✅ Seleccionamos el contenedor con el ID correcto
const contenedor = document.querySelector('.contenedor-tarjetas');
const url = 'data.json';

// ✅ Función para obtener datos usando async/await y fetch
const obtenerDatos = async () => {
  try {
    const respuesta = await fetch(url);
    const personas = await respuesta.json();

    personas.forEach(({ nombre, descripcion, imagen }) => {
      const tarjeta = crearTarjeta({ nombre, descripcion, imagen });
      contenedor.appendChild(tarjeta);
    });
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
};

// ✅ Creamos las tarjetas con clases correctas
const crearTarjeta = ({ nombre, descripcion, imagen }) => {
  const tarjeta = document.createElement('div');
  tarjeta.className = 'tarjeta';

  tarjeta.innerHTML = `
    <img src="${imagen}" alt="${nombre}">
    <h2>${nombre}</h2>
    <p>${descripcion}</p>
  `;

  return tarjeta;
};

obtenerDatos();

// añadir una tarjeta.

const formulario = document.getElementById('formulario-tarjeta');
const contenedorT = document.querySelector('.contenedor-tarjetas');

formulario.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita que recargue la página

  const nombre = document.getElementById('nombre').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();
  const inputImagen = document.getElementById('imagen');
  const archivo = inputImagen.files[0]; // archivo subido

  if (!nombre || !descripcion || !archivo) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  // Leer la imagen como URL para mostrarla
  const lector = new FileReader();
  lector.onload = () => {
    const nuevaTarjeta = crearTarjeta({
      nombre,
      descripcion,
      imagen: lector.result // URL base64 de la imagen cargada
    });

    contenedor.appendChild(nuevaTarjeta);

    // Limpiar formulario
    formulario.reset();
  };

  lector.readAsDataURL(archivo);
});
