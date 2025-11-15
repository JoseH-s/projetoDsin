import styles from './Form.module.css';
import logo from '../../assets/dsin.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Sidebar } from '../../Components/layout/Sidebar/Sidebar';
import { Header } from '../../Components/layout/Header/Header';

export function Form() {
    const navigate = useNavigate();
    const location = useLocation();
    const infractionData = location.state?.infraction?.dadosCompletos;

    const [formData, setFormData] = useState({
        matriculaAgente: '',
        nomeAgente: '',
        orgaoAutuador: '',

        codigoInfracao: '',
        descricaoInfracao: '',
        amparoLegal: '',
        valorMulta: '',

        placa: '',
        ufPlaca: '',
        marcaModelo: '',
        cor: '',
        categoria: '',
        chassi: '',

        nomeCondutor: '',
        cpfCondutor: '',
        numeroCnh: '',
        ufCnh: '',

        dataHora: '',
        localInfracao: '',
        cidade: '',
        referencia: '',

        obsAgente: '',
        informacoesAdicionais: '',
    });

    useEffect(() => {
        if (infractionData) {
            const { cabecalho, dados_veiculo, dados_condutor, infracao, dados_agente } = infractionData;

            setFormData({
                matriculaAgente: dados_agente?.matricula_agente || '',
                nomeAgente: dados_agente?.nome_agente || '',
                orgaoAutuador: cabecalho?.orgao_autuador || '',

                codigoInfracao: infracao?.codigo_enquadramento || '',
                descricaoInfracao: infracao?.descricao_infracao || '',
                amparoLegal: infracao?.amparo_legal || '',
                valorMulta: '',

                placa: dados_veiculo?.placa || '',
                ufPlaca: dados_veiculo?.uf_placa || '',
                marcaModelo: dados_veiculo?.marca_modelo || '',
                cor: dados_veiculo?.cor || '',
                categoria: dados_veiculo?.categoria || '',
                chassi: dados_veiculo?.chassi || '',

                nomeCondutor: dados_condutor?.nome_condutor || '',
                cpfCondutor: dados_condutor?.cpf_condutor || '',
                numeroCnh: dados_condutor?.numero_cnh_pgu || '',
                ufCnh: dados_condutor?.uf_cnh || '',

                dataHora: cabecalho?.data_hora_infracao || '',
                localInfracao: cabecalho?.local_infracao || '',
                cidade: '',
                referencia: '',

                obsAgente: infracao?.obs_agente || '',
                informacoesAdicionais: infracao?.medida_administrativa || '',
            });
        }
    }, [infractionData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Dados do formulário:', formData);
        alert('Ocorrência registrada com sucesso!');
        navigate('/');
    };
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                < Header />
            </div>
            <aside>
                < Sidebar />
            </aside>
            <main className={styles.content}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.column}>
                        <h4>Dados do agente</h4>
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
                        </label>

                        <h4>Infração cometida *</h4>
                        <label>
                            Código da infração
                            <input
                                type="text"
                                name="codigoInfracao"
                                className={styles.input}
                                value={formData.codigoInfracao}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Descrição da infração
                            <textarea
                                name="descricaoInfracao"
                                className={styles.textarea}
                                value={formData.descricaoInfracao}
                                onChange={handleChange}
                                required
                                rows="3"
                            ></textarea>
                        </label>
                        <label>
                            Amparo Legal
                            <input
                                type="text"
                                name="amparoLegal"
                                className={styles.input}
                                value={formData.amparoLegal}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Valor da multa
                            <input
                                type="text"
                                name="valorMulta"
                                className={styles.input}
                                value={formData.valorMulta}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className={styles.column}>
                        <h4>Identificação do veículo *</h4>
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
                        </label>

                        <h4>Identificação do condutor</h4>
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
                            CPF
                            <input
                                type="text"
                                name="cpfCondutor"
                                className={styles.input}
                                value={formData.cpfCondutor}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            CNH
                            <input
                                type="text"
                                name="numeroCnh"
                                className={styles.input}
                                value={formData.numeroCnh}
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
                        </label>
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
                    </div>

                    <div className={styles.column}>
                        <h4>Local da infração</h4>
                        <label>
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
                        </label>
                        <label>
                            Referência
                            <input
                                type="text"
                                name="referencia"
                                className={styles.input}
                                value={formData.referencia}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Observações do agente
                            <textarea
                                name="obsAgente"
                                className={styles.textarea}
                                value={formData.obsAgente}
                                onChange={handleChange}
                                rows="4"
                            ></textarea>
                        </label>

                        <label>
                            Informações adicionais
                            <textarea
                                name="informacoesAdicionais"
                                className={styles.textarea}
                                value={formData.informacoesAdicionais}
                                onChange={handleChange}
                                rows="3"
                            ></textarea>
                        </label>

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

