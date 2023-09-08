const productos = [
    {
      id: 1,
      nombre: "Agility adulto x 20kg",
      precio: 500,
      imagen: "./imagenes/img-alimento1.png",
      categoria: "alimentos",
    },
  
    {
      id: 2,
      nombre: "Agility derma  3kg",
      precio: 1500,
      categoria: "alimentos",
      imagen: "./imagenes/img-alimento2.png",
    },
  
    {
      id: 3,
      nombre: "Biopet 20kg",
      precio: 1380,
      categoria: "alimentos",
      imagen: "./imagenes/img-alimento3.png",
    },
  
    {
      id: 4,
      nombre: "Excellent Cat Adulto",
      precio: 1000,
      categoria: "alimentos",
      imagen: "./imagenes/img-alimento4.png",
    },
  
    {
      id: 5,
      nombre: "Excellent Cat Kitten",
      precio: 600,
      categoria: "alimentos",
      imagen: "./imagenes/img-alimento5.png",
    },
    {
        id: 6,
        nombre: "Excellent sterilized",
        precio: 600,
        categoria: "alimentos",
        imagen: "./imagenes/img-alimento6.png",
    },
    {
        id: 7,
        nombre: "collar",
        precio: 600,
        categoria: "accesorios",
        imagen: "./imagenes/img-collar1.png",
    },

    {
        id: 8,
        nombre: "collar y correa",
        precio: 600,
        categoria: "accesorios",
        imagen: "./imagenes/img-collar2.png",
    },
    {
        id: 9,
        nombre: "Comedero plegable",
        precio: 600,
        categoria: "accesorios",
        imagen: "./imagenes/img-comedero.png",
    },
    {
        id: 10,
        nombre: "Pelota con silbato",
        precio: 600,
        categoria: "juguetes",
        imagen: "./imagenes/img-pelota.png",
    },
    {
        id: 11,
        nombre: "Hueso de goma",
        precio: 600,
        categoria: "jueguetes",
        imagen: "./imagenes/img-pelota1.png",
    },
    {
        id: 12,
        nombre: "Pelota maciza",
        precio: 600,
        categoria: "jueguetes",
        imagen: "./imagenes/img-pelota2.png",
    },
   
  ];
  const contproduc= document.querySelector(".productos-contenedor");
  const userloguin= document.querySelector(".usuario-loguin");
  const btnsalir= document.querySelector("#btnsalir");
  const contcategorias= document.querySelector(".categorias-contenedor");
  const categoriesList = document.querySelectorAll('.categoria');
  const cart= document.querySelector("#cart-toggle");
  const inputmenu= document.querySelector("#menu-toggle");
  const menu= document.querySelector(".navbar-list");
  const contenedorcompras= document.querySelector(".contenedor-compras");
  const carritocomp= document.querySelector(".carritocompras");
  const btncomprar= document.querySelectorAll(".boton");
  const btnborrar = document.querySelector(".btnborrar");
  const totalprecio= document.querySelector(".totalprecio");
  const comprarcarrito= document.querySelector(".btncomprar");
  const usuario= JSON.parse(sessionStorage.getItem('user')) || [];
  let carrito= JSON.parse(localStorage.getItem('carrito')) || [];
  
 


  const crearhtml = (produc) => {
    const { id, nombre, precio, categoria ,imagen } = produc;
    return `<div class="producto-info">
                <img src=${imagen}>
                <p class="producto-titulo"> ${nombre} </p>
                <p class="producto-precio"> ${precio}</p>
                <button class="boton"
                            data-id='${id}'
                            data-name='${nombre}'
                            data-bid='${precio}'
                            data-img='${imagen}'>Comprar
                </button>
              </div>`;
  }
  
  const cargarusuario=()=>{
    userloguin.textContent= ( usuario[0].nombre + "  " + usuario[0].apellido);
    
  }
  const renderizarproduct = () => {
    contproduc.innerHTML = productos.map((productos) => crearhtml(productos)).join("");
  };
  const cerrarsession=()=>{
    if(window.confirm("¿Estas seguro que deseas cerrar sesión?")){
      sessionStorage.removeItem("user")
      window.location.href = "./login.html"
    }
  }
  const filtrarproductos= (btn)=>{
    const productosfiltrados = productos.filter((productos)=> productos.categoria == btn.dataset.category);
    contproduc.innerHTML = productosfiltrados.map((productos)=> crearhtml(productos)).join("");
  }
  // Fucnión para cambiar el estado de los botones del filtro/categorias
