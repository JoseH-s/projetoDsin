import styles from './InfractionsContainer.module.css';
import { InfractionLine } from '../InfractionLine/InfractionLine';

export function InfractionsContainer() {
    const infractions = [
        { dia: "04/09 - qui", descricao: "Estacionar em local proibido", status: "Aprovada" },
        { dia: "04/09 - qui", descricao: "Estacionar em local proibido", status: "Aprovada" },
        { dia: "04/09 - qui", descricao: "Estacionar em local proibido", status: "Rejeitada" },
        { dia: "04/09 - qui", descricao: "Estacionar em local proibido", status: "Aprovada" },
        { dia: "04/09 - qui", descricao: "Estacionar em local proibido", status: "Pendente" },
    ];

    return (
        <div className={styles.historico}>
            <h3>HISTÓRICO DE OCORRÊNCIAS</h3>
            <table>
                <thead>
                    <tr>
                        <th>DIA</th>
                        <th>DESCRIÇÃO</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    {infractions.map((item, index) => (
                        <InfractionLine
                            key={index}
                            dia={item.dia}
                            descricao={item.descricao}
                            status={item.status}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
