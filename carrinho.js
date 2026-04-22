// ===============================
// CARRINHO PROFISSIONAL LUMINE
// ===============================

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// ADICIONAR PRODUTO
function adicionarCarrinho(nome, preco, imagem) {
  const itemExistente = carrinho.find(item => item.nome === nome);

  if (itemExistente) {
    itemExistente.qtd += 1;
  } else {
    carrinho.push({
      nome,
      preco,
      imagem,
      qtd: 1
    });
  }

  salvarCarrinho();
  atualizarContador();
  alert("Produto adicionado ao carrinho!");
}

// SALVAR
function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// CONTADOR
function atualizarContador() {
  const total = carrinho.reduce((acc, item) => acc + item.qtd, 0);
  const el = document.getElementById("cart-count");
  if (el) el.innerText = total;
}

// REMOVER ITEM
function removerItem(index) {
  carrinho.splice(index, 1);
  salvarCarrinho();
  renderCarrinho();
}

// ALTERAR QUANTIDADE
function alterarQtd(index, tipo) {
  if (tipo === "mais") carrinho[index].qtd++;
  if (tipo === "menos" && carrinho[index].qtd > 1) carrinho[index].qtd--;

  salvarCarrinho();
  renderCarrinho();
}

// RENDERIZAR CARRINHO
function renderCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  const totalEl = document.getElementById("total");

  if (!lista) return;

  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.qtd;
    total += subtotal;

    lista.innerHTML += `
      <div class="item-carrinho">
        <img src="${item.imagem}" alt="${item.nome}">
        <div>
          <h4>${item.nome}</h4>
          <p>R$ ${item.preco.toFixed(2)}</p>

          <div class="qtd">
            <button onclick="alterarQtd(${index}, 'menos')">-</button>
            <span>${item.qtd}</span>
            <button onclick="alterarQtd(${index}, 'mais')">+</button>
          </div>

          <p><strong>Subtotal: R$ ${subtotal.toFixed(2)}</strong></p>
          <button class="remover" onclick="removerItem(${index})">Remover</button>
        </div>
      </div>
    `;
  });

  totalEl.innerText = "Total: R$ " + total.toFixed(2);
}

// ENVIAR PARA WHATSAPP
function enviarWhats() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let mensagem = "Olá! Quero finalizar meu pedido:\n\n";
  let total = 0;

  carrinho.forEach(item => {
    const subtotal = item.preco * item.qtd;
    total += subtotal;

    mensagem += `• ${item.nome}\n`;
    mensagem += `Qtd: ${item.qtd}\n`;
    mensagem += `Valor: R$ ${item.preco.toFixed(2)}\n`;
    mensagem += `Subtotal: R$ ${subtotal.toFixed(2)}\n\n`;
  });

  mensagem += `Total do pedido: R$ ${total.toFixed(2)}`;

  const url = "https://wa.me/5512978135300?text=" + encodeURIComponent(mensagem);
  window.open(url, "_blank");
}

// INICIAR
atualizarContador();
renderCarrinho();
