import styles from './Form.module.css';
import logo from '../assets/dsin.svg';
import { useNavigate } from 'react-router-dom';

export function Form() {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <aside className={styles.sidebar} />

            <div className={styles.content}>
                <div className={styles.headerLogo}>
                    <img src={logo} alt="DSIN" />
                </div>

                <form className={styles.form}>
                    <div className={styles.column}>
                        <h4>Dados do agente</h4>
                        <label>Nome<input type="text" className={styles.input} /></label>
                        <label>Sobrenome<input type="text" className={styles.input} /></label>
                        <label>Órgão responsável<input type="text" className={styles.input} /></label>

                        <h4>Infração cometida *</h4>
                        <label>Código da infração<input type="text" className={styles.input} /></label>
                        <label>Descrição da infração<textarea className={styles.textarea}></textarea></label>
                        <label>Artigo do CTB (Artigo / Inciso)
                            <div className={styles.inlineInputs}>
                                <input type="text" className={styles.smallInput} />
                                <input type="text" className={styles.smallInput} />
                            </div>
                        </label>

                        <label>Valor da multa<input type="text" className={styles.input} /></label>
                    </div>

                    <div className={styles.column}>
                        <h4>Identificação do veículo *</h4>
                        <label>Placa<input type="text" className={styles.input} /></label>
                        <label>Marca/Modelo<input type="text" className={styles.input} /></label>
                        <label>Cor<input type="text" className={styles.input} /></label>

                        <h4>Identificação do condutor (se aplicável)</h4>
                        <label>Nome<input type="text" className={styles.input} /></label>
                        <label>Sobrenome<input type="text" className={styles.input} /></label>
                        <label>CPF / CNH
                            <div className={styles.inlineInputs}>
                                <input type="text" className={styles.smallInput} />
                                <input type="text" className={styles.smallInput} />
                            </div>
                        </label>

                        <label>Data e hora do registro
                            <div className={styles.inlineInputs}>
                                <input type="text" className={styles.smallInput} />
                                <input type="text" className={styles.smallInput} />
                            </div>
                        </label>

                        <label>Informações adicionais<textarea className={styles.textarea}></textarea></label>
                    </div>

                    <div className={styles.column}>
                        <h4>Identificação do veículo</h4>
                        <label>Endereço<input type="text" className={styles.input} /></label>
                        <label>Cidade<input type="text" className={styles.input} /></label>
                        <label>Referência<input type="text" className={styles.input} /></label>

                        <label>Assinatura do agente *<textarea className={styles.signature}></textarea></label>
                        <label>Assinatura do condutor<textarea className={styles.signature}></textarea></label>

                        <label className={styles.checkboxLabel}><input type="checkbox" /> Eu me responsabilizo pelas informações inseridas no formulário e estou ciente das implicações legais do registro de infrações.</label>

                        <div className={styles.confirmWrap}>
                            <button type="button" className={styles.confirmBtn} onClick={() => navigate('/')}>Confirmar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;

