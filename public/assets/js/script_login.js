document.getElementById('loginPage').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    console.log('Dados do formulário:', { email: email, senha: senha });

    // Criar um objeto FormData para enviar os dados como form-urlencoded
    var dadosLogin = new FormData();
    dadosLogin.append('email', email);
    dadosLogin.append('senha', senha);

    // Usar fetch para enviar os dados
    fetch('/Login', {
        method: 'POST',
        body: dadosLogin
    })
    .then(response => response.text())
    .then(data => {
        console.log('Resposta do servidor:', data);
    })
    .catch((error) => {
        console.error('Erro:', error);
    });
});
