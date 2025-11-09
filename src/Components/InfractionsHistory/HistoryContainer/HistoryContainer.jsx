import { useState } from 'react';
import styles from './HistoryContainer.module.css';
import { HistoryLine } from '../HistoryLine/HistoryLine';


export function HistoryContainer() {
    const [filters, setFilters] = useState({
        startDate: '',
        dataFim: '',
        type: ''
    });

    const typesInfractions = [
        "Leve",
        "Média",
        "Grave",
        "Gravissimo"
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
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
    };

    const infractions = [
        { id: "01", data: "04/09/2025", type: "grave", descricao: "Estacionar em local proibido", status: "Aprovada" },
        { id: "01", data: "02/10/2025", type: "grave", descricao: "Estacionar em local proibido", status: "Aprovada" },
        { id: "01", data: "04/09/2025", type: "grave", descricao: "Estacionar em local proibido", status: "Rejeitada" },
        { id: "01", data: "04/10/2025", type: "grave", descricao: "Estacionar em local proibido", status: "Aprovada" },
        { id: "01", data: "04/09/2025", type: "gravissimo", descricao: "Estacionar em local proibido", status: "Pendente" },
    ];

    const filteredInfractions = infractions.filter(item => {
        const itemDate = parseDate(item.data);

       if (filters.startDate) {
            const startDate = new Date(filters.startDate);
            if (itemDate < startDate) {
                return false;
            }
        }
        
        if (filters.endDate) {
            const endDate = new Date(filters.endDate);
            endDate.setDate(endDate.getDate() + 1);
            if (itemDate >= endDate) {
                return false;
            }
        }
        
        if (filters.type && item.type.toLowerCase() !== filters.type.toLowerCase()) {
            return false;
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
                    {filteredInfractions.map((item) => (
                        <HistoryLine
                            key={item.id}
                            id = {item.id}
                            data={item.data}
                            descricao={item.descricao}
                            status={item.status}
                            type={item.type}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

