let productosDisponibles = []
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
function mostrarCatalogo(array){
    for(let producto of array){
       let nuevoProductoDiv = document.createElement("div")
       nuevoProductoDiv.className = "card"
       nuevoProductoDiv.innerHTML = `<div id="${producto.nombre}" class="card">
                                  <img src="img/${producto.img}" class="card-img" alt="${producto.nombre}">
                                     <h4 class="card-title">${producto.nombre}</h4>
                                     <p class="precio">$${producto.precio}</p>
                                  <button id="${producto.nombre}"">Agregar al carrito</button>
                               </div>`
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
mostrarCatalogo(productosDisponibles)
mostrarListaMateriales()
mostrarListaTipos()