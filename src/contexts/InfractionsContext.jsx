import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const InfractionsContext = createContext();

export function InfractionsProvider({ children }) {
    const [infractions, setInfractions] = useState(() => {
        const saved = localStorage.getItem('infractions');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Erro ao carregar histórico:', e);
            }
        }
        return [
            { id: 1, dia: "04/09 - qui", descricao: "Estacionar em local proibido", status: "Aprovada" },
            { id: 2, dia: "04/09 - qui", descricao: "Estacionar em local proibido", status: "Aprovada" },
            { id: 3, dia: "04/09 - qui", descricao: "Estacionar em local proibido", status: "Pendente" },
            { id: 4, dia: "04/09 - qui", descricao: "Estacionar em local proibido", status: "Aprovada" },
            { id: 5, dia: "04/09 - qui", descricao: "Estacionar em local proibido", status: "Pendente" },
        ];
    });

    useEffect(() => {
        localStorage.setItem('infractions', JSON.stringify(infractions));
    }, [infractions]);

    const addInfraction = (infraction) => {
        setInfractions(prev => [infraction, ...prev]);
    };

    const updateInfractionStatus = (id, newStatus) => {
        setInfractions(prev =>
            prev.map(inf => inf.id === id ? { ...inf, status: newStatus } : inf)
        );
    };

    const clearInfractions = () => {
        setInfractions([]);
        localStorage.removeItem('infractions');
    };

    return (
        <InfractionsContext.Provider value={{
            infractions,
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
