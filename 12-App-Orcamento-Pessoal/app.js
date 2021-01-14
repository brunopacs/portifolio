class Despesa {
  constructor (ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano,
    this.mes = mes,
    this.dia = dia,
    this.tipo = tipo,
    this.descricao = descricao,
    this.valor = valor
  }
}

class Bd {
  constructor () {
    let id = localStorage.getItem('id');
    if ( id === null) {
      localStorage.setItem('id', 0);
    }
  }
  getProximoId () {
    let proximoId = localStorage.getItem('id');
    return (parseInt(proximoId) + 1);
  }
  gravar(d) {
    let id = this.getProximoId();
    localStorage.setItem(id, JSON.stringify(d));
    localStorage.setItem('id', id)
  }
  recuperarTodosRegistros () {
    // array despesas
    let despesas = [];
    let id = localStorage.getItem("id");
    // recuperar todas as depesas
    for (let i = 1; i <= id; i++) {
      let despesa = JSON.parse(localStorage.getItem(i));
      if (despesa === null) {
        continue;
      }
      despesa.id = i;
      despesas.push(despesa);
    }
    return despesas;
  }
  pesquisar (despesa) {
    let despesasFiltradas = [];
    despesasFiltradas = this.recuperarTodosRegistros();
    // ano
    if (despesa.ano !== "") {
      despesasFiltradas = despesasFiltradas.filter(d => d.ano === despesa.ano);
    }
    // mes
    if (despesa.mes !== "") {
      despesasFiltradas = despesasFiltradas.filter(d => d.mes === despesa.mes);
    }
    // dia
    if (despesa.dia !== "") {
      despesasFiltradas = despesasFiltradas.filter(d => d.dia === despesa.dia);
    }
    // tipo
    if (despesa.tipo !== "") {
      despesasFiltradas = despesasFiltradas.filter(d => d.tipo === despesa.tipo);
    }
    // descricao
    if (despesa.descricao !== "") {
      despesasFiltradas = despesasFiltradas.filter(d => d.descricao === despesa.descricao);
    }
    // valor
    if (despesa.valor !== "") {
      despesasFiltradas = despesasFiltradas.filter(d => d.valor === despesa.valor);
    }
    return despesasFiltradas;
  }
  remover (id) {
    localStorage.removeItem(id);
  }
}

let bd = new Bd();

function cadastrarDespesa () {
  let ano = document.getElementById("ano");
  let mes = document.getElementById("mes");
  let dia = document.getElementById("dia");
  let tipo = document.getElementById("tipo");
  let descricao = document.getElementById("descricao");
  let valor = document.getElementById("valor");

  if (ano.value === "") {
    window.alert("Ano informado invalido");
    return;
  }
  if (mes.value === "") {
    window.alert("Mês informado invalido");
    return;
  }
  if (dia.value === "" || dia.value < 1 || dia.value > 31) {
    window.alert("Dia informado invalido");
    return;
  }
  if (tipo.value === "") {
    window.alert("Tipo de despesa informada invalida");
    return;
  }
  if (descricao.value === "") {
    window.alert("Insira uma descrição para a despesa");
    return;
  }
  if (valor.value === "") {
    window.alert("Insira um valor para a despesa");
    return;
  }
  let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value);
  bd.gravar(despesa);
  alert("Despesa cadastrada com sucesso.");
  ano.value = "";
  mes.value = "";
  dia.value = "";
  tipo.value = "";
  descricao.value = "";
  valor.value = "";
}

function carregaListaDespesas (despesas = [], filtro = false) {
  if (despesas.length === 0 && filtro === false) {
    despesas = bd.recuperarTodosRegistros();
  } 

  let listaDespesas = document.getElementById("listaDespesas");

  listaDespesas.innerHTML = "";

  despesas.forEach(function(d) {
    var tipo;
    switch (parseInt(d.tipo)) {
      case 1:
        tipo = "Alimentação";
        break;
      case 2:
        tipo = "Educação";
        break;
      case 3:
        tipo = "Lazer";
        break;
      case 4:
        tipo = "Saúde";
        break;
      case 5:
        tipo = "Transporte";
        break;      
    }
    // criando a linha (tr)
    let linha = listaDespesas.insertRow();
    // criar as colunas (td)
    linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;
    linha.insertCell(1).innerHTML = tipo;
    linha.insertCell(2).innerHTML = d.descricao;
    linha.insertCell(3).innerHTML = d.valor;
    let btn = document.createElement("button");
    btn.className = "btn btn-danger"
    btn.innerHTML = "<i class='fas fa-times'></i>"
    btn.id = "id_despesa_" +d.id;
    btn.onclick = function () {
      // remover a despesa
      let id = this.id.replace("id_despesa_", "");
      bd.remover(id);
      window.location.reload()
    }
    linha.insertCell(4).append(btn);
  })
}

function pesquisarDespesa () {  
  let ano = document.getElementById("ano").value;
  let mes = document.getElementById("mes").value;
  let dia = document.getElementById("dia").value;
  let tipo = document.getElementById("tipo").value;
  let descricao = document.getElementById("descricao").value;
  let valor = document.getElementById("valor").value;

  let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);

  let despesas = bd.pesquisar(despesa);

  carregaListaDespesas(despesas, true);
}