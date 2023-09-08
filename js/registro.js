const form= document.querySelector(".formulario");
const nombre= document.querySelector("#nombre");
const apellido= document.querySelector("#apellido");
const email= document.querySelector("#usuario");
const contraseña= document.querySelector("#contraseña");
const btnguardar= document.querySelector(".btnguardar");
const errornombre = document.querySelector("#errornombre");
const errorapellido = document.querySelector("#errorapellido");
const erroremail = document.querySelector("#errorusuario");
const errorcontraseña = document.querySelector("#errorcontraseña");

//cargamos los usuarios del local storage
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

//guardamos un nuevo usuario
const guardarusuario = () => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
};

//chequea campos vacios
const isEmpty = (input) => {
    return !input.value.trim().length;
};

// chequea longitud valida
const isBetween = (input, min, max) => {
    return input.value.length >= min && input.value.length < max;
};

// Función para validar una dirección de email con expresión regular
const isEmailValid = (input) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return re.test(input.value.trim());
};
// Función para chequear si el email ya existe
const isExistingMail = (input) => {
    return usuarios.some((usuarios) => usuarios.email === email.value);
};
// Función para validar una constraseña con expresión regular
const isPassSecure = (input) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    return re.test(input.value.trim());
};


const validarnombre=()=>{
    if(!isEmpty(nombre))
    {
        errornombre.textContent = " ";
        return true;
    }
    else
    {
        errornombre.textContent = "Dato obligatorio";
        return false;
    }
}
const validarapellido=()=>{
    if(!isEmpty(apellido))
    {
        errorapellido.textContent = " ";
        return true;
    }
    else
    {
        errorapellido.textContent = "Dato obligatorio";
        return false;
    }
}
const validaremail=()=>{
    if(isEmpty(email))
    {
        erroremail.textContent = "Dato obligatorio";
        return false;
    }
    if(!isEmailValid(email)){
        erroremail.textContent = "Formato invalido";
        return false
    }
    if(isExistingMail(email)){
        erroremail.textContent = "El usuario ingresado ya esta registrado";
        return false;
    }
    erroremail.textContent = " ";
    return true;
    
}
const validarcontraseña=()=>{
    if(isEmpty(contraseña))
    {
        errorcontraseña.textContent = "Dato obligatorio";
        return false;
    }
    if(!isBetween(contraseña,6,11)){
        errorcontraseña.textContent = "La contraseña debe tener entre 6 y 10 caracteres";
        return false
    }
    errorcontraseña.textContent = " ";
    return true;
    
}
 const validateForm= (e) =>{
    e.preventDefault();
 }
const crearusuario =() =>{
    validarnombre();
    validarapellido();
    validaremail();
    validarcontraseña();
    if((validarnombre())&&(validarapellido())&&(validaremail())&&(validarcontraseña())){
        usuarios.push({
            nombre: nombre.value,
            apellido: apellido.value,
            email: email.value,
            contraseña: contraseña.value
        })
        guardarusuario(usuarios)
        alert("Te has registrado con exito!")
        nombre.value= " ";
        apellido.value= " ";
        contraseña.value=" ";
        email.value=" ";
    }
}
const init = () =>{
    form.addEventListener("submit", validateForm)
    btnguardar.addEventListener("click", crearusuario)
}

init()