import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './HistoryContainer.module.css';
import { HistoryLine } from '../HistoryLine/HistoryLine';
import { getAllViolationTypes } from '../../../constants/violationTypes';

export function HistoryContainer({ infractions }) {

    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        type: ''
    });

    const violationTypes = getAllViolationTypes();

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
        const itemDate = new Date(item.dateTime);

        if (filters.startDate) {
            if (itemDate < new Date(filters.startDate)) return false;
        }

        if (filters.endDate) {
            const endDate = new Date(filters.endDate);
            endDate.setHours(23, 59, 59);
            if (itemDate > endDate) return false;
        }

        if (filters.type !== '') {
            const itemType = item.type;
            if (itemType !== parseInt(filters.type)) {
                return false;
            }
        }

        return true;
    });

    return (
        <div className={styles.historico}>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>
                                <label>DE:</label>
                                <input
                                    type="date"
                                    value={filters.startDate}
                                    onChange={(e) => handleFilterChange('startDate', e.target.value)}
                                    className={styles.dateInput}
                                />
                            </th>

                            <th>
                                <label>ATÉ:</label>
                                <input
                                    type="date"
                                    value={filters.endDate}
                                    onChange={(e) => handleFilterChange('endDate', e.target.value)}
                                    className={styles.dateInput}
                                />
                            </th>

                            <th>
                                <label>TIPO:</label>
                                <select
                                    value={filters.type}
                                    onChange={(e) => handleFilterChange('type', e.target.value)}
                                    className={styles.typeSelect}
                                >
                                    <option value="">Todos os tipos</option>
                                    {violationTypes.map((type) => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </th>

                            <th>
                                <button
                                    onClick={clearFilters}
                                    className={styles.clearButton}
                                >
                                    Limpar
                                </button>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredInfractions.length === 0 ? (
                            <tr>
                                <td colSpan="4" className={styles.noInfractions}>
                                    Nenhuma ocorrência encontrada
                                </td>
                            </tr>
                        ) : (
                            [...filteredInfractions]
                                .sort((a, b) => b.id - a.id)
                                .map((item) => (
                                    <HistoryLine
                                        key={item.id}
                                        data={item}
                                    />
                                ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

HistoryContainer.propTypes = {
    infractions: PropTypes.arrayOf(PropTypes.object).isRequired,
};