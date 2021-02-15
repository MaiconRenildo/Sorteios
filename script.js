//Itens do alerta
var Alerta = document.getElementById('Alerta')
var AlertaElementos = document.getElementById('AlertaElementos')
var botaoAlerta = document.getElementById('botaoAlerta')

////////////////////////////SORTEIO DE NÚMEROS/////////////////////////////////
var botao_numeros = document.getElementById('botao-numeros')
botao_numeros.addEventListener('click', Sorteio_numeros)
function Sorteio_numeros() {
  /*Declaração de variaveis e conversão do conteudo delas de objeto para string*/
  let quantidade_numeros = document.getElementById('quantidade-numeros').value
  let inicio_numeros = document.getElementById('inicio-numeros').value
  let fim_numeros = document.getElementById('fim-numeros').value
  let resultado_numeros = document.getElementById('resultado-numeros')

  /*Verificação de possíveis erros*/
  if (quantidade_numeros == '' || quantidade_numeros==0 || inicio_numeros == '' || fim_numeros == '') {
    abrirAlertas(0,resultado_numeros)
  } else if (quantidade_numeros > (fim_numeros - inicio_numeros)) {
    abrirAlertas(1,resultado_numeros)
  } else {
    resultado_numeros.innerHTML = 'Resultado:&nbsp;'
    /*Conversão das variaveis de string para number*/    
    quantidade_numeros = Number(quantidade_numeros)
    inicio_numeros = Number(inicio_numeros)
    fim_numeros = Number(fim_numeros)
    /*Declaração de novas variaveis*/
    let resposta = []
    let valor = 0
    let c = 0
    while (c < quantidade_numeros) {
      valor = NumeroAleatorio(inicio_numeros, fim_numeros)
      if (resposta.indexOf(valor) == -1) {
        resposta[c] = valor
        c++
      }
    }
    resultado_numeros.style.display = "block"
    resultado_numeros.innerHTML += `${resposta}`
  }
}

////////////////////////////SORTEIO DE NOMES//////////////////////
var botao_nomes = document.getElementById('botao-nomes')
botao_nomes.addEventListener('click', Sorteio_nomes)
function Sorteio_nomes() {
  let quantidade_nomes = document.getElementById('quantidade-nomes').value
  let opcao_nomes = document.getElementById('opcao-nomes').value
  let texto_nomes = document.getElementById('texto-nomes').value
  let resultado_nomes = document.getElementById('resultado-nomes')

  //Variaveis para testes de verificação do separador
  let resultado, tamanho, opcao, test1, test2, test3

  if (quantidade_nomes == '' || quantidade_nomes==0 || texto_nomes == '' || opcao_nomes == 'Selecione uma opção') {
    resultado =''
    abrirAlertas(0,resultado_nomes)
  } else {
    switch (opcao_nomes) {
      case 'opcao1':
        opcao = 1
        //texto_nomes é uma string, por isso não é necessário usar o toString()
        test1 = texto_nomes.search('\n')
        test2 = texto_nomes.search(',')
        test3 = texto_nomes.search(';')
        resultado = texto_nomes.split('\n') //Verifica que o \n é o separador e a partir dessa informação formula um array       
        //resultado é um ARRAY
        //Tamanho recebe o tamanho do resultado
        tamanho = resultado.length
        break;

      case 'opcao2':
        opcao = 2
        test1 = texto_nomes.search('\n')
        test2 = texto_nomes.search(',')
        test3 = texto_nomes.search(';')
        resultado = texto_nomes.split(',')
        tamanho = resultado.length
        break;

      case 'opcao3':
        opcao = 3
        test1 = texto_nomes.search('\n')
        test2 = texto_nomes.search(',')
        test3 = texto_nomes.search(';')
        resultado = texto_nomes.split(';')
        tamanho = resultado.length
        break;
    }
    sem_repeticao=SemRepeticao(resultado,tamanho)
    tamanho = sem_repeticao.length
    //Verificação de possiveis Erros do usuário
    if (
      (opcao == 1 && tamanho <= quantidade_nomes && (test2 == -1 && test3 == -1)) ||
      (opcao == 2 && tamanho <= quantidade_nomes && (test1 == -1 && test3 == -1)) ||
      (opcao == 3 && tamanho <= quantidade_nomes && (test2 == -1 && test1 == -1))
    ) {
      abrirAlertas(1,resultado_nomes)
    } else if (
      (opcao == 1 && ((test1 == -1) || test2 != -1 || test3 != -1)) ||
      (opcao == 2 && ((test2 == -1) || test1 != -1 || test3 != -1)) ||
      (opcao == 3 && ((test3 == -1) || test2 != -1 || test1 != -1))
    ) { 
      abrirAlertas(3,resultado_nomes)
    } else {
      resultado_nomes.innerHTML = `Resultado:&nbsp;`
      Sorteio(resultado_nomes,sem_repeticao,quantidade_nomes)
    }
  }
}

//////////////////////////SORTEIO POR ARQUIVOS
//Seleciona o botao e adiciona o evento click
var botao_arquivo = document.getElementById('botao-arquivo')
botao_arquivo.addEventListener('click', Sorteio_arquivo)

