const key = "lista_tareas";
const name_key = "name_input"
const tareasJSON = "./tareas.json";

/*const tareas = [
  { id: 1, contenido: "Entrega CoderHouse", estado: "Para hoy", tag: "Personal" },
  { id: 2, contenido: "Aseo Semanal", estado: "Hecho", tag: "Casa" },
  { id: 3, contenido: "Junta con Nico", estado: "Por hacer", tag: "Personal" },
  { id: 4, contenido: "Curso Udemy", estado: "Para hoy", tag: "Trabajo" },
  { id: 5, contenido: "Almuerzo con mamá", estado: "Hecho", tag: "Casa" },
  { id: 6, contenido: "Estudio AM", estado: "Por Hacer", tag: "Personal" },
  { id: 7, contenido: "Jueves 15.00: Reunión de Contenidos", estado: "Hecho", tag: "Trabajo" },
];*/

class Tarea {
  constructor(tarea) {
    this.id = tarea.id;
    this.contenido = tarea.contenido;
    this.tag = tarea.tag;
    this.estado = tarea.estado;
  
    }
  };

document.addEventListener("DOMContentLoaded", () => {

let newTareas = [];

/* DOM */

let input = document.querySelector("#nuevaTarea");
let btnSend = document.querySelector("#btnSend");
let mainContenedor = document.querySelector("#contenedorTareas");
let contenedorNombre = document.querySelector("#nombre");
let select = document.querySelector("#select");
let tag = document.querySelector("#selectTag");


//PREGUNTAR NOMBRE

askNombre = () => {
    Swal.fire({
      title: "Bienvenide a TO-DO List",
      text: "Escribe tu nombre",
      input: 'text',
      showCancelButton: true        
  }).then((result) => {
      if (result.value) {
          const inputName = document.createElement("p");
          inputName.innerHTML = `Hola ${result.value} ✨`;
          inputName.classList.add("name-input")
          contenedorNombre.appendChild(inputName);
      }
    })
};
askNombre();

//BOTON ENVIAR NUEVA TAREA
btnSend.onclick = () => {
  sendTarea();
};

// PUSH NUEVA TAREA
sendTarea = () => {
  //ID
  let largoArray = newTareas.length;
  const id = largoArray + 1;
  const selectEstado = select.options[select.selectedIndex].value;
  const selectTag = tag.options[tag.selectedIndex].value;



  const tarea = input.value;
  if (!tarea) {
    return } 
    newTareas.push({id: id, contenido: tarea, tag: selectTag, estado: selectEstado });
  
  guardarStorage();
  refreshLista();
};


//LOCAL STORAGE
	const obtenerTareas = () => {
	const itemList = JSON.parse(localStorage.getItem(key));
	if (itemList) {
    return itemList;
	} else {
	return [];
}};

const guardarStorage = () => {
	localStorage.setItem(key, JSON.stringify(newTareas));
};

//// FETCH
const getTareas = () => {
  mainContenedor.innerHTML='Cargando..';
  fetch("./tareas.json")
  .then((res) => {
    return res.json()
  })
  .then(tareas => {
    for (const tarea of Object.values(tareas)) {
          const span = document.createElement("span");
          const tag = document.createElement("p");
          const estado = document.createElement("p");
          span.textContent = tarea.contenido;
          tag.textContent = tarea.tag;
          tag.classList.add("tag-label");
      
          estado.textContent = tarea.estado;
          const itemDiv = document.createElement("div");
          itemDiv.classList.add("tarea-contenedor");
          
          if (tareas.contenido) {
            itemDiv.appendChild(span);
            itemDiv.appendChild(tag)
            itemDiv.appendChild(estado)
            mainContenedor.appendChild(itemDiv);
        }
    }
  })
};

getTareas();

  // INSERTAR TAREAS EN EL DOM
const cargarTareas = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = true;
      if (res) {
        resolve(newTareas);
      } else {
        reject(400);
      }
    }, 2000)
  })
}; 


	// Definir función que refresca la lista de tareas a partir del arreglo global
const refreshLista= () => {
	mainContenedor.innerHTML = "";
	for (const [indice, tarea] of newTareas.entries()) {

			// ENLACE PARA ELIMINAR DEL DOM ALGUNA TAREAS
    const deleteItem = document.createElement("a");
			deleteItem.classList.add("enlace-eliminar");
			deleteItem.innerHTML = "&times;";
			deleteItem.href = "";
			deleteItem.onclick = (e) => {
				e.preventDefault();
				if (!Swal.fire({
          title: '¿Deseas eliminar esta tarea?',
          text: "¿Segur@?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, borralo!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              '¡Listo!',
              'Tu tarea ha sido eliminada de nuestra base de datos',
              'success'
            )
          }
        })) {
					return;
				}
				newTareas.splice(indice, 1);
				// GUARDAR CAMBIOS
				guardarStorage();
				refreshLista();
			};

			//SPAN CON TAREA.CONTENIDO

      cargarTareas();
         const span = document.createElement("span");
         const tag = document.createElement("p");
         const estado = document.createElement("p");
         tag.textContent = tarea.tag;
         tag.classList.add("tag-label")
         span.textContent = tarea.contenido;
         estado.textContent = tarea.estado;
         const itemDiv = document.createElement("div");
         itemDiv.classList.add("tarea-contenedor");
          
         if (tarea.contenido) {
          itemDiv.appendChild(tag)
           itemDiv.appendChild(span);
           itemDiv.appendChild(estado)
           itemDiv.appendChild(deleteItem);
           mainContenedor.appendChild(itemDiv);
      }
		}
	};

	newTareas = obtenerTareas();
	refreshLista();
});



