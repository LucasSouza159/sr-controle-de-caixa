function exportarDados() {
    const dadosSalvos = localStorage.getItem('dados');
    if (!dadosSalvos) {
      return;
    }
  
    const dadosArray = JSON.parse(dadosSalvos);
  
    /* cria o objeto workbook */
    const wb = XLSX.utils.book_new();
  
    /* adiciona uma planilha chamada "Dados" */
    const ws = XLSX.utils.json_to_sheet(dadosArray);
    XLSX.utils.book_append_sheet(wb, ws, 'Dados');
  
    /* salva o arquivo */
    XLSX.writeFile(wb, 'dados.xlsx');
  }
  
  document.querySelector('#exportar').addEventListener('click', exportarDados);