//Seleciona o input file e adiciona o evento onchange
var inputArquivo = document.getElementById('inputArquivo')
inputArquivo.addEventListener('change', function () { RecebeArquivo(this) })

var labelArquivo = document.getElementById('labelArquivo')
var leitorDeArquivo = new FileReader() //Define a variavel como leitor de arquivo

window.onload = function init() {//Executa a função init imediatamente após o carregamento da página
  leitorDeArquivo.onload = modelaConteudo; //O evento modelaConteudo é iniciado quando o arquivo termina de ser lido
}
//Definição das extenções
var fileExtensionTXT = /text.*/;
var fileExtensionCSV = /vnd.ms-excel.*/
var file = ''
function RecebeArquivo(inputFile) {
  file = inputFile.files[0];//Seleciona o arquivo do inputArquivo e salva em file
  //Verifica se o formato do arquivo é compativel
  if (file.type.match(fileExtensionTXT) || file.type.match(fileExtensionCSV)) {
    //Caso haja um resultado anterior, este some da tela
    resultado_arquivo.style.display = 'none'
    //Verifica se o navegador é compatível com os 4 objetos principais da File API
    if (window.File && window.FileList && window.FileReader && window.Blob) {
      console.info('O Navegador é compatível com a API.')
      //Solicita o inicio da leitura do arquivo file
      leitorDeArquivo.readAsText(file)
      labelArquivo.innerHTML = `${file.name}`
    } else {
      console.info('O navegador não é compativel com a API.')
    }
  } else {
    abrirAlertas(4)
    file = ''
  }
}
var semRepeticao = []
let conteudo=[]
function modelaConteudo(evt) {
  conteudo = evt.target.result
  conteudo = conteudo.split('\n').join(',').split(';').join(',').split(',')
  let tamanho = conteudo.length
  semRepeticao=SemRepeticao(conteudo,tamanho)
}
var resultado_arquivo = document.getElementById('resultado-arquivo')
function Sorteio_arquivo() {
  let quantidade_arquivo = document.getElementById('quantidade-arquivo').value
  let tamanho
  if (quantidade_arquivo == '' || quantidade_arquivo==0 || file == '') {
    abrirAlertas(0,resultado_arquivo)
  } else {
    tamanho = semRepeticao.length
    if (tamanho <= quantidade_arquivo) {
      abrirAlertas(1,resultado_arquivo)
    } else {
      Sorteio(resultado_arquivo,semRepeticao,quantidade_arquivo)
    }
  }
}

//////////////////////////Funções separadas
function NumeroAleatorio(a, b) {
  return a + Math.round(Math.random() * (b - a))
}

function fecharAlerta() {
  Alerta.style.display = 'none'
}

function SemRepeticao(elemento,tamanho){
  let sem_repeticao=[]
  console.log(elemento)
  let valor,num
  valor=num=0
  let repeticao=false
  while(valor<tamanho){
    if((sem_repeticao.indexOf(elemento[valor].trim())==-1) &&  elemento[valor]!=0){
      sem_repeticao[num]=elemento[valor].trim()
      num++
    } else if (elemento[valor] == 0) {
    } else {
      repeticao=true
    }
    valor++
  }
  if (repeticao) {
    abrirAlertas(2)
  }
  console.log(sem_repeticao)
  return sem_repeticao
}

function Sorteio(resultado,array,quantidade){
  let num,valor,resultadoSorteio
  num=valor=0
  resultadoSorteio = []
  tamanho=array.length
  
  while (num < (quantidade)) {
    valor = NumeroAleatorio(0, (tamanho - 1))
    if(resultadoSorteio.indexOf(array[valor])==-1){
      resultadoSorteio[num]=array[valor]
      num++
    }
  }
  resultado.style.display = "block"
  resultado.innerHTML = `Resultado: ${resultadoSorteio}`
}

function abrirAlertas(posicao,resultado=''){
  alertas=[`<h1 id='Erro'><i class="fas fa-exclamation-triangle"></i></h1><p>Preencha todos os campos corretamente.</p>`,
  `<h1 id='Erro'><i class="fas fa-exclamation-triangle"></i></h1><p>A quantidade de elementos a serem sorteados deve ser menor que o conjunto de elementos que podem ser sorteados.</p>`,
  `<h1 id='Atencao'>Atenção</h1><p>Elementos repetidos foram encontrados. Para maior eficiência do sorteio os mesmos foram desconsiderados.</p>`,
  `<h1 id='Erro'><i class="fas fa-exclamation-triangle"></i></h1><p>Verifique se o conteúdo da lista está separado corretamente.</p>`,
  `<h1 id='Erro'><i class="fas fa-exclamation-triangle"></i></h1><p>Verifique o formato do Arquivo.</p>`]
  AlertaElementos.innerHTML=alertas[posicao]
  Alerta.style.display = 'block'
  botaoAlerta.addEventListener('click', fecharAlerta)
  if(resultado!=''){
    resultado.style.display='none'
  }
}