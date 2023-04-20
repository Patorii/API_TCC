import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("anuncios", (t) => {
        t.integer("tel", 15);
        t.integer("tel2", 15);
    });
}
export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("anuncios", (t) => {
        t.dropColumn("tel");
        t.dropColumn("tel2");
    });
}
