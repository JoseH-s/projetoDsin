import PropTypes from 'prop-types';
import styles from './InfractionsContainer.module.css';
import { InfractionLine } from '../InfractionLine/InfractionLine';

export function InfractionsContainer({ infractions }) {

    const sortedInfractions = [...infractions]
        .sort((a, b) => b.id - a.id)
        .slice(0, 10);

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
        dateTime: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        description: PropTypes.string,
        type: PropTypes.number.isRequired,
        status: PropTypes.string,
    })).isRequired,
};
