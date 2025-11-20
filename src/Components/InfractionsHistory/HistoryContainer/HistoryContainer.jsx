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

    const infractionTypes = [
        "Leve",
        "Média",
        "Grave",
        "Gravíssima"
    ];

    const handleFilterChange = (field, value) => {
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

    const filteredInfractions = infractions.filter(item => {
        const itemDate = new Date(item.dataHora);

        if (filters.startDate) {
            if (itemDate < new Date(filters.startDate)) return false;
        }

        if (filters.endDate) {
            const endDate = new Date(filters.endDate);
            endDate.setHours(23, 59, 59);
            if (itemDate > endDate) return false;
        }

        if (filters.type) {
            const itemType = item.tipoMulta?.nome ?? "";
            if (itemType.toLowerCase() !== filters.type.toLowerCase()) {
                return false;
            }
        }

        return true;
    });

    return (
        <div className={styles.historico}>
            <div className={styles.filterHeader}>
                <div className={styles.filterGroup}>
                    <label>De:</label>
                    <input
                        type="date"
                        value={filters.startDate}
                        onChange={(e) => handleFilterChange('startDate', e.target.value)}
                        className={styles.dateInput}
                    />
                </div>

                <div className={styles.filterGroup}>
                    <label>Até:</label>
                    <input
                        type="date"
                        value={filters.endDate}
                        onChange={(e) => handleFilterChange('endDate', e.target.value)}
                        className={styles.dateInput}
                    />
                </div>

                <div className={styles.filterGroup}>
                    <label>Tipo:</label>
                    <select
                        value={filters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                        className={styles.typeSelect}
                    >
                        <option value="">Todos os tipos</option>
                        {infractionTypes.map((type, index) => (
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

            <div className={styles.tableWrapper}>
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
                                <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                                    Nenhuma ocorrência encontrada
                                </td>
                            </tr>
                        ) : (
                            [...filteredInfractions].reverse().map((item) => (
                                <HistoryLine
                                    key={item.id}
                                    id={item.id}
                                    dataHora={item.dataHora}
                                    descricao={item.descricao}
                                    status={item.status ?? "indefinido"}
                                    type={item.tipoMulta?.nome ?? "Sem tipo"}
                                    data={item}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}

HistoryContainer.propTypes = {
    infractions: PropTypes.arrayOf(PropTypes.object).isRequired,
};