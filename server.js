const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

//
mongoose.connect("mongodb://127.0.0.1:27017/giro");

// modelos
const User = mongoose.model("User", {
  email: String,
  password: String
});

const Venda = mongoose.model("Venda", {
  valor: Number,
  custo: Number
});

// cadastro
app.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("ok");
});

// login
app.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (user) res.send({ ok: true });
  else res.send({ ok: false });
});

// salvar venda
app.post("/venda", async (req, res) => {
  const venda = new Venda(req.body);
  await venda.save();
  res.send("salvo");
});

// listar vendas
app.get("/vendas", async (req, res) => {
  const vendas = await Venda.find();
  res.send(vendas);
});

// porta render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Rodando..."));
