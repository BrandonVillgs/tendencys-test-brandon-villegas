import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Token from '../models/Token.js';
import Joi from 'joi';

const router = express.Router();
const registerSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string().min(6).required(),
  img_profile: Joi.string().optional(),
});

// Registro
router.post('/register', async (req, res) => {
  // Validar los datos
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, phone, password, img_profile } = req.body;

  try {
    //El usuario existe?
    const userExists = await User.findOne({ phone });
    if (userExists) return res.status(400).send('El usuario ya está registrado');

    // Hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      phone,
      password: hashedPassword,
      img_profile
    });

    // Guardar usuario en la base de datos
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
  } catch (err) {
    res.status(500).send('Error en el servidor');
  }
});

//Validacion login
const loginSchema = Joi.object({
  phone: Joi.string().required(),
  password: Joi.string().required(),
});

// Log IN
router.post('/login', async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).send('Usuario no encontrado');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Contraseña incorrecta');

    // Generar token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await new Token({ user_id: user._id, token }).save();

    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send('Error en el servidor');
  }
});

export default router;
