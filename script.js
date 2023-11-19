var jogadores = [];

var botaoAdicionar = document.getElementById("botaoAdicionar");
botaoAdicionar.addEventListener("click", nomeJogador);

var botaoLimparPontos = document.getElementById("botaoLimpar");
botaoLimparPontos.addEventListener("click", zeroPontos);

var botaoLimparTudo = document.getElementById("limparTudo");
botaoLimparTudo.addEventListener("click", limparTudo);

//************************************************
//FUNÇÃO PARA CLASSIFICAR NOVOS JOGADORES

function nomeJogador() {
  var novoNome = document.getElementById("inserirNome").value;
  var novoIcon = document.getElementById("inserirIcon").value;

  if (novoNome != "") {
    var jogadoresDetalhes = {
      icone: novoIcon,
      nome: novoNome,
      vitoria: 0,
      empate: 0,
      derrota: 0,
      pontos: 0
    };
    jogadores.push(jogadoresDetalhes);
    limparInput();
    exibirNaTela();
  } else {
    alert("Insira um nome");
  }
}

//************************************************
//FUNÇÃO PARA LIMPAR INPUTS

function limparInput() {
  document.getElementById("inserirNome").value = "";
  document.getElementById("inserirIcon").value = "";
}

function zeroPontos() {
  for (var i = 0; i < jogadores.length; i++) {
    jogadores[i].vitoria = 0;
    jogadores[i].empate = 0;
    jogadores[i].derrota = 0;
    jogadores[i].pontos = 0;
  }
  exibirNaTela();
}

var elementoTabela = document.getElementById("tabelaJogadores");

exibirNaTela();

//************************************************
//FUNÇÃO PARA INICIAR

function exibirNaTela() {
  elementoTabela.innerHTML = "";

  for (var i = 0; i < jogadores.length; i++) {
    criarElementosTabela(jogadores[i]);
  }
}

//************************************************
//FUNÇÃO PRINCIPAL

function criarElementosTabela(jogador) {
  var tableRow = document.createElement("tr");

  var tdIcon = document.createElement("td");
  var icon = document.createElement("img");
  icon.classList.add("icone");
  icon.src = jogador.icone;

  tdIcon.appendChild(icon);
  tableRow.appendChild(tdIcon);

  var tdNome = document.createElement("td");
  tdNome.textContent = jogador.nome;
  tableRow.appendChild(tdNome);

  var tdVitoria = document.createElement("td");
  tdVitoria.textContent = jogador.vitoria;
  tableRow.appendChild(tdVitoria);

  var tdEmpate = document.createElement("td");
  tdEmpate.textContent = jogador.empate;
  tableRow.appendChild(tdEmpate);

  var tdDerrota = document.createElement("td");
  tdDerrota.textContent = jogador.derrota;
  tableRow.appendChild(tdDerrota);

  var tdPontos = document.createElement("td");
  tdPontos.textContent = jogador.pontos;
  tableRow.appendChild(tdPontos);

  //************************************************
  //COLUNA DE AÇÕES - BOTÕES

  var tdBotaoVitoria = document.createElement("td");
  var botaoVitoria = document.createElement("button");
  botaoVitoria.classList.add("botao_acao");
  botaoVitoria.textContent = "Vitória";
  botaoVitoria.onclick = function () {
    if (jogadores.length < 2) {
      alert("Adicione ao menos mais um jogador");
    } else {
      adicionarVitoria(jogador);
    }
  };
  tdBotaoVitoria.appendChild(botaoVitoria);

  var tdBotaoEmpate = document.createElement("td");
  var botaoEmpate = document.createElement("button");
  botaoEmpate.classList.add("botao_acao");
  botaoEmpate.textContent = "Empate";
  botaoEmpate.onclick = function () {
    if (jogadores.length < 2) {
      alert("Adicione ao menos mais um jogador");
    } else {
      var nomeJogador = prompt(
        "Digite o nome do Jogador em que houve o empate"
      );
      if (nomeJogador !== null) {
        var jogadorEncontrado = jogadores.find(function (jogador) {
          return jogador.nome === nomeJogador;
        });
      }
      if (jogadorEncontrado) {
        adicionarEmpate(jogadorEncontrado);
        adicionarEmpate(jogador);
        exibirNaTela();
      } else {
        alert("Jogador Não Encontrado!");
      }
    }
  };

  tdBotaoEmpate.appendChild(botaoEmpate);

  var tdBotaoExcluir = document.createElement("td");
  var botaoExcluir = document.createElement("button");
  botaoExcluir.classList.add("botao_acao");
  botaoExcluir.textContent = "Excluir";
  botaoExcluir.onclick = function () {
    tirarJogador(jogador);
  };

  tdBotaoExcluir.appendChild(botaoExcluir);

  tableRow.appendChild(tdBotaoVitoria);
  tableRow.appendChild(tdBotaoEmpate);
  tableRow.appendChild(tdBotaoExcluir);

  elementoTabela.appendChild(tableRow);
}

//************************************************
//FUNÇÃO DE AÇÕES DOS BOTÕES

function adicionarVitoria(jogador) {
  jogador.vitoria++;
  jogador.pontos = jogador.pontos + 3;
  for (var i = 0; i < jogadores.length; i++) {
    if (jogadores[i] !== jogador) {
      jogadores[i].derrota++;
      jogadores[i].pontos += 0;
      exibirNaTela();
    }
  }
}

function adicionarEmpate(jogador) {
  jogador.empate++;
  jogador.pontos++;

  exibirNaTela();
}

function tirarJogador(jogador) {
  var index = jogadores.indexOf(jogador); //procura o index do jogador naquela linha
  jogadores.splice(index, 1);
  exibirNaTela();
}

function limparTudo() {
  jogadores = [];
  exibirNaTela();
}