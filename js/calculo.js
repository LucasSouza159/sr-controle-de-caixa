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
totalValor.textContent = `R$ ${(
  parseFloat(dinheiroTotal) +
  parseFloat(pixTotal) +
  parseFloat(cartaoTotal) -
  parseFloat(despesasTotal)
).toFixed(2)}`;

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

  totalValor.textContent = `R$ ${
    parseFloat(dinheiroTotal) +
    parseFloat(pixTotal) +
    parseFloat(cartaoTotal) -
    parseFloat(despesasTotal)
  }`;
}

// Adiciona o evento de submit ao formulário
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const valor = parseFloat(
    document.getElementById("valor").value.replace(",", ".")
  );
  const formaPagamento = document.querySelector(
    'input[name="pagamento"]:checked'
  ).value;

if(isNaN(valor)){
  alert("Você digitou uma letra. Digite um valor numérico válido.");
  return;
}
  
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

// Download de beckup em TXT
function downloadTxtFile() {
  // Coletar dados
  let data = [
    `Dinheiro ==> ${dinheiroTotal}\nCartão ==> ${cartaoTotal}\nPix ==> ${pixTotal}\nDespesas ==> ${despesasTotal}\n\nValor Total ==> ${totalValor.textContent}`,
  ];

  // Criar objeto Blob
  let blob = new Blob([data], { type: "text/plain;charset=utf-8" });

  // Criar link de download
  let link = document.createElement("a");
  link.download = "arquivo.txt";
  link.href = window.URL.createObjectURL(blob);
  link.style.display = "none";
  document.body.appendChild(link);

  // Clicar no link para iniciar o download
  link.click();
}

// Adiciona o evento de clique ao botão de resetar
resetarBtn.addEventListener("click", function () {
  Swal.fire({
    title: "Você tem certeza?",
    text: "Essa ação irá apagar todos os valores salvos!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, resetar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      downloadTxtFile();
      dinheiroTotal = 0;
      pixTotal = 0;
      cartaoTotal = 0;
      despesasTotal = 0;

      atualizaLocalStorage();
      atualizaTabela();
      Swal.fire("Valores resetados!", "", "success");
    }
  });
});

// função para ocultamento do valor total na página
const toggleEye = document.getElementById("toggleEye");
const eyeIcon = document.getElementById("eyeIcon");

let isTotalVisible = true;

toggleEye.addEventListener("click", function () {
  if (isTotalVisible) {
    totalValor.style.visibility = "hidden";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  } else {
    totalValor.style.visibility = "visible";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  }

  isTotalVisible = !isTotalVisible;
});
