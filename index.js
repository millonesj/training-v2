const express = require('express');
const bodyParser = require('body-parser');

const morgan = require('morgan');

const passport = require('passport');

// const BasicStrategy = require('passport-http').BasicStrategy;

const productsRoutes = require('./resources/productos/products.routes');
const usersRoutes = require('./resources/users/users.routes');

const logger = require('./resources/lib/logger');

const app = express();


app.use(bodyParser.json())


app.use(morgan('short', {
  stream: {
    write: message => logger.info(message.trim()),
  }
}));

// passport.use(new BasicStrategy((user, password, done) => {
//   if (user === 'luis' && password === 'krowdy123') {
//     return done(null, true);
//   } else {
//     return done(null, false);
//   }
// }))

// app.use(passport.initialize())


app.use('/products', productsRoutes);
app.use('/users', usersRoutes);

// SON EJEMPLOS
// logger.log('log', 'Hello distributed log files!');
// logger.info('info', 'Esto es un logger info');
// logger.warn('WARN');
// logger.error('ERROR');

/************************** */
// READ
//  passport.authenticate('basic', { session: false })
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
