let listaAmigos = [];

function agregarAmigo() {
    let inputElement = document.getElementById('amigo'); // Capturar el input real
    let input = inputElement.value.trim(); // Eliminar espacios en blanco antes y después

    if (input.length === 0 || !ValidarAmigo(input)) { // Detectar espacios vacíos o texto inválido
        alert("⚠️ Ingrese un nombre válido (solo letras y sin espacios vacíos)");
        return; // Salir de la función sin agregar el nombre
    }


    listaAmigos.push(capitalizarNombre(input));
    generarLista(); // Actualizar la lista en HTML

    // Limpiar el input correctamente
    inputElement.value = "";
    inputElement.focus();
}

function ValidarAmigo(amigo) {
    // Expresión regular mejorada para permitir nombres con apóstrofes
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+(?:[\s][A-Za-zÁÉÍÓÚáéíóúñÑ]+|'[A-Za-zÁÉÍÓÚáéíóúñÑ]+)*$/;
    return regex.test(amigo); // Validar solo letras, espacios y apóstrofes en nombres
}

function capitalizarNombre(nombre) {
    // Palabras que deben mantenerse en minúsculas (excepto si son la primera palabra)
    const excepciones = ["de", "del", "la", "las", "los", "y"]; // para nombres raros es completamente inecesario pero me da toc

    return nombre
        .trim() // Elimina espacios innecesarios al inicio y al final
        .toLowerCase() // Convierte todo a minúsculas
        .split(/\s+/) // Divide en palabras por cualquier espacio en blanco
        .map((palabra, index) => {
            // Mantener excepciones en minúsculas, excepto si es la primera palabra
            if (excepciones.includes(palabra) && index !== 0) {
                return palabra;
            }
            // Capitalizar la primera letra y mantener el resto igual
            return palabra.charAt(0).toUpperCase() + palabra.slice(1);
        })
        .join(" "); // Volver a unir las palabras con un solo espacio
}

function generarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = ""; // Limpiar la lista antes de actualizar

    listaAmigos.forEach(nombre => {
        let li = document.createElement("li");
        li.textContent = nombre;
        lista.appendChild(li);
    });
}

function sortearAmigo() {
    if (listaAmigos.length === 0) {
        alert("⚠️ No hay nombres en la lista para sortear.");
        return;
    }
    if (listaAmigos.length === 1) { // no es necesario pero que fome sortear solo a 1 
        alert("⚠️ Necesita al menos 2 participantes para sortear 💀. Agregue más nombres.");
        return;
    }

    // 🔥 Elegir un nombre aleatorio de la lista
    let indiceAleatorio = Math.floor(Math.random() * listaAmigos.length);
    let amigoSorteado = listaAmigos[indiceAleatorio];

    // 📝 Mostrar el nombre sorteado en la lista HTML
    let resultadoLista = document.getElementById("resultado");
    resultadoLista.innerHTML = ""; // Limpiar resultado anterior

    let li = document.createElement("li");
    li.textContent = `🎉 El amigo secreto es: ${amigoSorteado} 🎊`;
    resultadoLista.appendChild(li);

    //  Borrar la lista original no se especifica pero deberia hacerse o eliminarse solo el valor de la persona que salio sorteada
    listaAmigos = [];
    generarLista();
}

generarLista();