/* eslint-disable import/no-import-module-exports */

import knex from "knex";

const db = knex({
    client: "mysql",
    connection: {
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        port: Number(process.env.MYSQL_PORT),
        timezone: "UTC",
    },
    pool: {
        min: 2,
        max: 10,
    },
});

export { db };
