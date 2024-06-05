document.addEventListener('DOMContentLoaded', () => {
    fetch('/usuarios')
      .then(response => response.json())
      .then(data => {
        const usuariosContainer = document.getElementById('usuarios');
        data.forEach(usuario => {
          const card = document.createElement('div');
          card.classList.add('usuario-card');
          card.innerHTML = `
            <strong><p>ID do usuário: ${usuario.id}</p></strong>     
            <p id="strong1">${usuario.primeiro_nome} ${usuario.ultimo_nome}</p>
            <p>${usuario.email}</p>
            <button onclick="editarUsuario(${usuario.id})">Editar</button>
            <button id="del" onclick="deletarUsuario(${usuario.id})">Deletar</button>
          `;
          usuariosContainer.appendChild(card);
        });
      });
  });
  
  // function editarUsuario(id) {
  //   // Lógica para editar usuário
  //   const novoNome = prompt('Novo nome:');
  //   const novoSobrenome = prompt('Novo sobrenome:');
  //   const novoEmail = prompt('Novo email:');
  //   const novaSenha = prompt('Nova senha:');
  
  //   fetch(`/usuarios/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ primeiro_nome: novoNome, ultimo_nome: novoSobrenome, email: novoEmail, senha: novaSenha })
  //   })
  //     .then(response => response.text())
  //     .then(data => {
  //       alert(data);
  //       window.location.reload();
  //     });
  // }
  
  function editarUsuario(id) {
  // Solicitar os dados atuais do usuário
  fetch(`/usuarios/${id}`)
    .then(response => response.json())
    .then(usuario => {
      // Preencher os prompts com os dados atuais do usuário
      const novoNome = prompt('Novo nome:', usuario.primeiro_nome);
      const novoSobrenome = prompt('Novo sobrenome:', usuario.ultimo_nome);
      const novoEmail = prompt('Novo email:', usuario.email);
      const novaSenha = prompt('Nova senha:', usuario.senha);

      // Enviar os dados editados para o servidor
      fetch(`/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ primeiro_nome: novoNome, ultimo_nome: novoSobrenome, email: novoEmail, senha: novaSenha })
      })
      .then(response => response.text())
      .then(data => {
        alert(data);
        window.location.reload();
      });
    })
    .catch(error => {
      console.error('Erro ao buscar os dados do usuário:', error);
      alert('Não foi possível carregar os dados do usuário.');
    });
}

  function deletarUsuario(id) {
    fetch(`/usuarios/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        window.location.reload();
      });
  }
  