const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoriesList];
  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove('activa');
      return;
    }
    categoryBtn.classList.add('activa');
  });
}
  const filtrarcategoria = (event) =>{
    const { target } = event;
    if(target.classList.contains("activa")){
      return;
    }
    if(target.dataset.category== 'todos')
    {
      renderizarproduct();
    }
    else
    {
      filtrarproductos(target);
    }
    changeBtnActiveState(target.dataset.category);
  }
  const opencart=()=>{
    inputmenu.checked=false;
    if(cart.checked == true){
      carritocomp.classList.remove('carritocompras');
      carritocomp.classList.add('open-cart');
      /*if(inputmenu.checked==true){
        menu.classList.remove('navbar-list');
        menu.classList.add('cerrarmenu');
        inputmenu.checked=false;
      }*/
    }
    else{
      carritocomp.classList.remove('open-cart');
      carritocomp.classList.add('carritocompras');
    }
  }
  const guardarcarrito = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

  const crearhtmlcarrito=(carrito)=>{
    const { id, nombre, precio, imagen,cantidad } = carrito;
    const subtotal= (Number(precio) * Number(cantidad))
    return `<div class="contenedor-compras-productos">
               <div class="img-produc">
                    <img src=${imagen}>
                </div>
                <div class="descripcion-producto">
                    <p class="descripcion-producto-nombre">${nombre}</p>
                    <p class="descripcion-producto-precio"> ${subtotal} </p>
                </div>
                <div class="cantidad-producto">
                  <button class="btnrestar" data-idproduc=${id}>-</button>
                  <p>${cantidad}</p>
                  <button class="btnsumar" data-idproduc=${id}>+</button>
                </div>
            </div>`;
  }
  const cargarcarrito=(carr)=> { 
    contenedorcompras.innerHTML = carr.map((carr) => crearhtmlcarrito(carr)).join("");
  }
  const cargararraycarrito=(target)=>{
    nuevoproducto={id: target.id,
       nombre:target.name,
       cantidad: 1, 
       precio: target.bid ,
       imagen: target.img}
       contenedorcompras.innerHTML+=crearhtmlcarrito(nuevoproducto);
    carrito.push({
        id:nuevoproducto.id,
        nombre: nuevoproducto.nombre,
        precio: nuevoproducto.precio,
        cantidad: 1,
        imagen: nuevoproducto.imagen,
        usuario: usuario[0].email

     })
  }
  const inicializarcarrito=()=>{
    const carritofiltrado= carrito.filter((carrito)=>carrito.usuario== usuario[0].email);
    cargarcarrito(carritofiltrado);
  }
  const comprar=(e)=>{
    if(e.target.classList.contains("boton")){
      const existe = carrito.find((carrito) => carrito.id == e.target.dataset.id);
      console.log(existe);
      if(!existe){
        cargararraycarrito(e.target.dataset);
        guardarcarrito();
      }
      else{
        modificarcantidad('sumar', e.target.dataset.id);
        inicializarcarrito();
        guardarcarrito();
      }
      calculartotal();
    }
  }
  const modificarcantidad=(accion,id)=>{
    if(accion=='sumar'){
      for(let i=0; i< carrito.length; i++){
        if((carrito[i].id== id) && (carrito[i].usuario== usuario[0].email)){
          
          carrito[i].cantidad= carrito[i].cantidad + 1; 
        }
      }
    }
    if(accion=='restar'){
      for(let i=0; i< carrito.length; i++){
        if((carrito[i].id== id) && (carrito[i].usuario== usuario[0].email)){

          if(carrito[i].cantidad>1){
            carrito[i].cantidad= carrito[i].cantidad - 1; 
          }
          else{
            carrito=carrito.filter((carrito)=>carrito.id !== id);
          }
        }
      }
    }
  }
 const cantidadproductos=(e)=>{
    if(e.target.classList.contains("btnrestar")){
      modificarcantidad('restar', e.target.dataset.idproduc);
    }
    if(e.target.classList.contains("btnsumar")){
      modificarcantidad('sumar', e.target.dataset.idproduc);
    }
    inicializarcarrito();
    guardarcarrito();
    calculartotal();
  }
  const calculartotal=()=>{
    let resultado=0;
    for(let i=0;  i< carrito.length; i++)
    {
      if(carrito[i].usuario== usuario[0].email)
      {
        resultado= resultado + (Number(carrito[i].precio) * Number(carrito[i].cantidad));
      }
    }
    totalprecio.innerHTML= "$" + resultado
  }  
  const borrartodo=()=>{
    carrito= carrito.filter((carrito)=>carrito.usuario !== usuario[0].email);
    inicializarcarrito();
    guardarcarrito();
    calculartotal();

  }
  const completarcompraaccion = (confirmMsg, successMsg) =>{
    if(!carrito.length) return;
    if(window.confirm(confirmMsg)){
      borrartodo();
      alert(successMsg)
    }
  }
  const completarcompra = () =>{
    completarcompraaccion("¿Desea completar su compra?", "¡Gracias por su compra!")
  }
  const controlamenuhamburguesa=()=>{
    if(inputmenu.checked == true){
      menu.classList.remove('cerrarmenu');
      menu.classList.add('navbar-list');
      if(cart.checked==true){
        carritocomp.classList.remove('open-cart');
        carritocomp.classList.add('carritocompras');
        cart.checked= false;
      }
    }
    else{
      menu.classList.remove('navbar-list');
      menu.classList.add('cerrarmenu');
    }
  }
  const inicializar=()=>{
    if(usuario.length==0){
      window.location.href ="./login.html";
      return
    }
      renderizarproduct();
      cargarusuario();
      inicializarcarrito();
      calculartotal();
  }

  const init = () =>{
    document.addEventListener("DOMContentLoaded", inicializar)
    btnsalir.addEventListener("click", cerrarsession)
    cart.addEventListener("click", opencart)
    contcategorias.addEventListener("click",filtrarcategoria)
    contproduc.addEventListener("click", comprar)
    contenedorcompras.addEventListener("click", cantidadproductos)
    btnborrar.addEventListener("click",borrartodo)
    comprarcarrito.addEventListener("click",completarcompra)
    inputmenu.addEventListener("click", controlamenuhamburguesa)
  }
  
  init();