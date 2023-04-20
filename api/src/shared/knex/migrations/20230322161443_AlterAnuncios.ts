import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("anuncios", (t) => {
        t.dropColumn("data_anuncio");
    });
}
export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("anuncios", (t) => {
        t.dateTime("data_anuncio");
    });
}
