import styles from './Upload.module.css';
import logo from '../assets/dsin.svg';
import { useRef } from 'react';

export function Upload({ onBack, onNavigate }) {
    const fileRef = useRef(null);

    function handleClick() {
        fileRef.current?.click();
    }

    function handleFile(e) {
        const file = e.target.files && e.target.files[0];
        if (file) {
            // placeholder: aqui você pode subir o arquivo ou mostrar preview
            console.log('Arquivo selecionado:', file.name);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={logo} alt="DSIN logo" />
            </div>

            <aside className={styles.sidebar} />

            <main className={styles.content}>
                <div className={styles.card}>
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
                </div>

                <div className={styles.bottomText}>
                    <p>Não tem a imagem ou prefere preencher manualmente?</p>
                    <button className={styles.fillBtn} onClick={() => onNavigate?.('form')}>Preencher</button>
                </div>
            </main>
        </div>
    );
}

export default Upload;
