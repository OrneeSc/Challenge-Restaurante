///ARRAYS -listas
//
let mesas = []; ///instancias de la clase mesa

const  validacionDeMesa = mesa => {
    if (!(mesa instanceof Mesa)) throw new Error("No pertenece a una instacia de mesa");
    const buscarNroDeMesa = mesas.findIndex(mesita => mesita.nroMesa === mesa.nroMesa);
    if (buscarNroDeMesa !== -1) throw new Error("La mesa ya esta cargada"); 
};

const  validacionDeProducto = producto => {
    if (!(producto instanceof Producto)) throw new Error("No pertenece a una instacia de producto");
    const buscarProducto = productos.findIndex(elemento => elemento.producto === producto.producto);
    if (buscarProducto !== -1) throw new Error("El producto ya esta cargado"); 
};


//
let productos = [];

///CLASES
//
class Mesa {
    constructor(nroMesa) {
        this.nroMesa = Number(nroMesa);
        if (isNaN(this.nroMesa)) throw new Error("No es un número");
        /*Fede hizo getCuenta */ this.cuenta = new Cuenta(); // modifica la cuenta 
    };
    eliminarMesa() {
        mesas = mesas.filter(mesa => {
            return mesa.nroMesa !== this.nroMesa
        });
    };
};
//
class Producto {
    constructor(id, producto, precio) {
        this.id = id;
        this.producto = producto;
        this.precio = precio;
    };
    eliminarProducto() {
        productos = productos.filter(producto => {
            return producto.id !== this.id
        });
    }
};
// 
class Cuenta {
    constructor() {
        this.nextId =1;
        this.ListadeProducto = [
            /*  {
                producto: new Producto(),
                cantidad
            }*/
        ];
    };
    agregar(idProducto, cantidad) { //cantidad es productoCantidad
        productos.forEach(producto => {
            if (producto.id == idProducto) {
                this.ListadeProducto.push({ id: this.nextId, producto, cantidad })
                this.nextId++;
            };
        });
    };

   eliminarConsumicion(id) {
        this.ListadeProducto = this.ListadeProducto.filter(producto => {
        return producto.id !== id;
        })
    };
};
/////////////////////////////////////////////////////////////////////////
/* PRIMERA TABLA */
/////////////////////////////////////////

