/*Estoy haciendo la pagina de una tienda de accesorios, por ahora se puede filtrar por material, tipo y en un intervalo de precio. Tambien se puede cambiar entre modo oscuro y claro. Todavia me falta agregar el carrito */
let precioMax
let precioMin
let productosDisponibles = []
let carrito = []
let filtrado = []
let tipos = ["Collar", "Pulsera", "Pendiente", "Anillo"]
let materiales = ["Oro", "Plata", "Acero", "Plastico", "Hilo"]
// Clase constructora
class producto{
    constructor(nombre, tipo, material, precio, img, descripcion){
       this.nombre = nombre
       this.tipo = tipo,
       this.material = material,
       this.precio = precio
       this.img = img
    }
}
const ArosPlata = new producto("Aros de plata", "Pendiente", "Plata", 2200, "ArosPlata.jpg")
const PendientesCorazonAzul = new producto("Pendientes dorados con dije de corazon azul", "Pendiente", "Oro", 800, "PendientesCorazonAzul.jpg")
const PendientePerla = new producto ("Pendiente con perla blanca", "Pendiente", "Oro", 1200, "PendientePerla.jpg")
const ArosAceroQuirurgico = new producto ("Aros de acero quirurgico chapado en oro", "Pendiente", "Acero", 1500, "ArosAceroQuirurgico.jpg")
const CadenaDijeOro = new producto ("Cadenita con dije de oro", "Collar", "Oro", 2400, "CadenitaDijeOro.jpg")

productosDisponibles = [ArosPlata, PendientePerla, PendientesCorazonAzul, ArosAceroQuirurgico, CadenaDijeOro]

let catalogo = document.getElementById("catalogo")
let listaMateriales = document.getElementById("listaMateriales")
let listaTipos = document.getElementById("listaTipos")
let precioMinInput = document.getElementById("precioMin")
let precioMaxInput = document.getElementById("precioMax")
let filtrarPrecioBtn = document.getElementById("filtrarPrecioBtn")
let btnCarrito = document.getElementsByClassName("btn-carrito")
// Genera una card en el HTML para cada producto de un array
function mostrarCatalogo(array){
    for(let producto of array){
       let nuevoProductoDiv = document.createElement("div")
       nuevoProductoDiv.className = "col-lg-4 mb-2"
       nuevoProductoDiv.innerHTML = `
       <div class="card col-lg-12">
       <img src="img/${producto.img}" class="card-img-top" alt="${producto.nombre}">
       <div class="card-body">
           <h4 class="card-title">${producto.nombre}</h4>
           <p class="precio">$${producto.precio}</p>
           <button id="${producto.nombre}" class="btn btn-carrito btn-primary">Agregar al carrito</button>
       </div>
     </div>
   `
       catalogo.appendChild(nuevoProductoDiv)
    }
 }
 // Hace un checkbox para cada material 
 function mostrarListaMateriales(){
   for(let item of materiales){
      let nuevoMaterialLi = document.createElement("li")
      nuevoMaterialLi.innerHTML = 
      `<label>
        <input type="checkbox" name="material" value=${item} id=${item}>
        ${item}
      </label>`
    console.log(nuevoMaterialLi)
    listaMateriales.appendChild(nuevoMaterialLi)   
   }
}
// Esta funcion detecta cambios en los checkbox de listaMateriales y si alguno de ellos esta checkedo se muestran los productos de ese material
listaMateriales.addEventListener("change", function(event) {
   const target = event.target
   if (target.nodeName === "INPUT" && target.type === "checkbox") {
      const checked = target.checked
      const value = target.value
      if (checked) {
         filtrarPorMaterial(value)
      } else {
         catalogo.innerHTML = ""
         mostrarCatalogo(productosDisponibles)
      }
   }
})
// Hace un checkbox para cada tipo
function mostrarListaTipos(){
   for(let item of tipos){
      let nuevoTipoLi = document.createElement("li")
      nuevoTipoLi.innerHTML = 
      `<label>
        <input type="checkbox" name="tipo" value=${item} id=${item}>
        ${item}
      </label>`
    console.log(nuevoTipoLi)
    listaTipos.appendChild(nuevoTipoLi)   
   }
}
// Detecta cambios en los checkbox de listaTipos y si alguno de ellos esta checkedo se muestran los productos de ese tipo
listaTipos.addEventListener("change", function(event) {
   const target = event.target
   if (target.nodeName === "INPUT" && target.type === "checkbox") {
      const checked = target.checked
      const value = target.value
      if (checked) {
         filtrarPorTipo(value)
      } else {
         catalogo.innerHTML = ""
         mostrarCatalogo(productosDisponibles)
      }
   }
})
// Busca los productos que tengan ese tipo como propiedad. Si no hay ninguno, devuelve un texto diciendo que la busqueda no tuvo resultados. De lo contrario, muestra los productos encontrdos.
 function filtrarPorTipo(tipo) {
   filtrado = productosDisponibles.filter((producto) => {
      return producto.tipo == tipo
    })
    if (filtrado.length == 0) {
      catalogo.innerHTML = ""
      let noResultados = document.createElement("p")
      noResultados.innerHTML = `<p>Lamentablemente ningun producto coincide con su busqueda</p>`
      catalogo.appendChild(noResultados)
    }
    else {
      catalogo.innerHTML = ""
      mostrarCatalogo(filtrado)
    }
    
 }
 // Busca los productos que tengan ese material como propiedad. Si no hay ninguno, devuelve un texto diciendo que la busqueda no tuvo resultados. De lo contrario, muestra los productos encontrdos.
 function filtrarPorMaterial(material) {
   filtrado = productosDisponibles.filter((producto) => {
      return producto.material == material
    })
    if (filtrado.length == 0) {
      catalogo.innerHTML = ""
      let noResultados = document.createElement("p")
      noResultados.innerHTML = `<p>Lamentablemente ningun producto coincide con su busqueda</p>`
      catalogo.appendChild(noResultados)
    }
    else {
      catalogo.innerHTML = ""
      mostrarCatalogo(filtrado)
    }
   }

precioMinInput.addEventListener("input", function () {
   precioMin = parseInt(precioMinInput.value)
}
)
precioMaxInput.addEventListener("input", function () {
   precioMax = parseInt(precioMaxInput.value)
})
// Esta funcion busca los productos cuyos precios se encuentren entre los precios ingresados por el usuario.
function filtrarPorPrecio(array){
   filtrado = productosDisponibles.filter((producto) => {
      return producto.precio >= precioMin && producto.precio <= precioMax
    })
    if(filtrado.length == 0) {
      catalogo.innerHTML = ""
      let noResultados = document.createElement("p")
      noResultados.innerHTML = `<p>Lamentablemente ningun producto coincide con su busqueda</p>`
      catalogo.appendChild(noResultados)
    }
    else {
      catalogo.innerHTML = ""
      mostrarCatalogo(filtrado)
    }
}
filtrarPrecioBtn.addEventListener("click", function() {
      filtrarPorPrecio()
})
mostrarCatalogo(productosDisponibles)
mostrarListaMateriales()
mostrarListaTipos()