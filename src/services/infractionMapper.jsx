import { processDate } from "./dateService";

export function formToInfraction(formData) {
    return {
        descricao: formData.descricao || "",
        dataHora: processDate(formData.dataHora) || "",

        modelo: "",
        cor: "",
        placa: "",
        infrator: "",
        cnh: "",
        tipo: "",
        status: "pendente",
    };
}

export function uploadToInfraction(apiData) {
    const extractedDate = processDate(apiData.cabecalho?.data_hora_infracao);
    const currentDate = new Date().toISOString();

    // Se a data extraída for inválida ou muito antiga (antes de 2020), usa a data atual
    const isOldDate = extractedDate && new Date(extractedDate) < new Date('2020-01-01');
    const finalDate = (!extractedDate || isOldDate) ? currentDate : extractedDate;

    return {
        descricao: apiData.infracao?.descricao_infracao || "",
        dataHora: finalDate,

        modelo: "",
        cor: "",
        placa: "",
        infrator: "",
        cnh: "",
        tipo: "",
        status: "pendente",
    }
}