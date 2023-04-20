import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("usuarios", (t) => {
        t.integer("cod_usuario");
        t.string("nome", 200);
        t.string("cpf", 200);
        t.string("cnpj", 200);
        t.string("login", 50);
        t.string("senha", 255);
        t.string("email", 200);
        t.primary(["cod_usuario"]);
        t.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("usuarios");
}
