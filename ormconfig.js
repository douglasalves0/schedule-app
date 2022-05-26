require('dotenv').config()

module.exports = {
  "type": "postgres",
  "host": "localhost",
  "port": process.env.PORT,
  "username": process.env.DATABASE_USER,
  "password": process.env.DATABASE_PASS,
  "database": process.env.DATABASE_NAME,
  "entities": ["dist/models/*.entity.js"],
  "synchronize": false,
  "migrations": ["dist/migrations/*.js"],
  "migrationsTableName": "migrations",
  "migrationsRun": false,
  "cli":{
    "migrationsDir":"src/migrations"
  }
}