import { FaCalendarDay, FaTimes, FaHourglassHalf, FaCheck } from "react-icons/fa";
import { StatCard } from '../StatCard/StatCard';
import styles from './StatsContainer.module.css';

export function StatsContainer() {
    const stats = [
        {
            title: "OCORRÊNCIAS DO DIA",
            value: "28", 
            icon: FaCalendarDay
        },
        {
            title: "REJEITADAS",
            value: "2",
            icon: FaTimes
        },
        {
            title: "PENDENTES DE REVISÃO",
            value: "5",
            icon: FaHourglassHalf
        },
        {
            title: "APROVADAS",
            value: "21",
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