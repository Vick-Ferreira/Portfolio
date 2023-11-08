
document.addEventListener('DOMContentLoaded', () => {
  const userForm = document.getElementById('user-form');
  const nameInput = document.getElementById('name');
  
  userForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o envio do formulário

    const name = nameInput.value;

    if (name) {
      try {
        // Faz uma solicitação POST para adicionar o usuário ao banco de dados
        const response = await fetch('https://json-portfolio-alpha.vercel.app/usuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        });

        if (response.status === 201) {
          // O usuário foi adicionado com sucesso ao banco de dados
          console.log('Usuário adicionado com sucesso:', name);
        } else {
          console.error('Erro ao adicionar o usuário:', response.status);
        }
      } catch (error) {
        console.error('Erro durante a requisição:', error);
      }
    }

    nameInput.value = ''; // Limpa o campo de entrada
  });
});































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
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('user-form');
    const nameInput = document.getElementById('name');
    const userList = document.getElementById('user-list');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const name = nameInput.value;
  
      fetch('https://json-clone-nu.vercel.app/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
      })
        .then(response => response.json())
        .then(data => {
          const listItem = document.createElement('li');
          listItem.textContent = data.name;
          userList.appendChild(listItem);
          nameInput.value = '';
        })
        .catch(error => console.error('Erro:', error));
    });
  });
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






