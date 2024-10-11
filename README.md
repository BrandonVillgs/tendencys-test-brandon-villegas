# Backend Test Tendencys

API desarrollada en Node.js y ExpressJS. Incluye autenticación mediante tokens JWT, validación de datos con Joi y manejo de productos mediante CRUD

## **Requisitos**
Tener instalado
- Node.js
- MongoDB

## **Instalación**

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio

2. **Instalar dependencias**
   ```bash
   npm install
   
3. **Configuracion de variables de entorno: Crear archivo .env y colocar las variables**
   ```bash
    MONGO_URI=mongodb://localhost:27017/tendencys
    JWT_SECRET=SECRET
    PORT=5000

4. **Iniciar el servidor**
   ```bash
    npm start
    
## **Endpoints Principales**
Autenticación
- POST /api/auth/register: Registra un nuevo usuario.
- POST /api/auth/login: Inicia sesión y obtiene un token JWT.

Productos
- GET /api/products: Obtiene la lista de todos los productos.
- POST /api/products: Crea un nuevo producto (requiere token).
- PUT /api/products/:id: Actualiza un producto existente (requiere token).
- DELETE /api/products/:id: Elimina un producto existente (requiere token).
