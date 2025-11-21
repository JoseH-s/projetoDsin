import PropTypes from 'prop-types';
import  styles  from "./DetailsContainer.module.css";

export function DetailsContainer( { infraction }) { 

    const displayDate = new Date(infraction.dataHora).toLocaleDateString('pt-BR');
    return (
        <div className={styles.detailsContainer}>
            <h3>Detalhes da Infração</h3>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>DESCRICAO</th>
                        <th>MODELO VEICULO</th>
                        <th>COR</th>
                        <th>PLACA</th>
                        <th>INFRATOR</th>
                        <th>CNH</th>
                        <th>TIPO</th>
                        <th>STATUS</th>
                    </tr>
                 
                </thead>
                <tbody>
                    <tr>
                        <td>{displayDate}</td>
                        <td>{infraction.descricao}</td>
                        <td>Null</td>
                        <td>Null</td>
                        <td>Null</td>
                        <td>Null</td>
                        <td>Null</td>
                        <td>Null</td>
                    </tr>
                
                </tbody>
            </table>
        </div>
    )
}

DetailsContainer.PropTypes = {
    infraction: PropTypes.object
};

