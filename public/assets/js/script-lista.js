document.addEventListener('DOMContentLoaded', () => {
    fetch('/usuarios')
      .then(response => response.json())
      .then(data => {
        const usuariosContainer = document.getElementById('usuarios');
        data.forEach(usuario => {
          const card = document.createElement('div');
          card.classList.add('usuario-card');
          card.innerHTML = `
            <p>${usuario.primeiro_nome} ${usuario.ultimo_nome}</p>
            <p>${usuario.email}</p>
            <button onclick="editarUsuario(${usuario.id})">Editar</button>
            <button id="del" onclick="deletarUsuario(${usuario.id})">Deletar</button>
          `;
          usuariosContainer.appendChild(card);
        });
      });
  });
  
  function editarUsuario(id) {
    // Lógica para editar usuário
    const novoNome = prompt('Novo nome:');
    const novoSobrenome = prompt('Novo sobrenome:');
    const novoEmail = prompt('Novo email:');
    const novaSenha = prompt('Nova senha:');
  
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
  