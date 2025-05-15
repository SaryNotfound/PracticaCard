//  Seleccionamos el contenedor con el ID correcto
const contenedor = document.querySelector('.contenedor-tarjetas');
const url = 'data.json';

// Función para obtener datos usando async/await y fetch
const obtenerDatos = async () => { //async → marca que la función usará await.
  try {   // Respuestas y peticiones JSON  forma de representar datos como texto.
    const respuesta = await fetch(url); //fetch() → hace una petición (devuelve una promesa). // peticion json
    const personas = await respuesta.json(); // await → espera que esa promesa se resuelva./ respuesta JSON convertida a objeto JS


    //Desestructuración extrae propiedades de objetos o arrays fácilmente.

    personas.forEach(({ nombre, descripcion, imagen }) => {
      const tarjeta = crearTarjeta({ nombre, descripcion, imagen });
      contenedor.appendChild(tarjeta);
    });
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
};
//Arrow Functions (funciones flecha)
//  Creamos las tarjetas con clases 
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
