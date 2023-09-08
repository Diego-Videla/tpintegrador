const form=document.querySelector(".formulario");
const fecha= document.querySelector("#fecha");
const direccion= document.querySelector("#direccion");
const dni= document.querySelector("#dni");
const telefono= document.querySelector("#telefono");
const mascota= document.querySelector("#mascota");
const btnguardar= document.querySelector("#btnguardar");
const errorfecha= document.querySelector(".errorfecha");
const errordirec= document.querySelector(".errordireccion");
const errordni= document.querySelector(".errordni");
const errortelefono= document.querySelector(".errortelefono");
const errormascota= document.querySelector(".errormascota");

//cargamos los turnos del local storage
const turnos = JSON.parse(localStorage.getItem('turnos')) || [];

//guardamos un nuevo turno
const guardarturno = () => {
    localStorage.setItem('turnos', JSON.stringify(turnos));
};

//chequea campos vacios
const isEmpty = (input) => {
    return !input.value.trim().length;
};
// chequea longitud valida
const validarlongitud = (input) => {
    return input.value.length == 10;
};


const crearturno=()=>{
    errorfecha.textContent= " ";
    errordirec.textContent= " ";
    errordni.textContent= " ";
    errortelefono.textContent= " ";
    errormascota.textContent= " ";
    let valido=true;
    if(isEmpty(fecha)){
        errorfecha.textContent= "Campo obligatorio";
        valido=false;
    }
    if(isEmpty(direccion)){
        errordirec.textContent= "Campo obligatorio";
        valido=false;
    }
    if(isEmpty(dni)){
        errordni.textContent= "Campo obligatorio";
        valido=false;
    }
    if(isEmpty(telefono)){
        errortelefono.textContent= "Campo obligatorio";
        valido=false;
    }
    if((!validarlongitud(telefono))&& (!isEmpty(telefono))){
        errortelefono.textContent= "Longitud invalido";
        valido=false;
    }
    if(isEmpty(mascota)){
        errormascota.textContent= "Campo obligatorio";
        valido=false;
    }
    if(valido){
        turnos.push({
            fecha: fecha.value,
            direccion: direccion.value,
            dni: dni.value,
            telefono: telefono.value,
            mascota: mascota.value,
            comentario: comentario.value
        })
        guardarturno();
        alert("Solicitud guardada con exito!")
        window.location.href = "index.html"
    }
}
const validateForm= (e) =>{
    e.preventDefault();
 }
const init = () =>{
    form.addEventListener("submit", validateForm)
    btnguardar.addEventListener("click", crearturno)
}

init()