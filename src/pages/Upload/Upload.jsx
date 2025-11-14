import styles from './Upload.module.css';
import logo from '../../assets/dsin.svg';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { geminiRoutes } from '../../routes/geminiRoutes';
import { axiosInstance } from '../../routes';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

export function Upload() {
    const navigate = useNavigate();
    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadHistory, setUploadHistory] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        fetchUploadHistory();
    }, []);

    const fetchUploadHistory = async () => {
        try {
            console.log('Buscando histórico de uploads...');
            const response = await axios.get(`${API_URL}/api/images`);
            console.log('Resposta do servidor:', response.data);
            if (response.data.success) {
                setUploadHistory(response.data.data);
                console.log('Histórico atualizado:', response.data.data.length, 'imagens');
            }
        } catch (error) {
            console.error('SErro ao carregar histórico:', error);
        }
    };

    const processFile = useCallback((file) => {
        if (!file) return;
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target.result);
        };
        reader.readAsDataURL(file);
    }, []);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            processFile(file);
        }
    }, [processFile]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': []
        },
        maxFiles: 1
    });

    function clearPreview() {
        setPreview(null);
        setSelectedFile(null);
    }

    const handleConfirm = async () => {
        if (!selectedFile) {
            console.error('❌ Nenhum arquivo selecionado');
            return;
        }

        console.log('Iniciando processamento com Gemini:', selectedFile.name);
        console.log('Tamanho do arquivo:', selectedFile.size, 'bytes');
        console.log('Tipo do arquivo:', selectedFile.type);
        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            console.log('Enviando para Gemini');

            const response = await axiosInstance.post(
                geminiRoutes.processarImagemJson.path,
                formData
            );

            console.log('Status da resposta:', response.status);
            console.log('Resposta do Gemini:', response.data);

            if (response.data) {
                console.log('Processamento realizado com sucesso!');
                await fetchUploadHistory();
                clearPreview();
                alert('Imagem processada com sucesso pelo Gemini!');
                navigate('/');
            } else {
                console.error('Erro na resposta:', response.data);
                alert('Erro ao processar imagem');
            }
        } catch (error) {
            console.error('Erro ao fazer upload:', error);
            console.error('Detalhes do erro:', error.message);
            alert(`Erro ao enviar imagem: ${error.message}`);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (filename) => {
        if (!confirm('Deseja realmente deletar esta imagem?')) return;

        try {
            const response = await axios.delete(`${API_URL}/api/images/${filename}`);

            if (response.data.success) {
                await fetchUploadHistory();
            }
        } catch (error) {
            console.error('Erro ao deletar imagem:', error);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={logo} alt="DSIN logo" />
            </div>

            <aside className={styles.sidebar} />

            <main className={styles.content}>
                <div className={styles.uploadSection}>
                    <div
                        className={`${styles.card} ${isDragActive ? styles.dragOver : ''}`}
                        {...getRootProps()}
                    >
                        {preview ? (
                            <>
                                <img src={preview} alt="Preview" className={styles.previewImage} />
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <button
                                        type="button"
                                        className={styles.fillBtn}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleConfirm();
                                        }}
                                        disabled={isUploading}
                                    >
                                        {isUploading ? 'Enviando...' : 'Confirmar'}
                                    </button>
                                    <button
                                        type="button"
                                        className={styles.fillBtn}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            clearPreview();
                                        }}
                                    >
                                        Remover
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2>Faça upload de uma imagem para digitalizar a ocorrência</h2>
                                <p className={styles.subtitle}>ou arraste uma imagem</p>

                                <input {...getInputProps()} />

                                <button type="button" className={styles.uploadBtn}>
                                    Faça upload
                                </button>
                            </>
                        )}
                    </div>

                    <div className={styles.bottomText}>
                        <p>Não tem a imagem ou prefere preencher manualmente?</p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                            <button className={styles.fillBtn} onClick={() => navigate('/form')}>
                                Preencher
                            </button>
                            <button className={styles.fillBtn} onClick={() => navigate('/')}>
                                Enviar nova ocorrência
                            </button>
                        </div>
                    </div>
                </div>

                <div className={styles.historySection}>
                    <h3 className={styles.historyTitle}>Histórico de Uploads</h3>
                    <div className={styles.historyList}>
                        {uploadHistory.length === 0 ? (
                            <p className={styles.emptyHistory}>Nenhuma imagem enviada ainda</p>
                        ) : (
                            uploadHistory.map((image) => (
                                <div key={image.filename} className={styles.historyItem}>
                                    <img
                                        src={`${API_URL}${image.path}`}
                                        alt={image.originalName || image.filename}
                                        className={styles.historyThumbnail}
                                    />
                                    <div className={styles.historyInfo}>
                                        <p className={styles.historyFilename}>
                                            {image.originalName || image.filename}
                                        </p>
                                        <p className={styles.historyDetails}>
                                            {formatFileSize(image.size)} • {formatDate(image.uploadedAt)}
                                        </p>
                                    </div>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => handleDelete(image.filename)}
                                        title="Deletar imagem"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Upload;
