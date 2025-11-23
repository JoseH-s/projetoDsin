import PropTypes from 'prop-types';
import styles from './InfractionsContainer.module.css';
import { InfractionLine } from '../InfractionLine/InfractionLine';

export function InfractionsContainer({ infractions }) {

    const sortedInfractions = [...infractions]
        .sort((a, b) => b.id - a.id);

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
                    {sortedInfractions.map((item) => {
                        return (
                            <InfractionLine
                                key={item.id}
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
    );
}

InfractionsContainer.propTypes = {
    infractions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        dataHora: PropTypes.string.isRequired,
        descricao: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    })).isRequired,
};
