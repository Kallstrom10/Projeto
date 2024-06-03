document.addEventListener('DOMContentLoaded', () => {
    fetch('/comentarios')
      .then(response => response.json())
      .then(data => {
        const comentariosContainer = document.getElementById('comentarios');
        data.forEach(comentarios => {
          const card = document.createElement('div');
          card.classList.add('comentarios-card');
          card.innerHTML = `
            <p>${comentarios.comentario}</p>
            <button onclick="editarComentarios(${comentarios.id})">Editar</button>
            <button id="del" onclick="deletarComentarios(${comentarios.id})">Deletar</button>
          `;
          comentariosContainer.appendChild(card);
        });
      });
  });
  
  function editarComentarios(id) {
    // Lógica para editar usuário
    const comentarioNovo = prompt('Novo comentário:');
  
    fetch(`/comentarios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comentario: comentarioNovo })
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        window.location.reload();
      });
  }
  
  function deletarComentarios(id) {
    fetch(`/comentarios/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        window.location.reload();
      });
  }
  