const form=document.querySelector(".form-loguin");
const usuario=document.querySelector("#usuario");
const contraseña=document.querySelector("#contraseña");
const btn=document.querySelector("#btningresar");
const errorusuario=document.querySelector("#errorusuario");
const errorcontraseña=document.querySelector("#errorcontraseña");

const usuarios=JSON.parse(localStorage.getItem('usuarios')) || [];
//chequea si esta vacio
const isEmpty = (input) => {
    return !input.value.trim().length;
};

const buscarusuario=() =>{
    return usuarios.some((usuarios) => usuarios.email === usuario.value && usuarios.contraseña== contraseña.value);
}
const validarcampos=()=>{
    let valid=0;
    if(isEmpty(usuario)){
        errorusuario.textContent="Campo Obligatorio";
    }
    else{
        errorusuario.textContent= " ";
        valid ++;
    }
    if(isEmpty(contraseña)){
        errorcontraseña.textContent="Campo Obligatorio";
    }
    else{
        errorcontraseña.textContent= " ";
        valid ++;
    }
    if(valid==2){
        return true
    }
    else{
        return false
    }
    
}
const cargarsessionstorage=(loguin)=>{
    sessionStorage.setItem('user', JSON.stringify(loguin));
}
const validarusuario=()=>{
    if(validarcampos()){
        if(!buscarusuario()){
            errorcontraseña.textContent = "USUARIO INCORRECTO";
            return
        }
        const loguin= usuarios.filter(usuarios=>(usuarios.email==usuario.value));
        console.log(loguin);
        cargarsessionstorage(loguin);
        window.location.href ="./index.html";
    }
    
}
const validarform=(e)=>{
    e.preventDefault();
}
const init=()=>{
    
    form.addEventListener("submit", validarform)
    btn.addEventListener("click", validarusuario)
}

init()