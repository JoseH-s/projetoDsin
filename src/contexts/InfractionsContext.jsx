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
                const response = await axiosInstance.get('/api/Multa');
                console.log("DADOS RECEBIDOS:", response.data);
                setInfractions(response.data);
            } catch (error) {
                console.error("Erro ao buscar multas: ", error);
            } finally {
                setLoading(false);
            }
        }

        loadInfractions();
    }, []);

    async function addInfraction(infraction) {
    try {
        const missingFields = [];

        if (missingFields.length > 0) {
            console.error("Campos obrigatórios ausentes:", missingFields.join(", "));
            return;
        }

        const payload = {
            dataHora: infraction.dataHora,
            descricao: infraction.descricao || ""
        };

        console.log("Enviando payload para API:", payload);

        const response = await axiosInstance.post('/api/Multa', payload);

        setInfractions(prev => [response.data, ...prev]);

        console.log("Multa adicionada com sucesso:", response.data);
    } catch (error) {
        if (error.response) {
            console.error(
                "Erro ao adicionar multa:",
                "Status:", error.response.status,
                "Dados:", error.response.data
            );
        } else {
            console.error("Erro ao adicionar multa:", error.message);
        }
    }
}

    async function updateInfractionStatus(id, newStatus) {
        try {
            await axiosInstance.patch(`/api/Multa/${id}`, { status: newStatus });
            setInfractions(prev => 
                prev.map(inf => 
                    inf.id === id ? { ...inf, status: newStatus } : inf
                )
            );
        } catch (error) {
            console.error("Erro ao atualizar status da multa:", error);
        }
     
    }

    function clearInfractions() {
        setInfractions([]);
    }

    return (
        <InfractionsContext.Provider value={{
            infractions,
            loading,
            addInfraction,
            updateInfractionStatus,
            clearInfractions
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
