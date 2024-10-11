// Conectar a la base de datos
use tendencys; // Nombre de la base de datos

// Crear colección para usuarios y agregar un usuario de ejemplo
db.users.insertOne({
  name: "Brandon",
  phone: "1234567890",
  password: "password123*",
  img_profile: "profile.png"
});

// Crear colección para productos y agregar un producto de ejemplo
db.catalog_products.insertOne({
  name: "Producto 1",
  description: "Descripción del producto",
  height: 100,
  length: 50,
  width: 30
});

// Crear colección para tokens y agregar un token de ejemplo (generalmente este paso no es necesario manualmente)
db.access_tokens.insertOne({
  user_id: ObjectId("id_del_usuario"),
  token: "token"
});

// Mostrar las colecciones creadas
show collections;
