import express from 'express'
import { Request, Response } from 'express';
import {
    GoogleGenAI,
    Type,
} from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();
const app = express()

app.post('/gemini', async (req: Request, res: Response) => {
    const imagem = req.body
    async function main() {
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });
        const config = {
            temperature: 0,
            thinkingConfig: {
                thinkingBudget: -1,
            },
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                required: ["numero_multa", "logradouro_rua", "logradouro_bairro", "logradouro_referencia", "placa_carro"],
                properties: {
                    numero_multa: {
                        type: Type.NUMBER,
                    },
                    logradouro_rua: {
                        type: Type.STRING,
                    },
                    logradouro_bairro: {
                        type: Type.STRING,
                    },
                    logradouro_referencia: {
                        type: Type.STRING,
                    },
                    logradouro_cruzamento: {
                        type: Type.BOOLEAN,
                    },
                    logradouro_cruzamento_rua: {
                        type: Type.STRING,
                    },
                    placa_carro: {
                        type: Type.STRING,
                    },
                },
            },
            systemInstruction: [
                {
                    text: `você é um interpretador de imagem, que responde somente com objeto de saída, qualquer outra operação devera responder FAIL`,
                }
            ],
        };
        const model = 'gemini-2.5-flash';
        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        text: `${imagem}`,
                    },
                ],
            },
        ];

        const response = await ai.models.generateContentStream({
            model,
            config,
            contents,
        });
        let fileIndex = 0;
        for await (const chunk of response) {
            console.log(chunk.text);
        }
    }
    app.listen(3000, async () => {
        main()
    })


})

