import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { axiosInstance } from '../routes/index';

const InfractionsContext = createContext();
export function InfractionsProvider({ children }) {
    const [infractions, setInfractions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadInfractions() {
            try {
                const response = await axiosInstance.get('/api/Tickets');
                console.log("DADOS RECEBIDOS:", response.data);
                setInfractions(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                console.log("Verifique se o backend está rodando e tem os endpoints corretos");
            } finally {
                setLoading(false);
            }
        }

        loadInfractions();
    }, []);

    async function addInfraction(infraction) {
        try {
            if (!infraction.model || !infraction.model.trim()) {
                alert("Modelo é obrigatório!");
                return;
            }

            if (infraction.type === undefined || infraction.type === null) {
                alert("Tipo de infração é obrigatório!");
                return;
            }

            const payload = {
                model: infraction.model.trim(),
                request: ""
            };

            if (infraction.brand && infraction.brand.trim()) {
                payload.brand = infraction.brand.trim();
            }
            if (infraction.violationLocation && infraction.violationLocation.trim()) {
                payload.violationLocation = infraction.violationLocation.trim();
            }
            if (infraction.reference && infraction.reference.trim()) {
                payload.reference = infraction.reference.trim();
            }
            if (infraction.dateTime) {
                payload.dateTime = infraction.dateTime;
            }
            if (infraction.state && infraction.state.trim()) {
                payload.state = infraction.state.trim();
            }
            if (infraction.city && infraction.city.trim()) {
                payload.city = infraction.city.trim();
            }
            if (infraction.description && infraction.description.trim()) {
                payload.description = infraction.description.trim();
            }
            if (infraction.color && infraction.color.trim()) {
                payload.color = infraction.color.trim();
            }

            const typeValue = parseInt(infraction.type);
            if (!isNaN(typeValue) && typeValue >= 0 && typeValue <= 3) {
                payload.type = typeValue.toString();
            } else {
                payload.type = "0";
            }

            console.log("Enviando payload para API:", JSON.stringify(payload, null, 2));

            const response = await axiosInstance.post('/api/Tickets', payload);
            setInfractions(prev => [response.data, ...prev]);
            console.log("Ocorrência adicionada com sucesso:", response.data);
            alert("Ocorrência criada com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar:", error);

            if (error.response) {
                console.error("Status:", error.response.status);
                console.error("Dados:", error.response.data);

                if (error.response.data?.errors) {
                    console.error("Erros de validação:", error.response.data.errors);

                    const errorMessages = Object.entries(error.response.data.errors)
                        .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                        .join('\n');

                    alert(`Erros de validação:\n${errorMessages}`);
                    return;
                }

                console.error("Headers:", error.response.headers);

                const errorMsg = error.response.data?.title ||
                    error.response.data?.message ||
                    `Erro ${error.response.status}: Não foi possível criar a ocorrência`;
                alert(errorMsg);
            } else if (error.request) {
                console.error("Nenhuma resposta recebida:", error.request);
                alert("Sem resposta do servidor. Verifique se o backend está rodando.");
            } else {
                console.error("Erro:", error.message);
                alert("Erro ao criar ocorrência: " + error.message);
            }
        }
    }

    async function updateInfraction(id, infraction) {
        try {
            if (!infraction.model || !infraction.model.trim()) {
                alert("Modelo é obrigatório!");
                return false;
            }

            if (infraction.type === undefined || infraction.type === null) {
                alert("Tipo de infração é obrigatório!");
                return false;
            }

            const payload = {
                model: infraction.model.trim()
            };

            if (infraction.brand && infraction.brand.trim()) {
                payload.brand = infraction.brand.trim();
            }
            if (infraction.violationLocation && infraction.violationLocation.trim()) {
                payload.violationLocation = infraction.violationLocation.trim();
            }
            if (infraction.reference && infraction.reference.trim()) {
                payload.reference = infraction.reference.trim();
            }
            if (infraction.dateTime) {
                payload.dateTime = infraction.dateTime;
            }
            if (infraction.state && infraction.state.trim()) {
                payload.state = infraction.state.trim();
            }
            if (infraction.city && infraction.city.trim()) {
                payload.city = infraction.city.trim();
            }
            if (infraction.description && infraction.description.trim()) {
                payload.description = infraction.description.trim();
            }
            if (infraction.color && infraction.color.trim()) {
                payload.color = infraction.color.trim();
            }

            const typeValue = parseInt(infraction.type);
            if (!isNaN(typeValue) && typeValue >= 0 && typeValue <= 3) {
                payload.type = typeValue.toString();
            } else {
                payload.type = "0";
            }

            console.log("Atualizando ticket ID:", id, "com payload:", JSON.stringify(payload, null, 2));

            const response = await axiosInstance.put(`/api/Tickets/${id}`, payload);
            setInfractions(prev => prev.map(item => item.id === id ? response.data : item));
            console.log("Ocorrência atualizada com sucesso:", response.data);
            alert("Ocorrência atualizada com sucesso!");
            return true;
        } catch (error) {
            console.error("Erro ao atualizar:", error);

            if (error.response) {
                console.error("Status:", error.response.status);
                console.error("Dados:", error.response.data);

                if (error.response.data?.errors) {
                    console.error("Erros de validação:", error.response.data.errors);

                    const errorMessages = Object.entries(error.response.data.errors)
                        .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                        .join('\n');

                    alert(`Erros de validação:\n${errorMessages}`);
                    return false;
                }

                const errorMsg = error.response.data?.title ||
                    error.response.data?.message ||
                    `Erro ${error.response.status}: Não foi possível atualizar a ocorrência`;
                alert(errorMsg);
            } else if (error.request) {
                alert("Sem resposta do servidor. Verifique se o backend está rodando.");
            } else {
                alert("Erro ao atualizar ocorrência: " + error.message);
            }
            return false;
        }
    }

    async function deleteInfraction(id) {
        try {
            console.log("Deletando ticket ID:", id);
            await axiosInstance.delete(`/api/Tickets/${id}`);
            setInfractions(prev => prev.filter(item => item.id !== id));
            console.log("Ocorrência deletada com sucesso");
            alert("Ocorrência deletada com sucesso!");
            return true;
        } catch (error) {
            console.error("Erro ao deletar:", error);

            if (error.response) {
                const errorMsg = error.response.data?.title ||
                    error.response.data?.message ||
                    `Erro ${error.response.status}: Não foi possível deletar a ocorrência`;
                alert(errorMsg);
            } else if (error.request) {
                alert("Sem resposta do servidor. Verifique se o backend está rodando.");
            } else {
                alert("Erro ao deletar ocorrência: " + error.message);
            }
            return false;
        }
    }

    return (
        <InfractionsContext.Provider value={{
            infractions,
            loading,
            addInfraction,
            updateInfraction,
            deleteInfraction,
        }}>
            {children}
        </InfractionsContext.Provider>
    );
}

InfractionsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export function useInfractions() {
    const context = useContext(InfractionsContext);
    if (!context) {
        throw new Error('useInfractions deve ser usado dentro de InfractionsProvider');
    }
    return context;
}
