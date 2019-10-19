const express = require('express');
const bodyParser = require('body-parser');

const winston = require('winston');
const morgan = require('morgan');

const productsRoutes = require('./resources/productos/products.routes');

const app = express();


app.use(bodyParser.json())

const logger = new (winston.Logger)({
  transports: [
    new winston.transports.File({
      level: 'info',
      json: false,
      handleExceptions: true,
      maxSize: 512000,
      maxFiles: 5,
      filename: `${__dirname}/log-de-aplicacion.log`,
      prettyPrint: object => { return JSON.stringify(object) }
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
      prettyPrint: object => { return JSON.stringify(object) }
    })
  ]
})

app.use(morgan('short', {
  stream: {
    write: message => logger.info(message.trim()),
  }
}));

app.use('/products', productsRoutes);




// SON EJEMPLOS
// logger.log('log', 'Hello distributed log files!');
// logger.info('info', 'Esto es un logger info');
// logger.warn('WARN');
// logger.error('ERROR');

/************************** */
// READ
app.get('/', (req, res) => {
  res.status(200).send('Hola papu');
});

// CREATE
app.post('/', (req, res) => {
  console.log(req.body);
  res.json(req.body);
})

// UPDATE
app.put('/', () => {})

// DESTROY
app.delete('/', () => {})

// CRUD
// Create
// Read
// Update
// Destroy


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Nuestra app esta escuchando el puerto ${PORT}`);
})