const agregarMesa = () => {
    const input = document.querySelector("#nroMesa").value;/// esto agarra lo que la persona le llena, como un prompt
    const tbody = document.querySelector("#tbody-1");//// A partir de aqui se crean todos los demas
    
    const mesa = new Mesa(input);//// por aca ingreso a la nva instacia de mesa el nro
    validacionDeMesa(mesa);
    mesas.push(mesa);
    
    ///// CREO ELEMENTOS AL HACERLE CLICK AL BOTON
    const tr = document.createElement("tr");/// fila
    const td1 = document.createElement("td");/// columna
    const td2 = document.createElement("td");/// columna
    const td3 = document.createElement("td");/// columna
    const btnCerrarMesa = document.createElement("button");/// es el boton que se crea en la fial cdo aparece el prod
    btnCerrarMesa.type = "button";
    btnCerrarMesa.className = "btnCerrarMesa";

    //// AGREGANDOLE VALORES
    btnCerrarMesa.innerText = "Cerrar";
    td1.innerText = mesa.nroMesa;


    td2.classList.add("agregarTotalCuenta"); /// agregamos una clase para seleccionarla luego
    td2.id = "cuenta-" + mesa.nroMesa;/// generamos un id a la cuenta (cuenta-1)
    td2.innerText = "0";


    //// AGREGANDO AL HTML
    td3.appendChild(btnCerrarMesa);
    tr.appendChild(td1);/// a la izq
    tr.appendChild(td2);
    tr.appendChild(td3);/// mas a la derecha (importa como lo cargas)
    tbody.appendChild(tr);

    document.querySelector("#nroMesa").value = "";/// input.value=""/// esto es para que se reinicie el input y no haya ningun valor previo
    const borrar = event => {
        const eliminar = event.target.parentElement.parentElement;/// el target te dice el btn dde estas haciendo la accion, quien es el bton
        mesa.eliminarMesa();
        eliminar.remove();
        actualizarSelect();
        actualizarSelectDetalle();
    };

    btnCerrarMesa.addEventListener("click", borrar);

    //// aqui llamamos a la función del select, ya que si la mesa esta vacia no hay select
    actualizarSelect();
    actualizarSelectDetalle();
};
/////////////////////////////////////////////////////////////////////////////////////////
/* SEGUNDA TABLA PRODUCTOS */
////////////////////////////////////////////////////////////////////////////////////////
let id = 01;
const agregarProductos = () => {
    const input2 = document.querySelector("#producto").value;
    const input3 = document.querySelector("#precio").value;
    const producto = new Producto(id, input2, input3);//// por aca ingreso a la nva instacia de producto
    validacionDeProducto(producto);
    productos.push(producto);

    const tbody = document.querySelector("#tbody-2");
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const btnEliminarProducto = document.createElement("button");
    btnEliminarProducto.type = "button";
    btnEliminarProducto.className = "btnEliminarProducto";

    ////// AGREGAR VALORES////
    btnEliminarProducto.innerText = "Eliminar";

    /* td1.innerText = input; */
    td1.innerText = id++;
    td2.innerText = input2;
    td3.innerText = input3;

    ////// AGREGAR AL HTML
    td4.appendChild(btnEliminarProducto);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tbody.appendChild(tr);

    //// ACCION BORRAR
    document.querySelector("#producto").value = "";/// input.value=""
    document.querySelector("#precio").value = "";
    const borrar = event => {
        const eliminar = event.target.parentElement.parentElement;
        producto.eliminarProducto();
        eliminar.remove();
    };
    btnEliminarProducto.addEventListener("click", borrar);

    cargarProductosAMesa();

};
//////////////////////////////////////////////
/* TERCERA TABLA CANTIDAD */
//////////////////////////////////////////////
//funcion agregar producto
const cargarProductosAMesa = () => {
    const tbody = document.querySelector("#tbody-3");
    tbody.innerHTML = "";/// se resetean las options para crear desde cero
    for (let producto of productos) {//// producto es cada uno de los indices del array productos
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const input = document.createElement("input");
        input.classList.add("agregarCantidad");
        input.id = "inputproducto-" + producto.id;  //inputproducto-1 cambia el numero por cada producto nuevo
        input.placeholder = "Cantidad";
        input.type = "number";
        /// agregando al html
        td2.appendChild(input);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);

        td1.innerText = producto.producto;
        td1.value = producto.producto;//// producto que es el indice y producto que es la propiedad de la instancia
    };
};

const calcularCuenta = (mesa) => {
    document.querySelectorAll(".agregarTotalCuenta").forEach(cuentaTd => {
        const idCuenta = cuentaTd.id.split("-")[1];
        if (selectedOption == idCuenta) {
            const cuentaTotal = mesa.cuenta.ListadeProducto.reduce((acc, producto) => acc + producto.producto.precio * producto.cantidad, 0);;
            cuentaTd.innerText = cuentaTotal;
        }
    });
}

const cargarProductos = () => {
    document.querySelectorAll(".agregarCantidad").forEach(productoInput => {
        const idProducto = productoInput.id.split("-")[1]; // ["inputproducto", "1"]
        const productoCantidad = Number(productoInput.value);
        if (productoCantidad) {
            mesas.forEach(mesa => {
                if (mesa.nroMesa == selectedOption) {
                    mesa.cuenta.agregar(idProducto, productoCantidad);
                    calcularCuenta(mesa);
                };
            });
        }
    });
};

/*const cargarProductos = event => {
    let mesaSeleccionada;
    const elementos =  document.querySelectorAll(".agregarCantidad")
    for(let productoInput of elementos) {
        const idProducto = productoInput.id.split("-")[1]; // ["inputproducto", "1"]
        const productoCantidad = productoInput.value;
        if (productoCantidad) {
            for(let mesa of mesas) {
                mesaSeleccionada = mesa;
                console.log("mesa 1", mesaSeleccionada);
                if (mesa.nroMesa == selectedOption) {
                    mesa.cuenta.agregar(idProducto, productoCantidad);
                    console.log(selectedOption, idProducto, productoCantidad);
                };
            };
        }
    };
    document.querySelectorAll(".agregarTotalCuenta").forEach(cuentaTd => {///es la cuenta de cada mesa
        const idCuenta = cuentaTd.id.split("-")[1];
        console.log("mesa 2", mesaSeleccionada, idCuenta);
        if (mesaSeleccionada.nroMesa == idCuenta) {
            console.log("entra");
            const cuentaTotal = mesaSeleccionada.cuenta.ListadeProducto.reduce((acc, producto) => acc + producto.producto.precio * producto.cantidad, 0);
            console.log(cuentaTotal)
            cuentaTd.innerText = cuentaTotal;//////         
        }
    });
};*/

