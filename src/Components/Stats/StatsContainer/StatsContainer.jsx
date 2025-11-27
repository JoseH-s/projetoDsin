import { FaCalendarDay, FaTimes, FaHourglassHalf, FaCheck } from "react-icons/fa";
import { StatCard } from '../StatCard/StatCard';
import { useInfractions } from '../../../contexts/InfractionsContext';
import styles from './StatsContainer.module.css';
import { processDate, isToday } from "../../../services/dateService";

export function StatsContainer() {
    const { infractions } = useInfractions();

    const todayInfractionsList = infractions.filter(item => {
        const iso = processDate(item.dateTime);
        if (!iso) return false;

        const date = new Date(iso);
        return isToday(date);
    })

    const todayInfractions = todayInfractionsList.length;;

    const rejected = infractions.filter(item =>
        item.status?.toLowerCase() === 'rejeitado' ||
        item.status?.toLowerCase() === 'rejeitada'
    ).length;

    const pending = infractions.filter(item =>
        item.status?.toLowerCase() === 'pendente' ||
        item.status?.toLowerCase() === 'pendente de revisão' ||
        !item.status
    ).length;

    const approved = infractions.filter(item =>
        item.status?.toLowerCase() === 'aprovado' ||
        item.status?.toLowerCase() === 'aprovada'
    ).length;

    const stats = [
        {
            title: "OCORRÊNCIAS DO DIA",
            value: todayInfractions.toString(),
            icon: FaCalendarDay,
            items: todayInfractionsList
        },
        {
            title: "REJEITADAS",
            value: rejected.toString(),
            icon: FaTimes
        },
        {
            title: "PENDENTES DE REVISÃO",
            value: pending.toString(),
            icon: FaHourglassHalf
        },
        {
            title: "APROVADAS",
            value: approved.toString(),
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