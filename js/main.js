let precioMax
let precioMin
let productosDisponibles = []
let carrito = []
let filtrado = []
let tipos = ["Collar", "Pulsera", "Pendiente", "Anillo"]
let materiales = ["Oro", "Plata", "Acero", "Plastico", "Hilo"]
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
if(localStorage.getItem("carrito")){
   for(let producto of JSON.parse(localStorage.getItem("carrito"))){
      let productoStorage = new producto(producto.nombre, producto.tipo, producto.material, producto.img)
      carrito.push(libroStorage)
   }
}
else{
   carrito = []
   localStorage.setItem("carrito", carrito)
}
// btnCarrito.addEventListener("click", function( {

// }))

mostrarCatalogo(productosDisponibles)
mostrarListaMateriales()
mostrarListaTipos()