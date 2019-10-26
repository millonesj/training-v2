const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const authJWT = require('passport-jwt');

const config = require('./config')

const jwtOptions = {
  secretOrKey: 'SECRET_KEY',
  jwtFromRequest: authJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
}

let jwtStrategy = new authJWT.Strategy({ ...jwtOptions },(jwtPayload, next) => {
  // usuarioDelPayLoad
  console.log(jwtPayload)
  next(null, {
    id: jwtPayload.id
  });
})

passport.use(jwtStrategy)

const productsRoutes = require('./resources/productos/products.routes');
const usersRoutes = require('./resources/users/users.routes');

const logger = require('./resources/lib/logger');
const auth = require('./resources/lib/authentication');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;

app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/training', { useNewUrlParser: true });
mongoose.connection.on('error', (error) => {
  console.log('==========================')
  logger.error(error);
  logger.error('Fallo la conexion a mongodb');
  process.exit(1);
});

app.use(morgan('short', {
  stream: {
    write: message => logger.info(message.trim()),
  }
}));

/* routes */
app.use('/products', auth, productsRoutes);
app.use('/users', usersRoutes);

app.get('/', (req, res) => {
  res.status(200).send('Welcome Krowders');
})

// passport.use(new BasicStrategy((user, password, done) => {
//   if (user === 'luis' && password === 'krowdy123') {
//     return done(null, true);
//   } else {
//     return done(null, false);
//   }
// }))

// app.use(passport.initialize())


// SON EJEMPLOS
// logger.log('log', 'Hello distributed log files!');
// logger.info('info', 'Esto es un logger info');
// logger.warn('WARN');
// logger.error('ERROR');

/************************** */
// READ
//  passport.authenticate('basic', { session: false })

app.listen(config.PORT, () => {
  console.log(`We app is listening on port: ${config.PORT}`);
})
