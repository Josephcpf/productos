const express = require("express");
const mongoose = require("mongoose");
console.log("🔥 ESTE ES EL ARCHIVO CORRECTO 🔥");
const app = express();
app.use(express.json());

// 👇 pega aquí tu URL de Mongo Atlas
mongoose.connect("mongodb+srv://josephcabanillas_db_user:1f7Ui3NfyKFgtAeq@cluster0.kdgytgc.mongodb.net/productsDB?retryWrites=true&w=majority")
  .then(() => console.log("Mongo conectado 😼"))
  .catch(err => console.log(err));
// 🐾 Modelo de Producto
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: String,
  attributes: Object
});

const Product = mongoose.model("Product", ProductSchema);

// 🐾 Ruta de prueba
app.get("/", (req, res) => {
  res.send("API de productos funcionando 🐾");
});

// 🐾 Crear producto
app.post("/products", async (req, res) => {
    console.log("ENTRÓ A POST /products 🐾");
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🐾 Obtener productos
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.get("/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});


app.put("/products/:id", async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

app.delete("/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Producto eliminado 🐾" });
});



// 🚀 Servidor
app.listen(4000, () => {
  console.log("Servidor corriendo en puerto 4000 🐱");
});
