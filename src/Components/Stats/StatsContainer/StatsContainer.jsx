import { FaCalendarDay, FaTimes, FaHourglassHalf, FaCheck } from "react-icons/fa";
import { StatCard } from '../StatCard/StatCard';
import { useInfractions } from '../../../contexts/InfractionsContext';
import styles from './StatsContainer.module.css';

export function StatsContainer() {
    const { infractions } = useInfractions();

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const ocorrenciasHoje = infractions.filter(item => {
        const dataItem = new Date(item.dataHora);
        dataItem.setHours(0, 0, 0, 0);
        return dataItem.getTime() === hoje.getTime();
    }).length;

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
            icon: FaCalendarDay
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
                />
            ))}
        </div>
    )
}