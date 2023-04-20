import { db } from "@configs/mariadb";

import { AppError } from "@shared/errors/AppError";

interface ICheckRepeatedProps {
    table: string;
    pkField: string;
    fieldCheck: string;
    pkCod: string;
    checkValue: string;
}

interface IFieldCheck {
    field: string;
    description: string;
}

interface IUpdateProps {
    table: string;
    pkField: string;
    checkRepeatedField: IFieldCheck[];
    entity: string;
    entityArticle: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
}

interface ICountTableProps {
    table: string;
    field: string;
}

interface IGenerateDoublePK {
    table: string;
    pkField: string;
}

async function getDBTimeStamp() {
    let dataHora = "0";
    try {
        await db.raw("select CURRENT_TIMESTAMP as DATAHORA").then((resp) => {
            dataHora = resp[0][0].DATAHORA;
        });
        return dataHora;
    } catch {
        return "0";
    }
}

async function checkRepeated({
    table,
    pkField,
    fieldCheck,
    pkCod,
    checkValue,
}: ICheckRepeatedProps) {
    try {
        const result = await db(table)
            .count(`${pkField} as TOTAL`)
            .whereRaw("?? <> ?", [pkField, pkCod])
            .whereRaw("?? = ?", [fieldCheck, checkValue])
            .first();

        const total = Number(result.TOTAL);

        return total > 0;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function generateDoublePK({ table, pkField }: IGenerateDoublePK) {
    let codigo = -1;
    try {
        await db
            .raw("select (COALESCE(MAX(??),0)+1) as CODIGO from ??", [
                pkField,
                table,
            ])
            .then((resp) => {
                codigo = resp[0][0].CODIGO;
            });
        return codigo;
    } catch (error) {
        return -1;
    }
}

const dbHelper = {
    async getUpdatedList(
        table: string,
        field: string,
        cod_cicom: number,
        limit: number,
        page: number,
        date: Date
    ) {
        try {
            let pageNumber;

            const auxCount = await db(table)
                .count(`${field} as TOTAL`)
                .whereRaw("updated_at >= ?", [date])
                .first();

            const total = Number(auxCount.TOTAL);

            const pages = Math.ceil(total / limit);

            if (page > pages) {
                pageNumber = pages;
            } else {
                pageNumber = page;
            }

            const offset = pageNumber * limit - limit;

            let updatedList;

            if (total === 0) {
                updatedList = [];
            } else {
                updatedList = await db(table)
                    .where({ cod_cicom })
                    .whereRaw("updated_at >= ?", [date])
                    .limit(limit)
                    .offset(offset)
                    .then();
            }

            return {
                data: updatedList,
                count: total,
                limit,
                page,
                totalPages: pages,
            };
        } catch (error) {
            throw new AppError(error);
        }
    },

    async getTimeStamp() {
        return getDBTimeStamp();
    },

    async countTable({ table, field }: ICountTableProps): Promise<number> {
        const result = await db(table).count(`${field} as TOTAL`).first();

        return Number(result.TOTAL);
    },

    async update({
        table,
        pkField,
        checkRepeatedField,
        entity,
        entityArticle,
        data,
    }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    IUpdateProps): Promise<any> {
        const updatedata = data;
        let msg = "";
        let isRepeat = false;
        // eslint-disable-next-line no-restricted-syntax
        for (const fieldcheck of checkRepeatedField) {
            const value = updatedata[fieldcheck.field];
            const { description } = fieldcheck;

            // eslint-disable-next-line no-await-in-loop
            const repeated = await checkRepeated({
                table,
                pkField,
                fieldCheck: fieldcheck.field,
                pkCod: `${updatedata[pkField]}`,
                checkValue: value,
            });

            if (repeated) {
                msg = `Já existe outr${entityArticle} ${entity} com esse ${description}. Não são permitidas repetições.`;
                isRepeat = true;
            }
        }

        if (isRepeat) {
            throw new AppError(msg || "Erro", 409);
        } else {
            await db(table)
                .update(updatedata)
                .whereRaw("?? = ?", [pkField, updatedata[pkField]])
                .then()
                .catch((err) => {
                    console.log(err);
                    throw new AppError(
                        `Erro: "erro interno - insert exceptionError"`,
                        409
                    );
                });

            return updatedata;
        }
    },

    async insert({
        table,
        pkField,
        checkRepeatedField,
        entity,
        entityArticle,
        data,
    }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    IUpdateProps): Promise<any> {
        const updatedata = data;
        let msg = "";
        let isRepeat = false;

        // eslint-disable-next-line no-restricted-syntax
        for (const fieldcheck of checkRepeatedField) {
            const value = updatedata[fieldcheck.field];
            const { description } = fieldcheck;

            // eslint-disable-next-line no-await-in-loop
            const repeated = await checkRepeated({
                table,
                pkField,
                fieldCheck: fieldcheck.field,
                pkCod: "0",
                checkValue: value,
            });

            if (repeated) {
                msg = `Já existe outr${entityArticle} ${entity} com esse ${description}. Não são permitidas repetições.`;
                isRepeat = true;
            }
        }

        if (isRepeat) {
            throw new AppError(msg || "Erro", 409);
        } else {
            const codpk = await generateDoublePK({
                table,
                pkField,
            });
            if (codpk > 0) {
                updatedata[pkField] = codpk;

                await db(table)
                    .insert(updatedata)
                    .then()
                    .catch(() => {
                        throw new AppError(
                            `Erro: "erro interno - insert exceptionError"`,
                            409
                        );
                    });

                return updatedata;
            }

            throw new AppError(
                `Falha ao criar/atualizar ${entityArticle} ${entity}. Tente novamente.`,
                500
            );
        }
    },
    async insertWhitoutAutoincrement({
        table,
        pkField,
        checkRepeatedField,
        entity,
        entityArticle,
        data,
    }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    IUpdateProps): Promise<any> {
        const updatedata = data;
        let msg = "";
        let isRepeat = false;

        // eslint-disable-next-line no-restricted-syntax
        for (const fieldcheck of checkRepeatedField) {
            const value = updatedata[fieldcheck.field];
            const { description } = fieldcheck;

            // eslint-disable-next-line no-await-in-loop
            const repeated = await checkRepeated({
                table,
                pkField,
                fieldCheck: fieldcheck.field,
                pkCod: "0",
                checkValue: value,
            });

            if (repeated) {
                msg = `Já existe outr${entityArticle} ${entity} com esse ${description}. Não são permitidas repetições.`;
                isRepeat = true;
            }
        }

        if (isRepeat) {
            throw new AppError(msg || "Erro", 409);
        } else {
            try {
                await db(table)
                    .insert(updatedata)
                    .then()
                    .catch(() => {
                        throw new AppError(
                            `Erro: "erro interno - insert exceptionError"`,
                            409
                        );
                    });

                return updatedata;
            } catch {
                throw new AppError(
                    `Falha ao criar/atualizar ${entityArticle} ${entity}. Tente novamente.`,
                    500
                );
            }
        }
    },
};

export { dbHelper };
