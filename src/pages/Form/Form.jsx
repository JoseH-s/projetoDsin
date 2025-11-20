import styles from './Form.module.css';
import { useNavigate} from 'react-router-dom';
import { useState} from 'react';
import { Sidebar } from '../../Components/layout/Sidebar/Sidebar';
import { Header } from '../../Components/layout/Header/Header';
import { useInfractions } from '../../contexts/InfractionsContext';
import { processDate } from '../../services/dateService';

export function Form() {
    const navigate = useNavigate();
    const { addInfraction } = useInfractions();

    const [formData, setFormData] = useState({
        dataHora: '',
        descricao: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            descricao: formData.descricao,
            dataHora: processDate(formData.dataHora)
        }

        try {
            await addInfraction(payload);
            alert('Ocorrência registrada com sucesso!');
            navigate('/')
        } catch {
            alert("Erro ao registrar a ocorrência!")
        }
    };

    return (
        <div className={styles.container}>
            <Header />
            <Sidebar />
            <main className={styles.content}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    
                    <div className={styles.column}>
                        {/* <h4>Dados do agente</h4>
                        <label>
                            Matrícula
                            <input
                                type="text"
                                name="matriculaAgente"
                                className={styles.input}
                                value={formData.matriculaAgente}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Nome
                            <input
                                type="text"
                                name="nomeAgente"
                                className={styles.input}
                                value={formData.nomeAgente}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Órgão responsável
                            <input
                                type="text"
                                name="orgaoAutuador"
                                className={styles.input}
                                value={formData.orgaoAutuador}
                                onChange={handleChange}
                            />
                        </label> */}

                        <h4>Infração cometida *</h4>
                        <label>
                            Descrição da infração
                            <input
                                type="text"
                                name="descricao"
                                className={styles.input}
                                value={formData.descricao}
                                onChange={handleChange}
                            ></input>
                        </label>
                    </div>

                    <div className={styles.column}>
                        {/* <h4>Identificação do veículo *</h4>
                        <label>
                            Placa
                            <input
                                type="text"
                                name="placa"
                                className={styles.input}
                                value={formData.placa}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            UF
                            <input
                                type="text"
                                name="ufPlaca"
                                className={styles.input}
                                value={formData.ufPlaca}
                                onChange={handleChange}
                                maxLength="2"
                            />
                        </label>
                        <label>
                            Marca/Modelo
                            <input
                                type="text"
                                name="marcaModelo"
                                className={styles.input}
                                value={formData.marcaModelo}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Cor
                            <input
                                type="text"
                                name="cor"
                                className={styles.input}
                                value={formData.cor}
                                onChange={handleChange}
                            />
                        </label> */}

                        {/* <h4>Identificação do condutor</h4>
                        <label>
                            Nome
                            <input
                                type="text"
                                name="nomeCondutor"
                                className={styles.input}
                                value={formData.nomeCondutor}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            UF CNH
                            <input
                                type="text"
                                name="ufCnh"
                                className={styles.input}
                                value={formData.ufCnh}
                                onChange={handleChange}
                                maxLength="2"
                            />
                        </label> */}
                        
                    </div>

                    <div className={styles.column}>
                        <h4>Data e local da infração</h4>
                        {/* <label>
                            Endereço / Local
                            <input
                                type="text"
                                name="localInfracao"
                                className={styles.input}
                                value={formData.localInfracao}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Cidade
                            <input
                                type="text"
                                name="cidade"
                                className={styles.input}
                                value={formData.cidade}
                                onChange={handleChange}
                            />
                        </label> */}
                        <label>
                            Data e hora do registro
                            <input
                                type="text"
                                name="dataHora"
                                className={styles.input}
                                value={formData.dataHora}
                                onChange={handleChange}
                                placeholder="DD/MM/AAAA HH:MM:SS"
                            />
                        </label>

                        {/* <h4>Observações do agente</h4>
                        <label>
                            <textarea
                                name="obsAgente"
                                className={styles.textarea}
                                value={formData.obsAgente}
                                onChange={handleChange}
                                rows="4"
                            ></textarea>
                        </label> */}

                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" required />
                            Eu me responsabilizo pelas informações inseridas no formulário e estou ciente das implicações legais do registro de infrações.
                        </label>

                        <div className={styles.confirmWrap}>
                            <button type="submit" className={styles.confirmBtn}>
                                Confirmar
                            </button>
                            <button
                                type="button"
                                className={styles.cancelBtn}
                                onClick={() => navigate('/')}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default Form;

