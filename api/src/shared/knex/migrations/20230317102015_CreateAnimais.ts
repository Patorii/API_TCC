import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("animais", (t) => {
        t.integer("cod_animal");
        t.integer("cod_usuario");
        t.string("especie");
        t.string("nome", 30);
        t.string("idade", 10);
        t.string("raca");
        t.string("cor");
        t.primary(["cod_animal"]);
        t.timestamps(true, true);
        t.foreign(["cod_usuario"], "FK_cod_usuario_tanuncios")
            .references(["cod_usuario"])
            .inTable("usuarios")
            .onDelete("CASCADE");
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("animais");
}
