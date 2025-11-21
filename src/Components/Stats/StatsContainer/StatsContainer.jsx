import { FaCalendarDay, FaTimes, FaHourglassHalf, FaCheck } from "react-icons/fa";
import { StatCard } from '../StatCard/StatCard';
import { useInfractions } from '../../../contexts/InfractionsContext';
import styles from './StatsContainer.module.css';
import { processDate, isToday } from "../../../services/dateService";

export function StatsContainer() {
    const { infractions } = useInfractions();

    const ocorrenciasHojeLista = infractions.filter(item => {
        const iso = processDate(item.dataHora);
        if (!iso) return false;

        const date = new Date(iso);
        return isToday(date);
    })
    
    const ocorrenciasHoje = ocorrenciasHojeLista.length;

    const rejeitadas = infractions.filter(item =>
        item.status?.toLowerCase() === 'rejeitado' ||
        item.status?.toLowerCase() === 'rejeitada'
    ).length;

    const pendentes = infractions.filter(item =>
        item.status?.toLowerCase() === 'pendente' ||
        item.status?.toLowerCase() === 'pendente de revisão' ||
        !item.status
    ).length;

    const aprovadas = infractions.filter(item =>
        item.status?.toLowerCase() === 'aprovado' ||
        item.status?.toLowerCase() === 'aprovada'
    ).length;

    const stats = [
        {
            title: "OCORRÊNCIAS DO DIA",
            value: ocorrenciasHoje.toString(),
            icon: FaCalendarDay,
            items: ocorrenciasHojeLista
        },
        {
            title: "REJEITADAS",
            value: rejeitadas.toString(),
            icon: FaTimes
        },
        {
            title: "PENDENTES DE REVISÃO",
            value: pendentes.toString(),
            icon: FaHourglassHalf
        },
        {
            title: "APROVADAS",
            value: aprovadas.toString(),
            icon: FaCheck
        },
    ];

    return (
        <div className={styles.cards}>
            {stats.map((stat, index) => (
                <StatCard
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    items={stat.items}
                />
            ))}
        </div>
    )
}