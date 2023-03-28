const form = document.getElementById("formDados");
const salvarBtn = document.getElementById("salvar");
const resetarBtn = document.getElementById("resetar");
const totalValor = document.getElementById("total");

// Recupera os dados do localStorage ou inicializa com 0
let dinheiroTotal = localStorage.getItem("dinheiro") || 0;
let pixTotal = localStorage.getItem("pix") || 0;
let cartaoTotal = localStorage.getItem("cartao") || 0;
let despesasTotal = localStorage.getItem("despesas") || 0;

// Atualiza a tabela com os valores recuperados do localStorage
document.getElementById("dinheiro-total").textContent = `R$ ${dinheiroTotal}`;
document.getElementById("pix-total").textContent = `R$ ${pixTotal}`;
document.getElementById("cartao-total").textContent = `R$ ${cartaoTotal}`;
document.getElementById("despesas-total").textContent = `R$ ${despesasTotal}`;

// Atualiza o valor total na página
totalValor.textContent = `R$ ${parseFloat(dinheiroTotal) + parseFloat(pixTotal) + parseFloat(cartaoTotal) - parseFloat(despesasTotal)}`;

// Função para atualizar o localStorage com os novos valores
function atualizaLocalStorage() {
  localStorage.setItem("dinheiro", dinheiroTotal);
  localStorage.setItem("pix", pixTotal);
  localStorage.setItem("cartao", cartaoTotal);
  localStorage.setItem("despesas", despesasTotal);
}

// Função para atualizar a tabela e o valor total na página
function atualizaTabela() {
  document.getElementById("dinheiro-total").textContent = `R$ ${dinheiroTotal}`;
  document.getElementById("pix-total").textContent = `R$ ${pixTotal}`;
  document.getElementById("cartao-total").textContent = `R$ ${cartaoTotal}`;
  document.getElementById("despesas-total").textContent = `R$ ${despesasTotal}`;

  totalValor.textContent = `R$ ${parseFloat(dinheiroTotal) + parseFloat(pixTotal) + parseFloat(cartaoTotal) - parseFloat(despesasTotal)}`;
}

// Adiciona o evento de submit ao formulário
form.addEventListener("submit", function(event) {
  event.preventDefault();

  const valor = parseFloat(document.getElementById("valor").value);
  const formaPagamento = document.querySelector('input[name="pagamento"]:checked').value;

  switch (formaPagamento) {
    case "dinheiro":
      dinheiroTotal = parseFloat(dinheiroTotal) + valor;
      break;
    case "pix":
      pixTotal = parseFloat(pixTotal) + valor;
      break;
    case "cartao":
      cartaoTotal = parseFloat(cartaoTotal) + valor;
      break;
    case "despesa":
      despesasTotal = parseFloat(despesasTotal) + valor;
      break;
    default:
      break;
  }

  atualizaLocalStorage();
  atualizaTabela();
});

// Adiciona o evento de clique ao botão de resetar
resetarBtn.addEventListener("click", function() {
  dinheiroTotal = 0;
  pixTotal = 0;
  cartaoTotal = 0;
  despesasTotal = 0;

  atualizaLocalStorage();
  atualizaTabela();
});
