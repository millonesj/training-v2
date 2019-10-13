const express = require('express');
const productsRoutes = require('./resources/productos/products.routes');
const app = express();
const PORT = 4000;

app.use(express.json())

/* routes */
app.use('/products', productsRoutes);

app.get('/', (req, res) => {
  res.status(200).send('Welcome Krowders');
});

app.listen(PORT, () => {
  console.log(`We app is listening on port: ${PORT}`);
})
