import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("fotos_anuncio", (t) => {
        t.integer("cod_foto_anuncio");
        t.integer("cod_anuncio");
        t.string("extensao", 5);
        t.string("arquivo", 200);
        t.string("capa", 1);
        t.primary(["cod_foto_anuncio"]);
        t.timestamps(true, true);
        t.foreign(["cod_anuncio"], "FK_cod_foto_anuncio_anuncio")
            .references(["cod_anuncio"])
            .inTable("anuncios")
            .onDelete("CASCADE");
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("fotos_anuncio");
}
