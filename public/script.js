const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
let currentTheme = "light";
//logica troca tema
themeToggle.addEventListener("click", () => {
  if (currentTheme === "light") {
    document.body.classList.add("dark-theme");
    themeIcon.classList.remove("bi-moon");
    themeIcon.classList.add("bi-sun");
    currentTheme = "dark";
    console.log("Tema alterado para escuro");
  } else {
    document.body.classList.remove("dark-theme");
    themeIcon.classList.remove("bi-sun");
    themeIcon.classList.add("bi-moon");
    currentTheme = "light";
    console.log("Tema alterado para claro");
  }
});
// Função para verificar a posição das habilidades ao rolar a página
function verificarPosicaoHabilidades() {
  const habilidadesContainer = document.getElementById('skills');

  // Verifica se a posição vertical da tela é maior ou igual a 750 pixels
  if (window.scrollY >= 750) {
    habilidadesContainer.classList.add('mostrar-habilidades'); // Adiciona a classe para mostrar as habilidades
  } else {
    habilidadesContainer.classList.remove('mostrar-habilidades'); // Remove a classe para esconder as habilidades
  }
}

// Evento de rolagem da página para chamar a função verificarPosicaoHabilidades
window.addEventListener('scroll', verificarPosicaoHabilidades);


// Função para mostrar ou ocultar o botão de voltar ao topo conforme a rolagem
function verificarPosicaoBotaoTopo() {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (window.scrollY > 200) { // Altura em que o botão de voltar ao topo deve aparecer
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}
// Função para rolar suavemente para o topo da página
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
// Evento de clique no botão de voltar ao topo para rolar suavemente para o topo
document.getElementById("scrollToTopBtn").addEventListener("click", scrollToTop);
verificarPosicaoBotaoTopo();
window.addEventListener('scroll', verificarPosicaoBotaoTopo);// Adiciona eventos de rolagem para chamar as funções de verificação de posição


function criarImgBtn() {
  fetch('https://portfolio-3ka4ipe26a-uw.a.run.app/imgBtn')
    .then(resp => resp.json())
    .then(data => {
      const minhaDiv = document.getElementById("minhaDiv");
      data.forEach((imgBtn, index) => {
        const button = document.createElement("button");
        button.classList.add('btn_modal');
        const imagePath = imgBtn.imagem.replace(/\\/g, '/');
        button.style.backgroundImage = `url(https://storage.googleapis.com/${imagePath})`;
        button.addEventListener('click', function () {
          buscarProjetoPorIndex(index);
        });
        minhaDiv.appendChild(button);
      });
    })
    .catch(error => console.error('Erro ao buscar imagens:', error));
}

function buscarProjetoPorIndex(index) {
  fetch('https://portfolio-3ka4ipe26a-uw.a.run.app/projeto')
    .then(resp => resp.json())
    .then(data => {
      const projeto = data[index];
      exibirDetalhesDoProjeto(projeto);
    })
    .catch(error => console.error('Erro ao buscar detalhes do projeto:', error));
}


function exibirDetalhesDoProjeto(projeto) {
  console.log("Caminho do vídeo:", projeto.video);
  
  const videoElement = document.createElement('video');
  videoElement.classList = 'video_Element';
  videoElement.src = `https://storage.googleapis.com/${projeto.video}`;
  videoElement.controls = true;

  const tituloElement = document.createElement('h2');
  tituloElement.textContent = projeto.titulo;

  const descricaoElement = document.createElement('p');
  descricaoElement.textContent = projeto.descricao;

  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = '';
  modalContent.appendChild(tituloElement);
  modalContent.appendChild(descricaoElement);
  modalContent.appendChild(videoElement);

  const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
  modal.show();
}

criarImgBtn();

function enviarFeedback() {
  const nome = document.getElementById("nome").value;
  const opiniao = document.getElementById("opiniao").value;
  const feedbackData = {
    nome: nome,
    opiniao: opiniao
  }
  fetch('https://portfolio-3ka4ipe26a-uw.a.run.app/feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(feedbackData)
  })
    .then(resp => resp.json())
    .then(data => {
      alert("Feedback enviado com sucesso! Obrigada!");
      document.getElementById("feedbackForm").reset();
    })
    .catch(error => {
      console.error("Erro ao enviar feedback:", error);
    })
}






