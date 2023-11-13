// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5432,
      database: "gold_chal",
      user: "nhsltn",
      password: "sembahsulton",
    },
  },
};
// knex migrate:make dbname
// knex migrate:latest
// knex migrate:rollback

// dokumentasi
// scheme builder create table
