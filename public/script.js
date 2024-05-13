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

  // Verifica se a posição vertical da tela é maior ou igual a 200 pixels
  if (window.scrollY >= 750) {
    habilidadesContainer.style.transition = "opacity 1s ease, transform 2s ease"; // Adiciona uma transição de 0.5 segundos
    habilidadesContainer.style.opacity = "1"; // Define a opacidade para 1 para mostrar suavemente   
    habilidadesContainer.style.transform = "translateX(0)"; // Move a habilidade da direita para a posição original
  } else {
    habilidadesContainer.style.transition = "opacity 1s ease, transform 3s ease"; // Remove a transição se a posição vertical não atender à condição
    habilidadesContainer.style.opacity = "0"; // Define a opacidade para 0 para esconder
    habilidadesContainer.style.transform = "translateX(100%)"; // Move a habilidade para fora da tela (direita)
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
  fetch('https://portfolio-3ka4ipe26a-uw.a.run.app/ImgBtn')
    .then(resp => resp.json())
    .then(data => {
      const minhaDiv = document.getElementById("minhaDiv");
      data.forEach((imgBtn, index) => { //A IMAGEM E A POSIÇÃO DA MESMAaaa
        const button = document.createElement("button");
        button.classList.add('btn_modal');
        const imagePath = imgBtn.imagem.replace(/\\/g, '/');
        button.style.backgroundImage = `url(${imagePath})`;
        button.addEventListener('click', function () {
          buscarProjetoPorIndex(index); //associar cada botão de imagem ao projeto correspondente pelo índice na matriz de projetos. 
          //Chama função e passa posição da imagem que associa a posição do projeto
          //teste bild
        });
        minhaDiv.appendChild(button);
      });
    })
    .catch(error => console.error('Erro ao buscar imagens:', error));
}
function buscarProjetoPorIndex(index) {// buscar o projeto correspondente com base nesse índice (ONDEM DE ADIÇÃO)
  fetch('https://portfolio-3ka4ipe26a-uw.a.run.app/projeto')
    .then(resp => resp.json())
    .then(data => {
      const projeto = data[index];
      projeto.video = projeto.video.replace(/\\/g, '/');
      exibirDetalhesDoProjeto(projeto);
    })
    .catch(error => console.error('Erro ao buscar detalhes do projeto:', error));
}
function exibirDetalhesDoProjeto(projeto) {
  console.log("Caminho do vídeo:", projeto.video); // Adiciona um console.log para depurar o caminho do vídeo
  const videoElement = document.createElement('video');
  videoElement.classList = 'video_Element';
  // Corrige o caminho do vídeo
  videoElement.src = projeto.video;
  videoElement.controls = true; //controles de reprodução ao vídeo
  const tituloElement = document.createElement('h2');
  tituloElement.textContent = projeto.titulo;
  const descricaoElement = document.createElement('p');
  descricaoElement.textContent = projeto.descricao;
  // Add elemento de vídeo, título e descrição ao modal
  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = '';
  modalContent.appendChild(tituloElement);
  modalContent.appendChild(descricaoElement);
  modalContent.appendChild(videoElement);
  // Exibir o modal
  const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
  modal.show();
}


criarImgBtn();

function enviarFeedback() {//mandando dados form html
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
      document.getElementById("feedbackForm").reset();//Limpar formulario apos evio dos dados
    })
    .catch(error => {
      console.error("erro ao enviar feedback")
    })
}





