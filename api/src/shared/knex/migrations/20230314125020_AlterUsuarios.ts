import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("usuarios", (t) => {
        t.dropColumn("cpf");
        t.dropColumn("cnpj");
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("usuarios", (t) => {
        t.string("cpf", 200);
        t.string("cnpj", 200);
    });
}
