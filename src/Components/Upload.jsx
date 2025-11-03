import styles from './Upload.module.css';
import logo from '../assets/dsin.svg';
import { useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function Upload() {
    const navigate = useNavigate();
    const fileRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    function handleClick() {
        fileRef.current?.click();
    }

    const processFile = useCallback((file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target.result);
        };
        reader.readAsDataURL(file);
    }, []);

    function handleFile(e) {
        const file = e.target.files && e.target.files[0];
        processFile(file);
    }

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        processFile(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragActive(false);
    };

    function clearPreview() {
        setPreview(null);
        if (fileRef.current) fileRef.current.value = null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={logo} alt="DSIN logo" />
            </div>

            <aside className={styles.sidebar} />

            <main className={styles.content}>
                <div
                    className={`${styles.card} ${dragActive ? styles.dragOver : ''}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    {preview ? (
                        <>
                            <img src={preview} alt="Preview" className={styles.previewImage} />
                            <div style={{ display: 'flex', gap: 12 }}>
                                <button type="button" className={styles.fillBtn} onClick={clearPreview}>Remover</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2>Faça upload de uma imagem para digitalizar a ocorrência</h2>
                            <p className={styles.subtitle}>ou arraste uma imagem</p>

                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                className={styles.fileInput}
                                onChange={handleFile}
                            />

                            <button type="button" className={styles.uploadBtn} onClick={handleClick}>
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
