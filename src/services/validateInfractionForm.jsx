export function validateInfraction(formData) {
    if (!formData.descricao?.trim()) {
        return "A descrição é obrigatoria.";
    }

    if (!formData.dataHora?.trim()) {
        return "A data da infração é obrigatória."
    }

    if (!formData.descricao.length < 5) {
        return "A descrição inválida";
    }
    return null;
}