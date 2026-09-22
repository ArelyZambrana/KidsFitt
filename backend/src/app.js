const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api', apiRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor de KidsFit corriendo correctamente 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});