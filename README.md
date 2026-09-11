# Comiquería Central - Pre-Entrega 6

Proyecto realizado para la Pre-Entrega 6 de JavaScript en Coderhouse.

El catálogo parte de un array de datos iniciales. Luego se recorre para crear
instancias de la clase `Producto` y agregarlas al array `catalogo`.

Cada producto tiene `id`, `nombre`, `precio`, `categoria` y `stock`, además de
los métodos `vender()`, `reponer()` y `obtenerPrecioConIva()`.

## Funciones de orden superior integradas

- `find`: busca un producto por nombre y también lo localiza por su ID.
- `filter`: filtra el catálogo por categoría y agrupa los productos del carrito.
- `map`: transforma el catálogo en tarjetas para la página y en el reporte del
  simulador.
- `reduce`: calcula el total acumulado del carrito.

El usuario puede buscar títulos, filtrar entre mangas y cómics, agregar
productos al carrito y ejecutar el simulador de compra con `prompt` y `alert`.
