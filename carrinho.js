// ===============================
// LUMINE JOIAS - CARRINHO PROFISSIONAL
// ===============================

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function atualizarContador() {
  const totalItens = carrinho.reduce((acc, item) => acc + item.qtd, 0);
  const el = document.getElementById("cart-count");
  if (el) el.innerText = totalItens;
}

function adicionarCarrinho(nome, preco, imagem) {
  const itemExistente = carrinho.find(item => item.nome === nome);

  if (itemExistente) {
    itemExistente.qtd += 1;
  } else {
    carrinho.push({
      nome: nome,
      preco: Number(preco),
      imagem: imagem,
      qtd: 1
    });
  }

  salvarCarrinho();
  atualizarContador();
  alert("Produto adicionado ao carrinho!");
}

function removerItem(index) {
  carrinho.splice(index, 1);
  salvarCarrinho();
  renderCarrinho();
  atualizarContador();
}

function alterarQtd(index, acao) {
  if (acao === "mais") {
    carrinho[index].qtd += 1;
  } else if (acao === "menos") {
    if (carrinho[index].qtd > 1) {
      carrinho[index].qtd -= 1;
    }
  }

  salvarCarrinho();
  renderCarrinho();
  atualizarContador();
}

function renderCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  const totalEl = document.getElementById("total");

  if (!lista || !totalEl) return;

  lista.innerHTML = "";

  let totalGeral = 0;

  if (carrinho.length === 0) {
    lista.innerHTML = "<p>Seu carrinho está vazio.</p>";
    totalEl.innerText = "Total: R$ 0,00";
    return;
  }

  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.qtd;
    totalGeral += subtotal;

    lista.innerHTML += `
      <div class="item-carrinho">
        <img src="${item.imagem}" alt="${item.nome}">
        <div class="item-carrinho-info">
          <h4>${item.nome}</h4>
          <p>Valor unitário: R$ ${item.preco.toFixed(2).replace(".", ",")}</p>

          <div class="qtd-controle">
            <button onclick="alterarQtd(${index}, 'menos')">-</button>
            <span>${item.qtd}</span>
            <button onclick="alterarQtd(${index}, 'mais')">+</button>
          </div>

          <p><strong>Subtotal: R$ ${subtotal.toFixed(2).replace(".", ",")}</strong></p>

          <button class="remover-btn" onclick="removerItem(${index})">Remover</button>
        </div>
      </div>
    `;
  });

  totalEl.innerText = "Total: R$ " + totalGeral.toFixed(2).replace(".", ",");
}

function enviarWhats() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let mensagem = "Olá! Gostaria de finalizar meu pedido na Lumine Joias.%0A%0A";
  let totalGeral = 0;

  carrinho.forEach(item => {
    const subtotal = item.preco * item.qtd;
    totalGeral += subtotal;

    mensagem += `• ${item.nome}%0A`;
    mensagem += `Qtd: ${item.qtd}%0A`;
    mensagem += `Valor unitário: R$ ${item.preco.toFixed(2).replace(".", ",")}%0A`;
    mensagem += `Subtotal: R$ ${subtotal.toFixed(2).replace(".", ",")}%0A%0A`;
  });

  mensagem += `Total do pedido: R$ ${totalGeral.toFixed(2).replace(".", ",")}`;

  const telefone = "5512978135300";
  const link = `https://wa.me/${telefone}?text=${mensagem}`;

  window.open(link, "_blank");
}

function limparCarrinho() {
  carrinho = [];
  salvarCarrinho();
  renderCarrinho();
  atualizarContador();
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarContador();
  renderCarrinho();
});
