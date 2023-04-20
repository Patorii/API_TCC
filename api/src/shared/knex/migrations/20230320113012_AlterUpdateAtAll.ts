import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    const sql = "SHOW TABLES;";

    const listTables = await knex.raw(sql).then((result) => result[0]);
    // eslint-disable-next-line no-restricted-syntax
    for (const table of listTables) {
        if (
            table.Tables_in_tcc !== "migrations_lock" &&
            table.Tables_in_tcc !== "migrations"
        ) {
            // eslint-disable-next-line no-await-in-loop
            await knex.schema.alterTable(table.Tables_in_tcc, (t) => {
                t.timestamp("updated_at")
                    .defaultTo(
                        knex.raw(
                            "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
                        )
                    )
                    .alter();
            });
        }
    }
}

export async function down(knex: Knex): Promise<void> {
    const sql = "SHOW TABLES;";

    const listTables = await knex.raw(sql).then((result) => result[0]);

    // eslint-disable-next-line no-restricted-syntax
    for (const table of listTables) {
        if (
            table.Tables_in_tcc !== "migrations_lock" &&
            table.Tables_in_tcc !== "migrations"
        ) {
            // eslint-disable-next-line no-await-in-loop
            await knex.schema.alterTable(table.Tables_in_tcc, (t) => {
                t.timestamp("updated_at")
                    .defaultTo(knex.raw("CURRENT_TIMESTAMP"))
                    .alter();
            });
        }
    }
}
