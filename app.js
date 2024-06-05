const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const session = require('express-session');
const json = require('json');

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
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'Pagina Inicial', 'index.html'));
});

app.get('/Pagina%20Inicial/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'Pagina Inicial', 'index.html'));
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

app.get('/comentarios/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'comentarios', 'index.html'));
});

app.get('/Dock%20Staion/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'Dock Staion', 'index.html'));
});

app.get('/Hubs%20vs%20Switches/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'Hubs vs Switches', 'index.html'));
});

app.get('/intoL%20EVO/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'intoL EVO', 'index.html'));
});

app.get('/Login/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'Login', 'index.html'));
});

app.get('/Processadores%20intoL/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'Processadores intoL', 'index.html'));
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
    res.sendFile(path.join(__dirname, 'views', 'users', 'Pagina Inicial', 'index.html'));
});

app.get('/listar-newsletter/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'listar-newsletter', 'index.html'));
});

app.get('/newsletter/listar/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'newsletter', 'listar', 'index.html'));
});

app.get('/listar-comentarios/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users', 'listar-comentarios', 'index.html'));
});

app.get('/listar-usuarios/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'users', 'listar-usuarios', 'index.html'));
});

app.get('/editar-usuario/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'users', 'editar-usuario', 'index.html'));
});


// ----------------------------- ROTAS ---------------------------------

/// Rota para lidar com o login
app.post('/Login', (req, res) => {
    const { email, senha } = req.body;

    const sql = 'select id, primeiro_nome from usuarios where email = ? and senha = ?';
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

  // Listar usuários
  app.get('/usuarios', (req, res) => {
    const sql = 'select * from usuarios';
    connection.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

// Rota para obter dados do usuário por ID
app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'select * from usuarios where id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ error: 'Usuário não encontrado' });
    } else {
      res.json(result[0]);
    }
  });
});

  // Atualizar usuários
  app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { primeiro_nome, ultimo_nome, email, senha } = req.body;
    const sql = 'UPDATE usuarios SET primeiro_nome = ?, ultimo_nome = ?, email = ?, senha = ? where id = ?';
    connection.query(sql, [primeiro_nome, ultimo_nome, email, senha, id], (err, result) => {
      if (err) throw err;
      res.send('Usuário atualizado com sucesso!');
    });
  });
  
  // Deletar usuário
  app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE from usuarios where id = ?';
    connection.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.send('Usuário deletado com sucesso!');
    });
  });
  


// NEWSLETTER   
app.post('/newsletter', (req, res) => {
  const { email } = req.body;
  console.log('Dados recebidos:', req.body); // Log para verificar os dados recebidos

  // Verificar se o email já está em uso
  let sql = 'select id from newsletter where email = ?';
  connection.query(sql, [email], (err, results) => {
      if (err) {
          console.error('Erro ao buscar Email do usuário: ' + err.stack);
          return res.status(500).send('Erro ao realizar o cadastro.');
      }

      if (results.length > 0) {
          return res.status(400).send('E-mail já está cadastrado.');
      }

      // Inserir Email do newsletter no banco de dados
      const sql = 'insert into newsletter (email) values (?)';
      connection.query(sql, [email], (err, result) => {
          if (err) {
              console.error('Erro ao inserir email ao newsletter: ' + err.stack);
              return res.status(500).send('Erro ao realizar o cadastro.');
          }
          console.log('Email cadastrado com sucesso!');
          
          res.redirect('/');
      });
  });
});

  // Listar Email do newsletter
  app.get('/newsletter', (req, res) => {
    const sql = 'select * from newsletter';
    connection.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  // Rota para pegar o email do newsletter por ID
  app.get('/newsletter/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'select * from newsletter where id = ?';
    connection.query(sql, [id], (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.status(404).json({ error: 'Email não encontrado' });
      } else {
        res.json(result[0]);
      }
    });
  });

  // Atualizar Email do newsletter
  app.put('/newsletter/:id', (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    const sql = 'UPDATE newsletter SET email = ? where id = ?';
    connection.query(sql, [email, id], (err, result) => {
      if (err) throw err;
      res.send('Email do newsletter atualizado com sucesso!');
    });
  });
  
  // Deletar Email do newsletter
  app.delete('/newsletter/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE from newsletter where id = ?';
    connection.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.send('Email do newsletter deletado com sucesso');
    });
  });
  

