import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.raw("ALTER TABLE anuncios MODIFY descricao varchar(500);");
}
export async function down(knex: Knex): Promise<void> {
    return knex.raw("ALTER TABLE anuncios MODIFY descricao varchar(255);");
}
