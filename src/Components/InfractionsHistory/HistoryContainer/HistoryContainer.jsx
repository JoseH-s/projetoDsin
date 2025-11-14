import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './HistoryContainer.module.css';
import { HistoryLine } from '../HistoryLine/HistoryLine';


export function HistoryContainer({ infractions }) {
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        type: ''
    });

    const typesInfractions = [
        "Leve",
        "Média",
        "Grave",
        "Gravíssima"
    ];

    const filterChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            startDate: '',
            endDate: '',
            type: ''
        });
    };

    const parseDate = (dateString) => {
        // Formato: "04/09 - qui" ou "DD/MM/YYYY"
        const parts = dateString.split(' - ')[0].split('/');
        const day = parts[0];
        const month = parts[1];
        const year = parts[2] || new Date().getFullYear();
        return new Date(`${year}-${month}-${day}`);
    };

    const filteredInfractions = infractions.filter(item => {
        try {
            const itemDate = parseDate(item.dia || item.data);

            // Filtro de data início
            if (filters.startDate) {
                const startDate = new Date(filters.startDate);
                if (itemDate < startDate) return false;
            }

            // Filtro de data fim
            if (filters.endDate) {
                const endDate = new Date(filters.endDate);
                if (itemDate > endDate) return false;
            }

            // Filtro de tipo (se existir)
            if (filters.type && item.type) {
                if (item.type.toLowerCase() !== filters.type.toLowerCase()) return false;
            }

            return true;
        } catch (e) {
            console.error('Erro ao filtrar:', e);
            return true;
        }
    });

    return (
        <div className={styles.historico}>
            <div className={styles.filterHeader}>
                <div className={styles.filterGroup}>
                    <label>De:</label>
                    <input
                        type="date"
                        value={filters.startDate}
                        onChange={(e) => filterChange('startDate', e.target.value)}
                        className={styles.dateInput}
                    />
                </div>

                <div className={styles.filterGroup}>
                    <label>Até:</label>
                    <input
                        type="date"
                        value={filters.endDate}
                        onChange={(e) => filterChange('endDate', e.target.value)}
                        className={styles.dateInput}
                    />
                </div>

                <div className={styles.filterGroup}>
                    <label>Tipo:</label>
                    <select
                        value={filters.type}
                        onChange={(e) => filterChange('type', e.target.value)}
                        className={styles.typeSelect}
                    >
                        <option value="">Todos os tipos</option>
                        {typesInfractions.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.buttonGroup}>
                    <button
                        onClick={clearFilters}
                        className={styles.clearButton}
                    >
                        Limpar
                    </button>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Data</th>
                        <th>Tipo</th>
                        <th>Descrição</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredInfractions.length === 0 ? (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                                Nenhuma ocorrência encontrada
                            </td>
                        </tr>
                    ) : (
                        filteredInfractions.map((item) => (
                            <HistoryLine
                                key={item.id}
                                id={item.id}
                                dia={item.dia || item.data}
                                descricao={item.descricao}
                                status={item.status}
                                type={item.type}
                                data={item}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

HistoryContainer.propTypes = {
    infractions: PropTypes.arrayOf(PropTypes.object).isRequired,
};