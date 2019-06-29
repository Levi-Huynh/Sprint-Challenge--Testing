const knex = require('knex');
const config = require('../knexfile.js');

//set up 'production' here as DB_ENV for heroku to read
const environment = process.env.DB_ENV || 'development';

module.exports = knex(config[environment]);
