module.exports = {
    development: {
      client: 'sqlite3',
      connection: { filename: './database/tacobase.sqlite3' },
      useNullAsDefault: true,
      migrations: {
        directory: './database/migrations',
        tableName: 'dbmigrations',
      },
      seeds: { directory: './data/seeds' },
    },
  };
  