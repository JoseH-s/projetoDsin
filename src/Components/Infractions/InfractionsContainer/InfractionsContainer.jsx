import PropTypes from 'prop-types';
import styles from './InfractionsContainer.module.css';
import { InfractionLine } from '../InfractionLine/InfractionLine';

export function InfractionsContainer({ infractions }) {

    const limitedInfractions = [...infractions].slice(-10).reverse();

    return (
        <div className={styles.historico}>
            <h3>HISTÓRICO DE OCORRÊNCIAS</h3>
            <table>
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>DESCRIÇÃO</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    {limitedInfractions.map((item, index) => {
                        const formattedDate = item.dataHora
                            ? new Date(item.dataHora).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })
                            : item.dia;

                        return (
                            <InfractionLine
                                key={item.id || index}
                                id={item.id || index}
                                dia={formattedDate}
                                descricao={item.descricao}
                                status={item.status}
                                data={item}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

InfractionsContainer.propTypes = {
    infractions: PropTypes.arrayOf(PropTypes.shape({
        dia: PropTypes.string.isRequired,
        descricao: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    })).isRequired,
};
