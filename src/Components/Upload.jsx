import styles from './Upload.module.css';
import logo from '../assets/dsin.svg';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

export function Upload() {
    const navigate = useNavigate();
    const [preview, setPreview] = useState(null);

    const processFile = useCallback((file) => {
        if (!file) return;
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
    }

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={logo} alt="DSIN logo" />
            </div>

            <aside className={styles.sidebar} />

            <main className={styles.content}>
                <div
                    className={`${styles.card} ${isDragActive ? styles.dragOver : ''}`}
                    {...getRootProps()}
                >
                    {preview ? (
                        <>
                            <img src={preview} alt="Preview" className={styles.previewImage} />
                            <div style={{ display: 'flex', gap: 12 }}>
                                <button type="button" className={styles.fillBtn} onClick={clearPreview}>Confirmar</button>
                                <button type="button" className={styles.fillBtn} onClick={clearPreview}>Remover</button>
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
                    <button className={styles.fillBtn} onClick={() => navigate('/form')}>Preencher</button>
                </div>
            </main>
        </div>
    );
}

export default Upload;
