// =================================
// ========= MUDANÇA DE TEMA =========

let rotacao = 0;

function girarImagem(btn) {
  const img = btn.querySelector("img");
  
  // Incrementa a rotação
  rotacao += 180;
  
  // Aplica a rotação com transição suave
  img.style.transform = `rotate(${rotacao}deg)`;
}

function mudarTema(){
  document.body.classList.toggle("tema_escuro");
  // Call trocarImagemLogo after toggling the theme
  trocarImagemLogo();
}


function trocarImagemLogo() {
  const img = document.querySelector('header .logo img'); // Select the specific image within the header logo
  // Check if the body has the 'tema_escuro' class
  if (document.body.classList.contains("tema_escuro")) {
    img.src = "md.png"; // Replace with your dark theme logo path
  } else {
    img.src = "md2.png"; // Original logo for the light theme
  }
}


// =====================================
// ========= ROLAGEM DA PAGINA =========

console.log('Script carregado - iniciando animação de scroll');

const myObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            console.log('Elemento visível:', entry.target.id);
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
});

const elements = document.querySelectorAll('.hidden');
console.log('Elementos encontrados:', elements.length);

if (elements.length > 0) {
    elements.forEach((el) => {
        console.log('Observando elemento:', el.id);
        myObserver.observe(el);
    });
} else {
    console.log('Nenhum elemento com classe "hidden" encontrado');
}







