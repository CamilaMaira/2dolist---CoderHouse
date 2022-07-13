const key = "lista_tareas";

const tareas = [
  { id: 1, contenido: "Entrega CoderHouse", tag: "Para hoy", estado: false },
  { id: 2, contenido: "Tomar desayuno", tag: "Hecho", estado: true },
  { id: 3, contenido: "Nico", tag: "Por hacer", estado: false },
  { id: 4, contenido: "Cine conmigo mismo", tag: "Para hoy", estado: false },
  { id: 5, contenido: "Almuerzo con mamá", tag: "Hecho", estado: true },
  { id: 6, contenido: "Estudio AM", tag: "Hecho", estado: true },
];

class Tarea {
  constructor(tarea) {
    this.contenido = tarea.contenido;
    this.tag = tarea.tag;
    this.id = tarea.id;
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

//PREGUNTAR NOMBRE

 askNombre = () => {
    Swal.fire({
      title: "Bienvenide a la mejor TO-DO List del planeta",
      text: "Escribe tu nombre",
      input: 'text',
      showCancelButton: true        
  }).then((result) => {
      if (result.value) {
          const input = document.createElement("p");
          input.innerHTML = `Hola, ${result.value}`;
          contenedorNombre.appendChild(input);
      }
    })
};
askNombre();


//VALUE NUEVA TAREA


//BOTON ENVIAR NUEVA TAREA
btnSend.onclick = () => {
  sendTarea();
};

// PUSH NUEVA TAREA
sendTarea = () => {
  //ID
  let largoArray = tareas.length;
  const id = largoArray + 1;
  const selectValue = select.options[select.selectedIndex].value; 

  const tarea = input.value;
  if (!tarea) {
    return } 
    tareas.push({id: id, contenido: tarea, tag: selectValue, estado: false });
    console.log(tareas);

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
		}
	};

	const guardarStorage = () => {
		localStorage.setItem(key, JSON.stringify(tareas));
    //localStorage.setItem(key, JSON.stringify(input));
	};

	// Definir función que refresca la lista de tareas a partir del arreglo global
	const refreshLista= () => {
		mainContenedor.innerHTML = "";
		for (const [indice, tarea] of tareas.entries()) {

			// ENLACE PARA ELIMINAR DEL DOM TAREAS
			const deleteItem = document.createElement("a");
			deleteItem.classList.add("enlace-eliminar");
			deleteItem.innerHTML = "&times;";
			deleteItem.href = "";
			deleteItem.onclick = (e) => {
				e.preventDefault();
				if (!Swal.fire({
          title: 'Estas segure?',
          text: "muy muy segure?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, borralo!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Borrado',
              'Tu tarea ha sido borrada de nuestra base de datos',
              'success'
            )
          }
        })) {
					return;
				}
				tareas.splice(indice, 1);
				// GUARDAR CAMBIOS
				guardarStorage();
				refreshLista();
			};

			//SPAN CON TAREA.CONTENIDO
			const span = document.createElement("span");
      const p = document.createElement("p");
			span.textContent = tarea.contenido;
      p.textContent = tarea.tag;
			const itemDiv = document.createElement("div");
      itemDiv.classList.add("tarea-contenedor");
      
			if (tarea.contenido) {
				itemDiv.appendChild(span);
        itemDiv.appendChild(p)
			  itemDiv.appendChild(deleteItem);
			  mainContenedor.appendChild(itemDiv);
			}
		}
	};

	newTareas = obtenerTareas();
	refreshLista();
});



