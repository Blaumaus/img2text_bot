// Imports
require('dotenv').config()

// Setup config
dotenv.config({ path: '.env' })

module.exports = {
  TOKEN: process.env.BOT_TOKEN || '',
  PORT: process.env.PORT || 3000,
  URL: process.env.URL || 'https://infinite-fortress-79609.herokuapp.com'
}