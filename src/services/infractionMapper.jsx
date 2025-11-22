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
    return {
        descricao: apiData.infracao?.descricao_infracao || "",
        dataHora: processDate(apiData.cabecalho?.data_hora_infracao) || "",

        modelo: "",
        cor: "",
        placa: "",
        infrator: "",
        cnh: "",
        tipo: "",
        status: "pendente",
    }
}