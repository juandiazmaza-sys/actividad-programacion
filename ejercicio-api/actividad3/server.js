import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

let productos = [
  {
    id: 1,
    nombre: "Teclado",
    precio: 80000,
    stock: 10
  },
  {
    id: 2,
    nombre: "Mouse",
    precio: 35000,
    stock: 25
  }
];

let siguienteId = 3;

function datosInvalidos(nombre, precio, stock) {
  return (
    typeof nombre !== "string" ||
    nombre.trim() === "" ||
    typeof precio !== "number" ||
    precio < 0 ||
    typeof stock !== "number" ||
    stock < 0
  );
}

// 1. GET /productos
// Lista todos los productos.
// Reto adicional: permite filtrar por precio máximo.
app.get("/productos", (req, res) => {
  const { max } = req.query;

  if (max === undefined) {
    return res.status(200).json(productos);
  }

  const precioMaximo = Number(max);

  if (Number.isNaN(precioMaximo) || precioMaximo < 0) {
    return res.status(400).json({
      error: "El parámetro max debe ser un número mayor o igual a cero"
    });
  }

  const resultado = productos.filter(
    (producto) => producto.precio <= precioMaximo
  );

  res.status(200).json(resultado);
});

// 2. GET /productos/:id
// Obtiene un producto por ID.
app.get("/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  const producto = productos.find((elemento) => elemento.id === id);

  if (!producto) {
    return res.status(404).json({
      error: "Producto no encontrado"
    });
  }

  res.status(200).json(producto);
});

// 3. POST /productos
// Crea un producto.
app.post("/productos", (req, res) => {
  const { nombre, precio, stock = 0 } = req.body;

  if (datosInvalidos(nombre, precio, stock)) {
    return res.status(400).json({
      error: "Nombre, precio o stock no son válidos"
    });
  }

  const nuevoProducto = {
    id: siguienteId++,
    nombre: nombre.trim(),
    precio,
    stock
  };

  productos.push(nuevoProducto);

  res.status(201).json(nuevoProducto);
});

// 4. PUT /productos/:id
// Reemplaza todos los campos del producto.
app.put("/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = productos.findIndex((elemento) => elemento.id === id);

  if (indice === -1) {
    return res.status(404).json({
      error: "Producto no encontrado"
    });
  }

  const { nombre, precio, stock } = req.body;

  if (datosInvalidos(nombre, precio, stock)) {
    return res.status(400).json({
      error: "PUT requiere nombre, precio y stock válidos"
    });
  }

  const productoActualizado = {
    id,
    nombre: nombre.trim(),
    precio,
    stock
  };

  productos[indice] = productoActualizado;

  res.status(200).json(productoActualizado);
});

// 5. PATCH /productos/:id
// Modifica únicamente los campos enviados.
app.patch("/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  const producto = productos.find((elemento) => elemento.id === id);

  if (!producto) {
    return res.status(404).json({
      error: "Producto no encontrado"
    });
  }

  const camposPermitidos = ["nombre", "precio", "stock"];
  const camposRecibidos = Object.keys(req.body);

  if (
    camposRecibidos.length === 0 ||
    camposRecibidos.some((campo) => !camposPermitidos.includes(campo))
  ) {
    return res.status(400).json({
      error: "Envía al menos un campo válido: nombre, precio o stock"
    });
  }

  const nombre = req.body.nombre ?? producto.nombre;
  const precio = req.body.precio ?? producto.precio;
  const stock = req.body.stock ?? producto.stock;

  if (datosInvalidos(nombre, precio, stock)) {
    return res.status(400).json({
      error: "Los datos enviados no son válidos"
    });
  }

  producto.nombre = nombre.trim();
  producto.precio = precio;
  producto.stock = stock;

  res.status(200).json(producto);
});

// 6. DELETE /productos/:id
// Elimina un producto.
app.delete("/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = productos.findIndex((elemento) => elemento.id === id);

  if (indice === -1) {
    return res.status(404).json({
      error: "Producto no encontrado"
    });
  }

  productos.splice(indice, 1);

  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});