import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { StatsContainer } from '../../Components/Stats/StatsContainer/StatsContainer';
import { ActionButtons } from '../../Components/Actions/ActionButtons/ActionButtons';
import { InfractionsContainer } from '../../Components/Infractions/InfractionsContainer/InfractionsContainer';
import { Header } from '../../Components/layout/Header/Header';
import { Sidebar } from '../../Components/layout/Sidebar/Sidebar';
import { UploadModal } from '../../Components/UploadModal/UploadModal';
import { geminiRoutes } from '../../routes/geminiRoutes';
import { axiosInstance } from '../../routes';
import { useInfractions } from '../../contexts/InfractionsContext';

export function Home() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { infractions, addInfraction } = useInfractions();

    const handleUploadClick = () => {
        setIsModalOpen(true);
    };

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('imagem', file);
        formData.append('file', file);

        try {
            console.log('📤 Enviando arquivo:', file.name, file.type, file.size);

            const response = await axiosInstance.post(
                geminiRoutes.processarImagemJson.path,
                formData
            );

            const result = response.data;
            console.log('📨 Resposta do Gemini:', result);

            const hoje = new Date();
            const dia = hoje.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                weekday: 'short'
            });

            const novaOcorrencia = {
                id: Date.now(),
                dia: dia.replace(',', ' -'),
                descricao: result?.infracao?.descricao_infracao || "Nova ocorrência processada",
                status: "Pendente",
                dadosCompletos: result
            };

            addInfraction(novaOcorrencia);
            alert('✅ Ocorrência enviada e processada com sucesso!');
        } catch (error) {
            console.error('❌ Erro ao processar imagem:', error);

            let mensagem = 'Erro ao processar imagem. ';
            if (error.message.includes('Failed to fetch')) {
                mensagem += 'Verifique se o backend está rodando (https://localhost:7103) e se o CORS está configurado.';
            } else if (error.message.includes('502')) {
                mensagem += 'O servidor Gemini está indisponível. Verifique: \n1. Se a chave da API está configurada corretamente\n2. Se a chave tem créditos/acesso\n3. Se o serviço do Gemini está funcionando';
            } else {
                mensagem += error.message;
            }

            alert(mensagem);
            throw error;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Header />
            </div>
            <aside>
                < Sidebar />
            </aside>
            <main className={styles.content}>
                <div className={styles.left}>
                    <StatsContainer />
                    < ActionButtons
                        onUpload={handleUploadClick}
                        onHistory={() => navigate('/history')}
                    />
                </div>
                <div className={styles.right}>
                    < InfractionsContainer infractions={infractions} />
                </div>
            </main>

            <UploadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUpload={handleUpload}
            />
        </div>
    );
}