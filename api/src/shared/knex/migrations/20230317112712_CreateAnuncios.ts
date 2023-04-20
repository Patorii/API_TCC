import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("anuncios", (t) => {
        t.integer("cod_anuncio");
        t.integer("cod_usuario");
        t.integer("cod_animal");
        t.string("descricao");
        t.integer("cep", 8);
        t.string("uf", 2);
        t.string("cidade");
        t.string("bairro");
        t.string("endereco");
        t.integer("numero", 8);
        t.string("complemento");
        t.dateTime("data_anuncio");
        t.primary(["cod_anuncio"]);
        t.timestamps(true, true);
        t.foreign(["cod_animal"], "FK_cod_animal_tanimais")
            .references(["cod_animal"])
            .inTable("animais")
            .onDelete("CASCADE");
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("anuncios");
}
