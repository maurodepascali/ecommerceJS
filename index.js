//creo mis productos
let productos = [
    {
        name:"Nike Revolution",
        price: 16000,
        img: "./img/nikeRevolution.jpeg",
        id: 1,
        cantidad:1
    },
    {
        name:"Nike Airmax",
        price: 20000,
        img: "./img/nikeAirmax.jpeg",
        id: 2,
        cantidad:1
    },
    {
        name:"Adidas Galaxy",
        price: 18000,
        img: "./img/adidasGalaxy.jpeg",
        id: 3,
        cantidad:1
    }
]


//creo variable para mostrar mis productos en el HTML
const mostrarProductos = document.getElementById("mostrarProductos")
const productosEnCarrito = document.getElementById("carrito")
const moneda = "$"
const btnCarrito = document.getElementById("cart")
const verCarrito = document.getElementById("verCarrito")
//inicializo mi carrito
let carrito = []

//se espera que cargue el documento
document.addEventListener('DOMContentLoaded', () => {
    //estoy diciendo si hay productos en el carrito para que se almacene y no se borre cada vez que actualizo la pagina
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
        console.log("tenes productos en el carrito")
    }else{
        console.log("carrito vacio")
        const carritoVacio = document.getElementById("carritoVacio")
        carritoVacio.innerText = "No tienes productos en el carrito!"
    }
})

let isShow = true
btnCarrito.addEventListener("click", ()=> {
    if(isShow){
        verCarrito.style.display="block"
        isShow = false
    }else{
        verCarrito.style.display="none"
        isShow = true
    }
})


//recorro mis productos para mostarlos en el HTML
productos.forEach((producto) => {
    const div = document.createElement('div')
    div.innerHTML = `
    <img src=${producto.img}>
    <h2 class="text-center" style="margin-top:-40px">${producto.name}</h2>
    <h4 class="text-center">${moneda}${producto.price}</h4>
    <button class="btn btn-primary" id='btn-agregar${producto.id}' style="margin-left:63px">AGREGAR</button>
    `
    mostrarProductos.appendChild(div)
    //creo boton para agregar producto al carrito 
    const btnAgregar = document.getElementById(`btn-agregar${producto.id}`)
    //creo evento click para que se agregue el producto
    btnAgregar.addEventListener('click', () => {
        console.log("se agrego producto al carrito")
        agregarAlCarrito(producto.id)
        
    })
})


    //funcion para agregar productos al carrito a traves del id
    const agregarAlCarrito = (productoId) => {

        //creamos cantidad para que se actualizan las cantidades del mismo producto
        //some es para comprobar si el elemento existe en el carrito
        const existeProducto = carrito.some(producto => producto.id === productoId)
        //verificamos si existe el producto
        if(existeProducto){
            //creamos variable para que con map se actualizan la cantidad
            const producto = carrito.map(producto => {
                if(producto.id === productoId){
                    producto.cantidad++  
                    //carrito.length= carrito.reduce((acumulador,producto) => acumulador + producto.cantidad,0 ) 
                    //console.log(carrito)
                }                  
            })
        }else{
            //buscamos en mis productos a traves del metodo find producto por su id
        const item = productos.find((producto) => producto.id === productoId)
        //con metodo push lo agrega al carrito
        carrito.push(item)
        console.log(carrito) 
        }
        actualizarCarrito()    
    }

    const eliminarDelCarrito = (productoId) => {
        //si me queda un solo producto y lo borro que el localstorage se limpie
        if(carrito.length === 1){
            const item = carrito.find((producto) => producto.id === productoId) 
            const indice = carrito.indexOf(item)
            carrito.splice(indice, 1)
            actualizarCarrito()
            //limpio el storage
            localStorage.clear()
        }else{
            //buscamos productos en el carrito con su id para eliminar
            const item = carrito.find((producto) => producto.id === productoId)
            //buscamos con indexOf el indice del item que seleccionamos
            const indice = carrito.indexOf(item)
            //splice recibe parametro el indice del producto y la cantidad de productos a borrar
            carrito.splice(indice, 1)
            //llamamos a actualizar carrito porque en ella creamos el evento onclick para eliminar producto
            actualizarCarrito()
        }
        
        
        
    }

    //funcion actualizarcarrito para mostarlos en pantalla
    const actualizarCarrito = () => {

        productosEnCarrito.innerHTML = ""

        carrito.forEach((producto) => {
            const div = document.createElement("div")
            div.className="enCarrito"
            div.innerHTML = `
            <div class="container" id="contenedor">
            <img src=${producto.img} class="imagenCarrito">
            <div class="container">
            <h4 class="nombreProducto">${producto.name}</h4>
            <h4 class="precioProducto">Precio: $${producto.price}</h4>
            <h4 class="cantidadProducto">Cantidad: <span id="cantidad">${producto.cantidad}</span></h4>
            </div>
            <button class="btn btn-danger" onclick="eliminarDelCarrito(${producto.id})" style="font-size: 0.8rem"><i class="bi bi-trash" style="font-size: 1rem"></i></button>
            </div>
            `
            productosEnCarrito.appendChild(div)
           // mostrarComprar.appendChild(div)
            //llamamos al storage para el setItem 
            localStorage.setItem('carrito', JSON.stringify(carrito))      
        })
  
        //creamos variable para contador del carrito
        const contador = document.getElementById("contador")
        //innerText es para crear texto
        contador.innerText = carrito.length
        //creamos variable para sumar los precios del carrito
        const precioTotal = document.getElementById("precioTotal")
        //metodo reduce tengo acumulador mas el producto, a medida que 
        //que agregue producto se va sumando el precio, y le doy un valor inicial 0
        precioTotal.innerText = carrito.reduce((acumulador, producto) => acumulador + (producto.price * producto.cantidad), 0)
    }
    //creamos variable para vaciar carrito
    const btnVaciar = document.getElementById("vaciar")
    //le damos el evento para que el tamaño del carrito sea 0
    btnVaciar.addEventListener('click', () => {
        carrito.length = 0    
        actualizarCarrito()  
        //limpio el storage
        localStorage.clear()      
    })




