document.addEventListener('DOMContentLoaded', () => {
    fetch('/newsletter')
      .then(response => response.json())
      .then(data => {
        const newsletterContainer = document.getElementById('newsletter');
        data.forEach(newsletter => {
          const card = document.createElement('div');
          card.classList.add('newsletter-card');
          card.innerHTML = `
            <strong><p>ID do email: ${newsletter.id}</p></strong>
            <p id="strong1">${newsletter.email}</p> <br>
            <button onclick="editarNewsletter(${newsletter.id})">Editar</button>
            <button id="del" onclick="deletarNewsletter(${newsletter.id})">Deletar</button>
          `;
          newsletterContainer.appendChild(card);
        });
      });
  });
  
  // function editarNewsletter(id) {
  //   // Lógica para editar usuário
  //   const novoEmail = prompt('Novo email:');
  
  //   fetch(`/newsletter/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ email: novoEmail })
  //   })
  //     .then(response => response.text())
  //     .then(data => {
  //       alert(data);
  //       window.location.reload();
  //     });
  // }

  function editarNewsletter(id) {
    // Solicitar os dados atuais do usuário
    fetch(`/newsletter/${id}`)
      .then(response => response.json())
      .then(newsletter => {
        // Preencher os prompts com os dados atuais do usuário
        const novoNewsletter = prompt('Novo email:', newsletter.email);
  
        // Enviar os dados editados para o servidor
        fetch(`/newsletter/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: novoNewsletter })
        })
        .then(response => response.text())
        .then(data => {
          alert(data);
          window.location.reload();
        });
      })
      .catch(error => {
        console.error('Erro ao buscar os dados do email:', error);
        alert('Não foi possível carregar os dados do email.');
      });
  }
  
  function deletarNewsletter(id) {
    fetch(`/newsletter/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        window.location.reload();
      });
  }
  