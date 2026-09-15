class Producto {
    constructor(id, nombre, precio, categoria, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.stock = stock;
    }

    vender(cantidad) {
        if (!Number.isInteger(cantidad) || cantidad <= 0) {
            return {
                exito: false,
                mensaje: "La cantidad debe ser un número entero mayor a 0."
            };
        }

        if (cantidad > this.stock) {
            return {
                exito: false,
                mensaje: "No hay stock suficiente de " + this.nombre + "."
            };
        }

        this.stock -= cantidad;

        return {
            exito: true,
            mensaje:
                "Se vendieron " + cantidad + " unidad(es) de " +
                this.nombre + ". Stock restante: " + this.stock + "."
        };
    }

    reponer(cantidad) {
        if (!Number.isInteger(cantidad) || cantidad <= 0) {
            return {
                exito: false,
                mensaje: "La cantidad a reponer debe ser mayor a 0."
            };
        }

        this.stock += cantidad;

        return {
            exito: true,
            mensaje:
                "Se repusieron " + cantidad + " unidad(es) de " +
                this.nombre + ". Stock actual: " + this.stock + "."
        };
    }

    obtenerPrecioConIva() {
        return this.precio * 1.21;
    }
}



const productosIniciales = [
    {
        id: 1,
        nombre: "Batman",
        precio: 8500,
        categoria: "Cómic",
        stock: 6
    },
    {
        id: 2,
        nombre: "Spider-Man",
        precio: 9000,
        categoria: "Cómic",
        stock: 5
    },
    {
        id: 3,
        nombre: "Jujutsu Kaisen",
        precio: 7500,
        categoria: "Manga",
        stock: 8
    },
    {
        id: 4,
        nombre: "Vinland Saga",
        precio: 11000,
        categoria: "Manga",
        stock: 4
    },
    {
        id: 5,
        nombre: "One Piece",
        precio: 7200,
        categoria: "Manga",
        stock: 10
    },
    {
        id: 6,
        nombre: "Kagurabachi",
        precio: 7800,
        categoria: "Manga",
        stock: 7
    },
    {
        id: 7,
        nombre: "Dandadan",
        precio: 7600,
        categoria: "Manga",
        stock: 5
    },
    {
        id: 8,
        nombre: "Daredevil",
        precio: 12000,
        categoria: "Cómic",
        stock: 3
    },
    {
        id: 9,
        nombre: "Chainsaw Man",
        precio: 7900,
        categoria: "Manga",
        stock: 6
    }
];



const catalogo = [];

productosIniciales.forEach(function (datosProducto) {
    const producto = new Producto(
        datosProducto.id,
        datosProducto.nombre,
        datosProducto.precio,
        datosProducto.categoria,
        datosProducto.stock
    );

    catalogo.push(producto);
});


let categoriaSeleccionada = "Todos";


function formatearPrecio(valor) {
    return "$" + valor.toLocaleString("es-AR");
}



function filtrarProductosPorCategoria(categoria) {
    return catalogo.filter(function (producto) {
        return categoria === "Todos" || producto.categoria === categoria;
    });
}


function obtenerCatalogoVisible() {
    return filtrarProductosPorCategoria(categoriaSeleccionada);
}


// forEach: muestra productos en consola.
function mostrarCatalogoEnConsola(lista = catalogo) {
    console.log("PRODUCTOS DEL CATÁLOGO");

    lista.forEach(function (producto) {
        console.log(
            producto.id + ". " + producto.nombre +
            " - " + formatearPrecio(producto.precio) +
            " - Stock: " + producto.stock
        );
    });
}



function hayProductosConStock(lista) {
    return lista.some(function (producto) {
        return producto.stock > 0;
    });
}



function obtenerReporteCatalogo(lista) {
    const productosEnTexto = lista
        .map(function (producto) {
            return (
                "Producto: " + producto.nombre + "\n" +
                "Categoría: " + producto.categoria + "\n" +
                "Precio: " + formatearPrecio(producto.precio) + "\n" +
                "Stock: " + producto.stock
            );
        })
        .join("\n\n");

    const mensaje =
        "CATÁLOGO DISPONIBLE\n\n" +
        (productosEnTexto || "No hay productos en esta categoría.");

    console.log(mensaje);

    return mensaje;
}



function buscarProducto(nombreBuscado, lista = catalogo) {
    const busqueda = nombreBuscado.trim().toLowerCase();

    const productoEncontrado = lista.find(function (producto) {
        return producto.nombre.toLowerCase() === busqueda;
    });

    if (productoEncontrado === undefined) {
        return {
            existe: false,
            posicion: -1,
            producto: null,
            nombre: ""
        };
    }

    return {
        existe: true,
        posicion: lista.indexOf(productoEncontrado),
        producto: productoEncontrado,
        nombre: productoEncontrado.nombre
    };
}


function obtenerProductoPorId(idProducto) {
    const productoEncontrado = catalogo.find(function (producto) {
        return producto.id === idProducto;
    });

    return productoEncontrado || null;
}



function renderizarCatalogo(lista = obtenerCatalogoVisible()) {
    const contenedor = document.getElementById("productosGrid");

    if (lista.length === 0) {
        contenedor.innerHTML =
            "<p class=\"empty-catalog\">" +
                "No hay productos para esta categoría." +
            "</p>";

        return;
    }

    const html = lista
        .map(function (producto, indice) {
            const idSeguro = JSON.stringify(producto.id);
            const botonDeshabilitado = producto.stock === 0 ? "disabled" : "";
            const textoBoton =
                producto.stock > 0
                    ? "Agregar al carrito"
                    : "Sin stock";

            return (
                "<article class=\"product-card\" id=\"producto-" +
                    producto.id + "\">" +
                    "<div class=\"product-cover cover-" +
                        (indice % 6) + "\">" +
                        "<span>" + producto.nombre + "</span>" +
                    "</div>" +
                    "<div class=\"product-info\">" +
                        "<span class=\"product-category\">" +
                            producto.categoria +
                        "</span>" +
                        "<h3>" + producto.nombre + "</h3>" +
                        "<p class=\"price\">" +
                            formatearPrecio(producto.precio) +
                        "</p>" +
                        "<p>Stock disponible: " + producto.stock + "</p>" +
                        "<button type=\"button\" " + botonDeshabilitado +
                            " onclick='agregarAlCarrito(" + idSeguro + ")'>" +
                            textoBoton +
                        "</button>" +
                    "</div>" +
                "</article>"
            );
        })
        .join("");

    contenedor.innerHTML = html;
}
