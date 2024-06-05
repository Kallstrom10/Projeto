document.addEventListener('DOMContentLoaded', () => {
  fetch('/comentarios')
    .then(response => response.json())
    .then(data => {
      const comentariosContainer = document.getElementById('comentarios');
      data.forEach(comentario => {
        const card = document.createElement('div');
        card.classList.add('comentarios-card');
        card.innerHTML = `
          <strong><p>ID do comentário: ${comentario.id} | Tema: ${comentario.tema}</p></strong>
          <p>${comentario.comentario}</p>
          <p>Comentado por: <strong id="strong">${comentario.primeiro_nome} ${comentario.ultimo_nome}</p></strong>
          <button onclick="editarComentarios(${comentario.id})">Editar</button>
          <button id="del" onclick="deletarComentarios(${comentario.id})">Deletar</button>
        `;
        comentariosContainer.appendChild(card);
      });
    });
});


  // function editarComentarios(id) {
  //   // Lógica para editar usuário
  //   const comentarioNovo = prompt('Novo comentário:');
  
  //   fetch(`/comentarios/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ comentario: comentarioNovo })
  //   })
  //     .then(response => response.text())
  //     .then(data => {
  //       alert(data);
  //       window.location.reload();
  //     });
  // }

  function editarComentarios(id) {
    // Solicitar os dados atuais do usuário
    fetch(`/comentarios/${id}`)
      .then(response => response.json())
      .then(comentario => {
        // Preencher os prompts com os dados atuais do usuário
        const novoComentario = prompt('Novo comentário:', comentario.comentario);
  
        // Enviar os dados editados para o servidor
        fetch(`/comentarios/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ comentario: novoComentario })
        })
        .then(response => response.text())
        .then(data => {
          alert(data);
          window.location.reload();
        });
      })
      .catch(error => {
        console.error('Erro ao buscar os dados do cometário:', error);
        alert('Não foi possível carregar os dados do comentário.');
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
  