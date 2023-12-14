let listaProjetos = [
  {
    "video": "./video/VdeoCloneNubank.mp4",
    "nome": "Clone Interface Nubank",
    "descricao": " Desenvolvi este projeto com o objetivo de criar uma reprodução fiel da interface principal do Nubank, focando principalmente no aprimoramento das minhas habilidades no frontend. Utilizei JavaScript puro e Node.js para interação e criação dinâmica de elementos, além de explorar a inspeção detalhada dos mesmos. A incorporação de frameworks como Bootstrap e Sass contribuiu significativamente para a melhoria da experiência de desenvolvimento. Este projeto é autoral e foi desenvolvido de forma autônoma, refletindo o meu comprometimento e dedicação ao aprimoramento constante das minhas habilidades.",
  },
  {
    "video": "./video/React.mp4",
    "nome": "Gerenciador de Projetos",
    "descricao": " O projeto tem como objetivo principal um gerenciador de projetos, foi produzido com react e node.js, para se trabalhar com um backend fake.Projeto responviso.  O que mais me motivou a escolhe-lo foi a funcionalidade de gestão de custos, que permite a diminuição e soma dos valores associados a cada serviço adicionado no projeto, proporcionando um controle efetivo do custo total do mesmo. Essa abordagem prática enriqueceu minha compreensão sobre a importância da gestão financeira em projetos de desenvolvimento.Adicionalmente, incluí de forma autônoma uma seção dedicada às tarefas no projeto, visando aprimorar ainda mais o uso de componentes em React. Essa adição permitiu- me consolidar os conhecimentos adquiridos e aplicar, de maneira prática, os conceitos aprendidos durante o desenvolvimento do projeto.Além disso, explorei a implementação de operações CRUD para garantir a eficácia na manipulação de dados.Projeto hoje está rodando localmente, fico a disposição para compartilha - lo, e os comando estaram no github."
}
]
// criando a estrutura de repetição

listaProjetos.map((projeto, posicao) => {//parametros (PROJETO, POSICAO) => vão receber ..
  let cardProjetos = document.getElementById("cards");
  cardProjetos.innerHTML += `
  <div class="col-md-6 mb-3 ">
      <div class="card"  id="cards">
      <video id="meuVideo" src=${projeto.video}  controls></video>
      <div class="card-body">
      <h5 class="card-title">${projeto.nome}</h5>
     
      <a href="#" class="btn btn-primary" onclick="zoomImagem('${posicao}'); return false;"><i class="bi bi-search"></i>    Saiba mais</a>
  </div>
  </div>
</div>
  `
})

function zoomImagem(posicao) {//vai verificar qual é a posição que a função onliclick está mandando
  let selecaoCards = listaProjetos[posicao];
  document.getElementById("nomeProjeto").innerHTML = selecaoCards.nome;
  document.getElementById("descricaoProjeto").innerHTML = selecaoCards.descricao


  new bootstrap.Modal("#zoom").show(); // ativa modals

}



//add (feedback)
//firebase
//LEMBRAR! DOM usado para garantir que o script JavaScript seja executado somente quando todo o conteúdo HTML da página foi totalmente carregado
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('user-form');
  const feedbackInput = document.getElementById('feedback');
  const userList = document.getElementById('user-list');

  // Configurar Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyD41ic8pREhHZR3nFcvUF7V37jTRBVE83c",
    authDomain: "portfoliofeedback-c6c5b.firebaseapp.com",
    projectId: "portfoliofeedback-c6c5b",
    storageBucket: "portfoliofeedback-c6c5b.appspot.com",
    messagingSenderId: "883771026161",
    appId: "1:883771026161:web:fe6713c6f7206b4a6d9750"
  };

  firebase.initializeApp(firebaseConfig);

  const database = firebase.database();

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = feedbackInput.value;

    // Adicionar feedback ao Firebase
    database.ref('usuarios').push({
      name: name
    })
      .then(() => {
        const listItem = document.createElement('li');
        listItem.textContent = name;
        userList.appendChild(listItem);
        feedbackInput.value = '';
      })
      .catch(error => console.error('Erro:', error));
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const userForm = document.getElementById('user-form');
  const feedbackInput = document.getElementById('feedback'); // Corrigido para 'feedback'

  userForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o envio do formulário

    const name = feedbackInput.value; // Corrigido para 'feedback'
    if (name) {
      try {
        // Faz uma solicitação POST para adicionar o feedback ao banco de dados
        const response = await fetch('https://portfoliofeedback-c6c5b-default-rtdb.firebaseio.com/feedbacks.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        });

        if (response.status >= 200 && response.status < 300) {
          // O feedback foi adicionado com sucesso ao banco de dados
          alert("Feedback adicionado com sucesso")
          console.log('Feedback adicionado com sucesso:', name);
        } else {
          console.error('Erro ao adicionar o feedback:', response.status);
        }
      } catch (error) {
        console.error('Erro durante a requisição:', error);
      }
    }

    feedbackInput.value = ''; // Limpa o campo de entrada (feedback)
  });
});


//eventos para timeline + setas
document.addEventListener('DOMContentLoaded', function () {
  const timeline = document.getElementById('timeline');
  const arrowLeft = document.querySelector('.arrow-left');
  const arrowRight = document.querySelector('.arrow-right');

  let scrollAmount = 0;

  // Manipulação de eventos da linha do tempo
  const events = [
    { imgSrc: './img/html.png' },
    { imgSrc: './img/css.png' },
    { imgSrc: './img/bootstrap.png' },
    { imgSrc: './img/sass.png' },
    { imgSrc: './img/js.png' },
    { imgSrc: './img/node.js.png' },
    { imgSrc: './img/react.png' },
    { imgSrc: './img/kotlin.png' },



    // Adicione mais eventos conforme necessário
  ];
  //recuperando dados da const events, e add via js de forma dinâmica
  events.forEach(event => {
    const eventElement = document.createElement('div');
    eventElement.classList.add('event');
    eventElement.innerHTML = `<img src="${event.imgSrc}">`;
    timeline.appendChild(eventElement);
  });

  // Manipulação de setas
  arrowLeft.addEventListener('click', function () {
    scrollAmount -= 200;
    timeline.scrollLeft = scrollAmount;
  });

  arrowRight.addEventListener('click', function () {
    scrollAmount += 200;
    timeline.scrollLeft = scrollAmount;
  });
});

const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
let currentTheme = "light";

themeToggle.addEventListener("click", () => {
  if (currentTheme === "light") {
    document.body.classList.add("dark-theme");
    themeIcon.classList.remove("bi-moon");
    themeIcon.classList.add("bi-sun");
    currentTheme = "dark";
  } else {
    document.body.classList.remove("dark-theme");
    themeIcon.classList.remove("bi-sun");
    themeIcon.classList.add("bi-moon");
    currentTheme = "light";
  }
});

window.addEventListener("scroll", () => {
  console.log("Scrolling:", window.scrollY);

  if (window.scrollY > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

// evento de clique ao botão para rolar suavemente para o topo
scrollToTopBtn.addEventListener("click", () => {
  console.log("Botão de volta ao topo clicado");

  // Lógica para rolar suavemente para o topo da página
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});





