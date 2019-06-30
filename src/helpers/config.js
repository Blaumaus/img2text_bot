// Imports
require('dotenv').config({ path: '.env' })

module.exports = {
  TOKEN: process.env.TOKEN || '',
  PORT: process.env.PORT || 5000
}