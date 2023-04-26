import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.raw("ALTER TABLE anuncios MODIFY tel VARCHAR(13);");
    return knex.raw("ALTER TABLE anuncios MODIFY tel2 VARCHAR(13);");
}
export async function down(knex: Knex): Promise<void> {
    await knex.raw("ALTER TABLE anuncios MODIFY tel int(15)");
    return knex.raw("ALTER TABLE anuncios MODIFY tel2 int(15);");
}
