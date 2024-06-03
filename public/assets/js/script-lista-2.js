document.addEventListener('DOMContentLoaded', () => {
    fetch('/newsletter')
      .then(response => response.json())
      .then(data => {
        const newsletterContainer = document.getElementById('newsletter');
        data.forEach(newsletter => {
          const card = document.createElement('div');
          card.classList.add('newsletter-card');
          card.innerHTML = `
            <p>${newsletter.email}</p>
            <button onclick="editarNewsletter(${newsletter.id})">Editar</button>
            <button id="del" onclick="deletarNewsletter(${newsletter.id})">Deletar</button>
          `;
          newsletterContainer.appendChild(card);
        });
      });
  });
  
  function editarNewsletter(id) {
    // Lógica para editar usuário
    const novoEmail = prompt('Novo email:');
  
    fetch(`/newsletter/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: novoEmail })
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        window.location.reload();
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
  