const express = require('express');
const morgan = require('morgan');

const config = require('./config')
const {logger} = require('./resources/lib/logger');
const auth = require('./resources/lib/authentication');
const mongoose = require('mongoose')

const productsRoutes = require('./resources/productos/products.routes');
const usersRoutes = require('./resources/users/users.routes');

const app = express();


/* DATABASE */
mongoose.connect('mongodb://127.0.0.1:27017/training', { useNewUrlParser: true });

mongoose.set('useFindAndModify', false);

mongoose.connection.on('error', (error) => {
  logger.error('Failed to connect to database', error);
  process.exit(1);
});


/* MIDDLEWARES */
app.use(express.json());
app.use(morgan('{"remote_addr": ":remote-addr", "remote_user": ":remote-user", "date": ":date[clf]", "method": ":method", "url": ":url", "http_version": ":http-version", "status": ":status", "result_length": ":res[content-length]", "referrer": ":referrer", "user_agent": ":user-agent", "response_time": ":response-time"}', {
  stream: logger.stream}));
app.use((req,res,next) => logger.saveParams(req,res,next));


/* ROUTES */
app.use('/products', auth, productsRoutes);
app.use('/users', usersRoutes);

app.get('/', (req, res) => {
  res.status(200).send('Welcome Krowders');
})


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
