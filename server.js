import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Configurar CORS
app.use(cors());
app.use(express.json());

// Criar diretório de uploads se não existir
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(uploadsDir));

// Configurar multer para upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Apenas imagens são permitidas!'));
        }
    }
});

// Endpoint para upload de imagem
app.post('/api/upload', upload.single('image'), (req, res) => {
    try {
        console.log('Upload recebido:', req.file ? 'Arquivo presente' : 'Nenhum arquivo');

        if (!req.file) {
            return res.status(400).json({ error: 'Nenhum arquivo foi enviado' });
        }

        const imageData = {
            id: Date.now(),
            filename: req.file.filename,
            originalName: req.file.originalname,
            path: `/uploads/${req.file.filename}`,
            size: req.file.size,
            uploadedAt: new Date().toISOString()
        };

        console.log('Upload salvo:', imageData.filename);

        res.json({
            success: true,
            message: 'Imagem enviada com sucesso',
            data: imageData
        });
    } catch (error) {
        console.error('Erro no upload:', error);
        res.status(500).json({ error: 'Erro ao fazer upload da imagem' });
    }
});

// Endpoint para listar todas as imagens
app.get('/api/images', (req, res) => {
    try {
        console.log('Listando imagens da pasta:', uploadsDir);
        const files = fs.readdirSync(uploadsDir);
        console.log('Arquivos encontrados:', files.length);

        const images = files
            .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .map(file => {
                const stats = fs.statSync(path.join(uploadsDir, file));
                return {
                    id: stats.mtimeMs,
                    filename: file,
                    path: `/uploads/${file}`,
                    size: stats.size,
                    uploadedAt: stats.mtime.toISOString()
                };
            })
            .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

        console.log('Imagens retornadas:', images.length);

        res.json({
            success: true,
            data: images
        });
    } catch (error) {
        console.error('Erro ao listar imagens:', error);
        res.status(500).json({ error: 'Erro ao listar imagens' });
    }
});

// Endpoint para deletar uma imagem
app.delete('/api/images/:filename', (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(uploadsDir, filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Imagem não encontrada' });
        }

        fs.unlinkSync(filePath);
        res.json({
            success: true,
            message: 'Imagem deletada com sucesso'
        });
    } catch (error) {
        console.error('Erro ao deletar imagem:', error);
        res.status(500).json({ error: 'Erro ao deletar imagem' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Uploads salvos em: ${uploadsDir}`);
});
