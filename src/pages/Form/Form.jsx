import styles from './Form.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Sidebar } from '../../Components/layout/Sidebar/Sidebar';
import { Header } from '../../Components/layout/Header/Header';
import { useInfractions } from '../../contexts/InfractionsContext';
import { formToTicket } from '../../services/ticketMapper';
import { validateTicket } from '../../services/validateTicketForm';
import { getAllViolationTypes } from '../../constants/violationTypes';

export function Form() {
    const navigate = useNavigate();
    const location = useLocation();
    const { addInfraction, updateInfraction } = useInfractions();

    const isEdit = location.state?.isEdit || false;
    const infractionToEdit = location.state?.infraction;

    const initialForm = {
        brand: '',
        model: '',
        violationLocation: '',
        reference: '',
        dateTime: '',
        state: '',
        city: '',
        description: '',
        color: '',
        type: '0'
    }
    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {
        if (isEdit && infractionToEdit) {
            setFormData({
                brand: infractionToEdit.brand || '',
                model: infractionToEdit.model || '',
                violationLocation: infractionToEdit.violationLocation || '',
                reference: infractionToEdit.reference || '',
                dateTime: infractionToEdit.dateTime ? infractionToEdit.dateTime.slice(0, 16) : '',
                state: infractionToEdit.state || '',
                city: infractionToEdit.city || '',
                description: infractionToEdit.description || '',
                color: infractionToEdit.color || '',
                type: infractionToEdit.type?.toString() || '0'
            });
        }
    }, [isEdit, infractionToEdit]);

    const handleChange = ({ target }) => {
        const { name, value } = target;

        setFormData(prev => {
            if (!(name in prev)) return prev;
            return { ...prev, [name]: value };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const error = validateTicket(formData);
        if (error) {
            alert(error);
            return;
        }

        const payload = formToTicket(formData);

        try {
            if (isEdit) {
                const success = await updateInfraction(infractionToEdit.id, payload);
                if (success) {
                    alert('Ocorrência atualizada com sucesso!');
                    navigate('/history');
                }
            } else {
                await addInfraction(payload);
                alert('Ocorrência registrada com sucesso!');
                navigate('/');
            }
        } catch {
            alert(`Erro ao ${isEdit ? 'atualizar' : 'registrar'} ocorrência!`);
        }
    };

    return (
        <div className={styles.container}>
            <Header />
            <Sidebar />
            <main className={styles.content}>
                <form className={styles.form} onSubmit={handleSubmit}>

                    <div className={styles.column}>
                        <h4>Informações do Veículo *</h4>
                        <label>
                            Marca
                            <input
                                type="text"
                                name="brand"
                                className={styles.input}
                                value={formData.brand}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Modelo *
                            <input
                                type="text"
                                name="model"
                                className={styles.input}
                                value={formData.model}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Cor
                            <input
                                type="text"
                                name="color"
                                className={styles.input}
                                value={formData.color}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className={styles.column}>
                        <h4>Detalhes da Infração *</h4>
                        <label>
                            Tipo de Infração *
                            <select
                                name="type"
                                className={styles.input}
                                value={formData.type}
                                onChange={handleChange}
                                required
                            >
                                {getAllViolationTypes().map(vType => (
                                    <option key={vType.value} value={vType.value}>
                                        {vType.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Descrição
                            <textarea
                                name="description"
                                className={styles.textarea}
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                            />
                        </label>
                        <label>
                            Referência
                            <input
                                type="text"
                                name="reference"
                                className={styles.input}
                                value={formData.reference}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className={styles.column}>
                        <h4>Localização e Data</h4>
                        <label>
                            Local da Infração
                            <input
                                type="text"
                                name="violationLocation"
                                className={styles.input}
                                value={formData.violationLocation}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Cidade
                            <input
                                type="text"
                                name="city"
                                className={styles.input}
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Estado
                            <input
                                type="text"
                                name="state"
                                className={styles.input}
                                value={formData.state}
                                onChange={handleChange}
                                maxLength="2"
                            />
                        </label>
                        <label>
                            Data e Hora
                            <input
                                type="datetime-local"
                                name="dateTime"
                                className={styles.input}
                                value={formData.dateTime}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" required />
                            Sou responsável pelas informações inseridas e estou ciente das implicações legais.
                        </label>

                        <div className={styles.confirmWrap}>
                            <button type="submit" className={styles.confirmBtn}>
                                {isEdit ? 'Atualizar' : 'Confirmar'}
                            </button>
                            <button
                                type="button"
                                className={styles.cancelBtn}
                                onClick={() => navigate(isEdit ? '/history' : '/')}
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