////////////////////////////////////////////////////////////////////////////////
//FUNCION DEL SELECT

let selectedOption;
const actualizarSelect = () => {
    const select = document.querySelector("#NroMesaDropDown");
    select.innerHTML = "";/// se resetean las options para crear desde cero
    /*lo que hizo fede*/
    const defaultOption = document.createElement("option")
    defaultOption.selected = true;
    defaultOption.disabled = true;
    defaultOption.innerText = "Nro de Mesa";
    select.appendChild(defaultOption);
    /*lo que hizo fede*/
    for (let mesa of mesas) { //// mesa es cada uno de los indices del array mesa
        const option = document.createElement("option");
        select.appendChild(option);
        option.innerText = mesa.nroMesa;
        option.value = mesa.nroMesa;
    }
    select.addEventListener('change', () => {
        selectedOption = select.options[select.selectedIndex].value; // puede ir Number() al ppio si queremos....
       
    });
};

///////////////////////////////////////////////////////////////////////////////
////CUARTA TABLA//////////////////////////////

/* FUNCION DEL SELECT DETALLE DE MESA*/

let selectedOptionDetalle;
const actualizarSelectDetalle = () => {
    const select = document.querySelector("#NroMesaCompleta");
    select.innerHTML = "";/// se resetean las options para crear desde cero
    const defaultOption = document.createElement("option")
    defaultOption.selected = true;
    defaultOption.disabled = true;
    defaultOption.innerText = "Nro de Mesa";
    select.appendChild(defaultOption);
    for (let mesa of mesas) {//// mesa es cada uno de los indices del array mesa
        const option = document.createElement("option");
        select.appendChild(option);
        option.innerText = mesa.nroMesa;
        option.value = mesa.nroMesa;
    }
};

const detalleDeMesa = () => {
    const selectDetalle = document.querySelector("#NroMesaCompleta");
    const tbody = document.querySelector("#tbody-4");
    tbody.innerHTML = "";
    mesas.forEach(mesa => {
        if (selectDetalle.value == mesa.nroMesa) {
            mesa.cuenta.ListadeProducto.forEach(producto => {
                const tr = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                const td3 = document.createElement("td");
                const td4 = document.createElement("td");
                const btnLimpiarCuenta = document.createElement("button");
                btnLimpiarCuenta.type = "button";
                btnLimpiarCuenta.className = "btnLimpiarCuenta";

                btnLimpiarCuenta.innerText = "Limpiar";
                td1.innerText = producto.producto.producto;
                td2.innerText = producto.cantidad;
                td3.innerText = producto.producto.precio;

                td4.appendChild(btnLimpiarCuenta);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tbody.appendChild(tr);

                const limpiarCuenta = () => {
                    const limpiar = btnLimpiarCuenta.parentElement.parentElement;
                    mesa.cuenta.eliminarConsumicion(producto.id);
                    limpiar.remove();
                    calcularCuenta(mesa);
                }

                btnLimpiarCuenta.addEventListener("click", limpiarCuenta);

                });
            };
    });
};

/////////////////FUNCION LOAD PRINCIPAL (LA QUE ESTA EN EL BODY)

const load = () => {
    const button = document.querySelector(".agregarMesa");
    button.addEventListener("click", agregarMesa);

    //BOTON ACEPTAR CON ENTER agregar mesa
    const input = document.querySelector("#nroMesa")
    input.addEventListener("keypress", event => {
        if (event.keyCode === 13) {
            agregarMesa();
        };
    });
    const button2 = document.querySelector(".agregarProducto");
    button2.addEventListener("click", agregarProductos);

   // Hacer al INPUT //
   document.querySelector("#precio").addEventListener("keydown",event => {
        if (event.keyCode === 13) { 
            agregarProductos(); 
        };
    });

    const button3 = document.querySelector(".agregarAmesa");
    button3.addEventListener("click", cargarProductos);
    document.querySelector("#NroMesaDropDown").addEventListener("keydown", event => {
        if (event.keyCode === 13) {
            cargarProductos(); 
        };
    });

    const selectDetalle = document.querySelector("#NroMesaCompleta");
    selectDetalle.addEventListener("change", detalleDeMesa);
};
////////////////////////////////////////////////////////////////////////////////////