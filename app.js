const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const session = require('express-session')

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'paulinformation'
});

connection.connect();

// Configuração da sessão
app.use(session({
    secret: 'sessao_ativa',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended: true}));
// app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'Página Inicial', 'index.html'));
});

app.get('/Página%20Inicial/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'Página Inicial', 'index.html'));
});

app.get('/About/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'About', 'index.html'));
});

app.get('/Apple%20vs%20Samsung/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'Apple vs Samsung', 'index.html'));
});

app.get('/Cabos%20UTP/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'Cabos UTP', 'index.html'));
});

app.get('/Cadastro/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'Cadastro', 'index.html'));
});

app.get('/Coment%C3%A1rios/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'Comentários', 'index.html'));
});

app.get('/Dock%20Staion/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'Dock Staion', 'index.html'));
});

app.get('/Hubs%20vs%20Switches/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'Hubs vs Switches', 'index.html'));
});

app.get('/INTEL%20EVO/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'INTEL EVO', 'index.html'));
});

app.get('/Login/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'Login', 'index.html'));
});

app.get('/Processadores%20INTEL/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'Processadores INTEL', 'index.html'));
});

app.get('/Roteadores/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'Roteadores', 'index.html'));
});

app.get('/SSD%20vs%20HDD%20vs%20eMMC/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'SSD vs HDD vs eMMC', 'index.html'));
});

app.get('/Tipos%20de%20cabos%20USB/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'Tipos de cabos USB', 'index.html'));
});

app.get('/P%C3%A1gina%20Inicial/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'Página Inicial', 'index.html'));
});

// ----------------------------- ROTAS ---------------------------------

/// Rota para lidar com o login
app.post('/Login', (req, res) => {
    const { email, senha } = req.body;

    const sql = 'SELECT id, primeiro_nome FROM usuarios WHERE email = ? AND senha = ?';
    connection.query(sql, [email, senha], (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário: ' + err.stack);
            return res.status(500).send('Erro ao realizar o login.');
        }

        if (results.length === 0) {
            return res.status(401).send('Usuário ou senha incorretos.');
        }

        // Salvando o ID do usuário na sessão
        req.session.userId = results[0].id;
        req.session.userName = results[0].primeiro_nome;

        res.redirect('/');
    });
});

// Rota para lidar com o envio do comentário sobre um tema
app.post('/Coment%C3%A1rios', (req, res) => {
    const { tema, comentario } = req.body;
    const usuarioId = req.session.userId;

    if (!usuarioId) {
        return res.status(401).send('Usuário não autenticado.');
    }

    const sql = 'INSERT INTO comentarios_temas (usuario_id, tema, comentario) VALUES (?, ?, ?)';
    connection.query(sql, [usuarioId, tema, comentario], (err, result) => {
        if (err) {
            console.error('Erro ao inserir comentário sobre tema: ' + err.stack);
            return res.status(500).send('Erro ao salvar o comentário.');
        }
        console.log('Comentário sobre tema inserido com sucesso!');
        res.redirect('/Coment%C3%A1rios');
    });
});

// Rota para lidar com o envio do formulário de comentários sobre o site
// app.post('/Coment%C3%A1rios-site', (req, res) => {
//     const {  comentario } = req.body;

    // // Verificar se o usuário já existe no banco de dados
    // let sql = 'SELECT id FROM usuarios WHERE email = ?';
    // connection.query(sql, [email], (err, results) => {
    //     if (err) {
    //         console.error('Erro ao buscar usuário: ' + err.stack);
    //         return res.status(500).send('Erro ao salvar o comentário.');
    //     }

    //     let id_usuario;
    //     if (results.length > 0) {
    //         id_usuario = results[0].id;
    //     } else {
    //         // Se o usuário não existe, inseri-lo no banco de dados
    //         sql = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';
    //         connection.query(sql, [nome, email], (err, result) => {
    //             if (err) {
    //                 console.error('Erro ao inserir usuário: ' + err.stack);
    //                 return res.status(500).send('Erro ao salvar o comentário.');
    //             }
        //         id_usuario = result.insertId;
        //     });
        // }

        // Inserir comentário sobre o site no banco de dados
    //     sql = 'INSERT INTO comentarios_site (comentario) VALUES (?)';
    //     connection.query(sql, [comentario], (err, result) => {
    //         if (err) {
    //             console.error('Erro ao inserir comentário sobre o site: ' + err.stack);
    //             return res.status(500).send('Erro ao salvar o comentário.');
    //         }
    //         console.log('Comentário sobre o site inserido com sucesso!');
    //         res.redirect('/');
    //     });
    // });



/// Rota para lidar com o envio do formulário de cadastro
app.post('/Cadastro', (req, res) => {
    const { primeiro_nome, ultimo_nome, email, senha } = req.body;

    // Verificar se o email já está em uso
    let sql = 'SELECT id FROM usuarios WHERE email = ?';
    connection.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário: ' + err.stack);
            return res.status(500).send('Erro ao realizar o cadastro.');
        }

        if (results.length > 0) {
            return res.status(400).send('E-mail já está em uso.');
        }

        // Inserir usuário no banco de dados
        const sql = 'INSERT INTO usuarios (primeiro_nome, ultimo_nome, email, senha) VALUES (?, ?, ?, ?)';
        connection.query(sql, [primeiro_nome, ultimo_nome, email, senha], (err, result) => {
            if (err) {
                console.error('Erro ao inserir usuário: ' + err.stack);
                return res.status(500).send('Erro ao realizar o cadastro.');
            }
            console.log('Usuário cadastrado com sucesso!');
            
            res.redirect('/Login');
        });
    });
});


// ----------------------------- ROTAS ---------------------------------

const port = 3500;
app.listen(port, () => {
    console.log(`Servidor ligado e rodando na porta ${port}, em http://localhost:${port}.`);
});