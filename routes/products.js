import express from 'express';
import jwt from 'jsonwebtoken';
import Product from '../models/Product.js';
import Joi from 'joi';

const router = express.Router();

// Middleware de autenticacion de Usuario
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Acceso denegado');

  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Token inválido');
  }
};

// Validacion
const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  height: Joi.number().required(),
  length: Joi.number().required(),
  width: Joi.number().required(),
});

// CREATE
router.post('/', authenticateToken, async (req, res) => {
  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const product = new Product(req.body);
  try {
    const savedProduct = await product.save();
    res.status(201).send(savedProduct);
  } catch (err) {
    res.status(500).send('Error creando producto');
  }
});

// READ
router.get('/', authenticateToken, async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send('Error obteniendo productos');
  }
});

// UPDATE
router.put('/:id', authenticateToken, async (req, res) => {
  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).send('Producto no encontrado');
    res.status(200).send(updatedProduct);
  } catch (err) {
    res.status(500).send('Error actualizando producto');
  }
});

// DELETE
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).send('Producto no encontrado');
    res.status(200).send('Producto eliminado');
  } catch (err) {
    res.status(500).send('Error eliminando producto');
  }
});

export default router;