// Rota para lidar com o envio do comentário sobre um tema
app.post('/comentarios', (req, res) => {
    const { tema, comentario } = req.body;
    const usuarioId = req.session.userId;

    if (!usuarioId) {
        return res.status(401).send('Usuário não autenticado.');
    }

    const sql = 'insert into comentarios_temas (usuario_id, tema, comentario) values (?, ?, ?)';
    connection.query(sql, [usuarioId, tema, comentario], (err, result) => {
        if (err) {
            console.error('Erro ao inserir comentário sobre tema: ' + err.stack);
            return res.status(500).send('Erro ao salvar o comentário.');
        }
        console.log('Comentário sobre tema inserido com sucesso!');
        res.redirect('/comentarios/index.html');
    });
});

// Rota para obter comentários com dados dos usuários
app.get('/comentarios', (req, res) => {
  const sql = 'select comentarios_temas.id, comentarios_temas.tema, comentarios_temas.comentario, usuarios.primeiro_nome, usuarios.ultimo_nome from comentarios_temas JOIN usuarios ON comentarios_temas.usuario_id = usuarios.id';
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Rota pra pegar comentários por ID
app.get('/comentarios/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'select * from comentarios_temas where id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ error: 'Cometário não encontrado' });
    } else {
      res.json(result[0]);
    }
  });
});

  // Atualizar comentário
  app.put('/comentarios/:id', (req, res) => {
    const { id } = req.params;
    const { comentario } = req.body;
    const sql = 'UPDATE comentarios_temas SET comentario = ? where id = ?';
    connection.query(sql, [comentario, id], (err, result) => {
      if (err) throw err;
      res.send('Comentário atualizado com sucesso');
    });
  });
  
  // Deletar comentário
  app.delete('/comentarios/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE from comentarios_temas where id = ?';
    connection.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.send('Comentário deletado com sucesso');
    });
  });
  

// Rota para lidar com o envio do formulário de comentários sobre o site
// app.post('/Coment%C3%A1rios-site', (req, res) => {
//     const {  comentario } = req.body;

    // // Verificar se o Email do newsletter já existe no banco de dados
    // let sql = 'select id from newsletter where email = ?';
    // connection.query(sql, [email], (err, results) => {
    //     if (err) {
    //         console.error('Erro ao buscar Email do newsletter: ' + err.stack);
    //         return res.status(500).send('Erro ao salvar o comentário.');
    //     }

    //     let id_usuario;
    //     if (results.length > 0) {
    //         id_usuario = results[0].id;
    //     } else {
    //         // Se o Email do newsletter não existe, inseri-lo no banco de dados
    //         sql = 'insert into newsletter (nome, email) values (?, ?)';
    //         connection.query(sql, [nome, email], (err, result) => {
    //             if (err) {
    //                 console.error('Erro ao inserir Email do newsletter: ' + err.stack);
    //                 return res.status(500).send('Erro ao salvar o comentário.');
    //             }
        //         id_usuario = result.insertId;
        //     });
        // }

        // Inserir comentário sobre o site no banco de dados
    //     sql = 'insert into comentarios_site (comentario) values (?)';
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
    console.log('Dados recebidos:', req.body); // Log para verificar os dados recebidos

    // Verificar se o email já está em uso
    let sql = 'select id from usuarios where email = ?';
    connection.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Erro ao buscar Email do usuário: ' + err.stack);
            return res.status(500).send('Erro ao realizar o cadastro.');
        }

        if (results.length > 0) {
            return res.status(400).send('E-mail já está em uso.');
        }

        // Inserir Email do newsletter no banco de dados
        const sql = 'insert into usuarios (primeiro_nome, ultimo_nome, email, senha) values (?, ?, ?, ?)';
        connection.query(sql, [primeiro_nome, ultimo_nome, email, senha], (err, result) => {
            if (err) {
                console.error('Erro ao inserir o email do usuário: ' + err.stack);
                return res.status(500).send('Erro ao realizar o cadastro.');
            }
            console.log('Usuário cadastrado com sucesso!');
            
            res.redirect('/Login/index.html');
        });
    });
});


// ----------------------------- ROTAS ---------------------------------

const port = 3500;
app.listen(port, () => {
    console.log(`Servidor ligado e rodando na porta ${port}, em http://localhost:${port}.`);
});