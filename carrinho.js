
// Lumine Joias - carrinho.js
let cart = JSON.parse(localStorage.getItem('lj_cart')||'[]');

function updateCartBadge(){
  const el = document.getElementById('cart-count');
  if(el) el.textContent = cart.length;
}

function addToCart(name, price=''){
  cart.push({name, price});
  localStorage.setItem('lj_cart', JSON.stringify(cart));
  updateCartBadge();
  alert(name + ' adicionado ao carrinho');
}

function clearCart(){
  cart = [];
  localStorage.setItem('lj_cart', JSON.stringify(cart));
  updateCartBadge();
  alert('Carrinho limpo');
}

function finalizeOrder(){
  if(cart.length===0){ alert('Seu carrinho está vazio'); return; }
  const phone = '5512978135300';
  let text = 'Olá, gostaria de finalizar minha compra na Lumine Joias.%0A%0AItens:%0A';
  cart.forEach((it, idx)=>{
    text += `- ${it.name} ${it.price?('- R$ '+it.price):''}%0A`;
  });
  text += '%0AMuito obrigado!';
  const url = `https://wa.me/${phone}?text=${text}`;
  window.open(url,'_blank');
}
updateCartBadge();
