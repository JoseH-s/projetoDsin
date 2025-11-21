import PropTypes from 'prop-types';
import styles from './InfractionsContainer.module.css';
import { InfractionLine } from '../InfractionLine/InfractionLine';

export function InfractionsContainer({ infractions }) {

    const limitedInfractions = [...infractions].sort((a, b) => b.id - a.id).slice(0, 10);

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
                        return (
                            <InfractionLine
                                key={item.id || index}
                                id={item.id || index}
                                dataHora={item.dataHora}
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
