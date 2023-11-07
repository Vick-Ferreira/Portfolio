const scrollToTopBtn = document.getElementById("scrollToTopBtn");

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
let currentTheme = "light";

themeToggle.addEventListener("click", () => {
  if (currentTheme === "light") {
    document.body.classList.add("dark-theme"); // Adicione uma classe para alternar para o tema escuro
    themeIcon.classList.remove("bi-moon"); // Remove o ícone da lua
    themeIcon.classList.add("bi-sun"); // Adiciona o ícone do sol
    currentTheme = "dark";
  } else {
    document.body.classList.remove("dark-theme"); // Remova a classe para voltar ao tema claro
    themeIcon.classList.remove("bi-sun"); // Remove o ícone do sol
    themeIcon.classList.add("bi-moon"); // Adiciona o ícone da lua
    currentTheme = "light";
  }
});


//add botão de volta ao topo apos rolagem
window.addEventListener("scroll", () => {//referencia de tela
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

scrollToTopBtn.addEventListener("click", () => {
  document.body.scrollTop = 0; // Para navegadores mais antigos
  document.documentElement.scrollTop = 0; // Para navegadores modernos
});

let listaProjetos = [
    {
        "video": "./video/um.mp4",
        "nome": "Nubank",
    
    },
    {
        "video": "./imagem/1.png",
        "nome": "Nubank",
   

    },
    {
        "video": "./imagem/1.png",
        "nome": "Nubank",
   

    },
    {
        "video": "./imagem/1.png",
        "nome": "Nubank",
   

    },
    {
        "video": "./imagem/1.png",
        "nome": "Nubank",
     

    },
    {
        "video": "./imagem/1.png",
        "nome": "Nubank",
      

    },
    
]


// criando a estrutura de repetição

listaProjetos.map((projeto, posicao)=>{//parametros (PROJETO, POSICAO) => vão receber ..
    let cardProjetos = document.getElementById("cards");
    cardProjetos.innerHTML += `
    <div class="col-md-6 mb-3 ">
        <div class="card"  id="cards">
        <video id="meuVideo" src="${projeto.video}"  controls></video>
        <div class="card-body">
        <h5 class="card-title">"${projeto.nome}"</h5>
        <a href="#" class="btn btn-primary" onclick="zoomImagem('${posicao}'); return false;"><i class="bi bi-search"></i>    Saiba mais</a>
    </div>
    </div>
</div>
    `
})

function zoomImagem (posicao){//vai verificar qual é a posição que a função onliclick está mandando
    let selecaoCards = listaProjetos[posicao];
    document.getElementById("nomeProjeto").innerHTML = selecaoCards.nome;
    document.getElementById("nomeProjeto").innerHTML - selecaoCards.descricao
    

    new bootstrap.Modal("#zoom").show(); // ativa modals
    
}


  //solicitação fetch para CardCards'  (Segudno grupo de cards com rolagem horizontas (setas teclado))
  fetch('https://json-seven-gules.vercel.app/cardCards')
  .then((resp) => resp.json())
  .then((data) => {
    const CardCards = data.CardCards; 
    function renderizarCardCards() {
      const containerCardCards = document.getElementById('CardCards'); 
       //evento de click , setando setas do teclado, para manipular movimento de cards
      containerCardCards.setAttribute('tabindex', '0');
      containerCardCards.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
          containerCardCards.scrollLeft -= 50; 
        } else if (event.key === 'ArrowRight') {
          containerCardCards.scrollLeft += 50; // 
        }
      });
  
      data.forEach((item) => {
  
        const cartao = document.createElement('div');
        cartao.className = 'cartao';
  
        const imagem = document.createElement('img');
        imagem.src = item.img; 
        imagem.className = 'img';
     
  
        const sub = document.createElement('h5');
        sub.textContent = item.sub;
        sub.className = 'sub';
  
        const descricao = document.createElement('p');
        descricao.textContent = item.conteudo;
        descricao.className = 'conteudoG';
        descricao.style.fontWeight = '500';
  
        const link = document.createElement('a');
        link.href = item.link;
        link.textContent = 'Ler artigo';
        link.className = 'link';
  
        
        const icone = document.createElement('i');
        icone.className = 'icone';
        icone.innerHTML = '<i class="bi bi-arrow-up-right"></i>'; 
  
        
      
      
        cartao.appendChild(imagem);
        cartao.appendChild(sub);
        cartao.appendChild(descricao);
        cartao.appendChild(link);
        cartao.appendChild(icone);
  
        containerCardCards.appendChild(cartao);
      });
    }
  
    //  função para renderizar os cartões
    renderizarCardCards(CardCards);
  })
  .catch((error) => {
    console.error('Erro durante a requisição:', error);
  });
  