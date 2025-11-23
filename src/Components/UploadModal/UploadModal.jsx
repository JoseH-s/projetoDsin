import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { geminiRoutes } from '../../routes/geminiRoutes';
import { axiosInstance } from '../../routes';
import { useNavigate } from 'react-router-dom';
import styles from './UploadModal.module.css';
import { uploadToInfraction } from '../../services/infractionMapper';

export function UploadModal({ isOpen, onClose, onSuccess }) {
    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/form');
    };

    const processFile = (file) => {
        if (!file) return;
        setSelectedFile(file);  
        const reader = new FileReader();

        reader.onload = (e) => {
            setPreview(e.target.result);
        };

        reader.readAsDataURL(file);
    };

    const onDrop = (acceptedFiles) => processFile(acceptedFiles[0])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': []
        },
        maxFiles: 1
    });

    const clearPreview = () => {
        setPreview(null);
        setSelectedFile(null);
    };

    const handleConfirm = async () => {
        if (!selectedFile) return;
        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            const response = await axiosInstance.post(
                geminiRoutes.processarImagemJson.path,
                formData
            );

            const infraction = uploadToInfraction(response.data);
            onSuccess(infraction);

            clearPreview();
            onClose();
            alert('Enviada com sucesso!');
        } catch {
            alert('Erro ao processar a imagem');
        }
        finally {
            setIsUploading(false);
        }
    };

    const handleClose = () => {
        clearPreview();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={handleClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={handleClose}>×</button>

                <h2 className={styles.title}>Enviar Nova Ocorrência</h2>

                <div
                    className={`${styles.uploadArea} ${isDragActive ? styles.dragActive : ''}`}
                    {...getRootProps()}
                >
                    
                    {preview ? (
                        <>
                            <img src={preview} alt="Preview" className={styles.previewImage} />
                        </>
                    ) : (
                        <>
                            <div className={styles.uploadIcon}>📤</div>
                            <h3>Faça upload de uma imagem</h3>
                            <p className={styles.subtitle}>ou arraste uma imagem aqui</p>
                            <input {...getInputProps()} />
                        </>
                    )}
                </div>

                {preview && (
                    <div className={styles.actions}>
                        <button
                            className={styles.btnConfirm}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleConfirm();
                            }}
                            disabled={isUploading}
                        >
                            {isUploading ? 'Processando...' : 'Confirmar'}
                        </button>
                        <button
                            className={styles.btnRemove}
                            onClick={(e) => {
                                e.stopPropagation();
                                clearPreview();
                            }}
                            disabled={isUploading}
                        >
                            Remover
                        </button>
                    </div>
                )}

                <div className={styles.bottomText}>
                    <p>Não tem a imagem ou prefere preencher manualmente?</p>
                    <button
                        className={styles.btnFill}
                        onClick={handleClick}>
                        Preencher Formulário
                    </button>
                </div>
            </div>
        </div>
    );
}

UploadModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
};
