import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("anuncios", (t) => {
        t.string("cep", 8);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("anuncios", (t) => {
        t.dropColumn("cep");
    });
}
