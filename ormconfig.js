const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy;

module.exports = {
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "postgres",
  "database": "scheduledatabase",
  "entities": ["dist/models/*.entity.js"],
  "synchronize": false,
  "migrations": ["dist/migrations/*.js"],
  "migrationsTableName": "migrations",
  "migrationsRun": false,
  "cli":{
    "migrationsDir":"src/migrations"
  },
  namingStrategy: new SnakeNamingStrategy()
}