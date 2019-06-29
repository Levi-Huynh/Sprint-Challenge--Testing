// Update with your config settings.
//dbConnection variable allows you to connect to heroku posgress db in production
const dbConnection = process.env.DATABASE_URL

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/games.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

production: {
  client: 'pg',
  connection: dbConnection, 
  migrations: {
    directory: './data/migrations',
  },
  seeds: {
    directory: './data/seeds',
  },

}
};
