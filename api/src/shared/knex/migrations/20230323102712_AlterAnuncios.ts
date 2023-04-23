import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("anuncios", (t) => {
        t.string("tipo", 1);
        t.dropColumn("cep");
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("anuncios", (t) => {
        t.dropColumn("tipo");
        t.integer("cep", 8);
    });
}
