export function telefonePattern(telefone: string) {
    const result =
        '(' +
        telefone.substring(0, 2) +
        ')' +
        ' ' +
        telefone.substring(2, telefone.length - 4) +
        '-' +
        telefone.substring(telefone.length - 4);
    return result;
}
