const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const authJWT = require('passport-jwt');

const productsRoutes = require('./resources/productos/products.routes');
const usersRoutes = require('./resources/users/users.routes');

const logger = require('./resources/lib/logger');

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

const app = express();
const PORT = 4000;

app.use(express.json())

app.use(morgan('short', {
  stream: {
    write: message => logger.info(message.trim()),
  }
}));

/* routes */
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);

app.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
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

app.listen(PORT, () => {
  console.log(`We app is listening on port: ${PORT}`);
})
