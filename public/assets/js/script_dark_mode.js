// Função para alternar entre temas claro e escuro e salvar o estado no localStorage
function alternarTema() {
  var elemento = document.getElementById("elemento");
  var temaEscuroAtivado = localStorage.getItem("temaEscuroAtivado");

  // Verifica se o tema escuro está ativado no localStorage
  if (temaEscuroAtivado === "true") {
    // Se estiver ativado, desativa
    elemento.classList.remove("tema-escuro");
    elemento.classList.add("tema-claro");
    localStorage.setItem("temaEscuroAtivado", "false");
  } else {
    // Se não estiver ativado, ativa
    elemento.classList.remove("tema-claro");
    elemento.classList.add("tema-escuro");
    localStorage.setItem("temaEscuroAtivado", "true");
  }
}

// Chama a função para aplicar o tema salvo ao carregar a página
aplicarTemaSalvo();

// Função para aplicar o tema salvo no localStorage ao carregar a página
function aplicarTemaSalvo() {
  var temaEscuroAtivado = localStorage.getItem("temaEscuroAtivado");

  if (temaEscuroAtivado === "true") {
    var elemento = document.getElementById("elemento");
    elemento.classList.remove("tema-claro");
    elemento.classList.add("tema-escuro");
  }
}

/*TEXTO QUE SE AUTODIGITA*/

const element = document.querySelector("#text");
const text = "Subscribe to our news!";
const interval = 150;

function mostarTexto(element, text, interval) {
  
    const char = text.split("").reverse();

    const digitador = setInterval(() => {

      if (!char.length) {
        return clearInterval(digitador);
      }

      const next = char.pop();

      element.innerHTML += next;

    }, interval);

}

mostarTexto(element, text, interval);

/Texto que se autodigita/ 


  
// // Função para scroll suave para o topo da página
// function scrollSuave() {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth" // Isso faz com que o scroll seja suave
//     });
//   }
  
  // Adiciona um evento de clique ao botão para fazer o scroll suave

// Seleciona o botão
// var scrollToTopBtn = document.getElementById("scrollToTopBtn");

// // Adiciona um evento de rolagem à janela
// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   // Se a rolagem for maior que 20 pixels, mostra o botão, caso contrário, esconde-o
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     scrollToTopBtn.style.display = "block";
//   } else {
//     scrollToTopBtn.style.display = "none";
//   }
// }

// // Adiciona um evento de clique ao botão para rolar para o topo
// scrollToTopBtn.addEventListener("click", function() {
//   document.body.scrollTop = 0; // Para navegadores da web
//   document.documentElement.scrollTop = 0; // Para navegadores modernos
// });



// BOTÃO UP

document.addEventListener("DOMContentLoaded", function() {
  // Obtém o botão
  var scrollToTopBtn = document.getElementById("scrollToTopBtn");

  // Adiciona um evento de clique ao botão
  scrollToTopBtn.addEventListener("click", function() {
      // Chama a função scrollToTop() quando o botão é clicado
      scrollToTop();
  });

  // Adiciona um evento de rolagem à página
  window.addEventListener("scroll", function() {
      // Se a pessoa rolou mais que 20 pixels da parte superior da página, mostra o botão
      if (window.scrollY > 20) {
          scrollToTopBtn.style.display = "block";
      } else {
          // Caso contrário, oculta o botão
          scrollToTopBtn.style.display = "none";
      }
  });

  // Função para fazer a página subir suavemente
  function scrollToTop() {        // Anima o scroll até o topo
      window.scrollTo({
          top: 0,
          behavior: "smooth" // Isso faz com que a animação seja suave
      });
  }
});


// MENU MOBILE

var menuIcon = document.querySelector('.menu-icons');
        var menuMobile = document.querySelector('.menu-mobile');
        var iconClose = document.querySelector('.menu-mobile .icon-close');

        menuIcon.addEventListener('click', function(){
            menuMobile.classList.add('ativo'); 
        });

        iconClose.addEventListener('click', function(){
            menuMobile.classList.remove('ativo'); 
        });





