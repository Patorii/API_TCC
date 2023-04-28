import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("animais", (t) => {
        t.string("sexo", 1);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("animais", (t) => {
        t.dropColumn("sexo");
    });
}
