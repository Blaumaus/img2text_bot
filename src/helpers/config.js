// Imports
require('dotenv').config({ path: '.env' })

module.exports = {
  TOKEN: process.env.TOKEN || '',
  PORT: process.env.PORT || 3000,
  URL: process.env.URL || 'https://infinite-fortress-79609.herokuapp.com'
}