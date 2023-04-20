import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("usuarios", (t) => {
        t.string("cpf", 11);
        t.string("cnpj", 14);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("usuarios", (t) => {
        t.dropColumn("cpf");
        t.dropColumn("cnpj");
    });
}
