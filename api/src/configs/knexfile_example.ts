// eslint-disable-next-line import/no-import-module-exports
import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
    development: {
        client: "mysql",
        connection: {
            host: "mariadb",
            database: "tcc",
            user: "root",
            password: "root123",
            port: 3306,
            timezone: "UTC",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "migrations",
            directory: "./src/shared/knex/migrations",
        },
    },
};

module.exports = config;
