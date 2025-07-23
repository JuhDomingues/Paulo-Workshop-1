

const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear o corpo das requisições
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Index.html'));
});

// Rota para receber os dados do formulário e enviar para o Make.com
app.post('/inscrever', async (req, res) => {
    const { name, email, phone } = req.body;
    const webhookUrl = 'https://hook.us2.make.com/gqj7odnb2g5x85r5i2wxen978lndhhqw';

    try {
        await axios.post(webhookUrl, {
            name,
            email,
            phone
        });
        console.log('Inscrição enviada para o Make.com:', { name, email, phone });
        // Redireciona para a página de obrigado
        res.redirect('/obrigado.html');
    } catch (error) {
        console.error('Erro ao enviar para o Make.com:', error.message);
        res.status(500).send('Ocorreu um erro ao processar sua inscrição.');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

