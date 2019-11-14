let config = {}

const baseConfig = {
  PORT: 3002,
  ACCOUNT_SID: 'AC7f91e2e7e2efb708da014885075b655f', // Your Account SID from www.twilio.com/console
  AUTH_TOKEN: '7dfd6058c7f78d9aec39710305b3e955',   // Your Auth Token from www.twilio.com/console
  FROM_CELLPHONE: '+12026576655'
}

const developConfig = {
  SECRET_KEY: 'SECRET_KEY',
  EXPIRES_IN: '24h',
}

const productionConfig = {
  SECRET_KEY: 'AOSDOAJSDOJSD',
  EXPIRES_IN: '12h',
}

// Capturar valores del env
// console.log(process.env.ENV) 

switch (process.env.ENV) {
  case 'dev':
  case 'development':
    console.log('estamos en dev')
    config = {
      ...baseConfig,
      ...developConfig
    }
    break;
  case 'prod':
  case 'production':
    console.log('estamos en prod')
    config = {
      ...baseConfig,
      ...productionConfig,
    }
    break;
  default:
    console.log('estamos en dev')
    config = {
      ...baseConfig,
      ...developConfig,
    }
    break;
}

module.exports = config;
