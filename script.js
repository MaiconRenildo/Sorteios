//SORTEIO DE NÚMEROS
var botao_numeros=document.getElementById('botao-numeros')
botao_numeros.addEventListener('click',Sorteio_numeros)
function Sorteio_numeros(){
    /*Declaração de variaveis e conversão do conteudo delas de objeto para string*/
    let quantidade_numeros=document.getElementById('quantidade-numeros').value
    let inicio_numeros=document.getElementById('inicio-numeros').value
    let fim_numeros=document.getElementById('fim-numeros').value
    let resultado_numeros=document.getElementById('resultado-numeros')
     
/*Verificação de possíveis erros*/
if(quantidade_numeros=='' || inicio_numeros=='' || fim_numeros==''){
    alert('Erro!! Preencha devidamente todos os campos.')
    resultado_numeros.style.display='none'
}else if(quantidade_numeros>(fim_numeros-inicio_numeros)){
    alert('Erro!! A quantidade de elementos a serem sorteados deve ser menor que o conjunto de elementos que podem ser sorteados')
    resultado_numeros.style.display='none'
}else{
    resultado_numeros.innerHTML='Resultado:&nbsp;'
    /*Conversão das variaveis de string para number*/
    quantidade_numeros=Number(quantidade_numeros)
    inicio_numeros=Number(inicio_numeros)
    fim_numeros=Number(fim_numeros)
    /*Declaração de novas variaveis*/
    let resposta=[]
    let valor=0
    let c=0
    while(c<quantidade_numeros){
        valor=square(inicio_numeros,fim_numeros)
        if(resposta.indexOf(valor)==-1){
            resposta[c]=valor
            c++
        }
    }
    resultado_numeros.style.display= "block"
    resultado_numeros.innerHTML+=`${resposta}`
}
}

//SORTEIO DE NOMES
var botao_nomes=document.getElementById('botao-nomes')
botao_nomes.addEventListener('click',Sorteio_nomes)
function Sorteio_nomes(){
let quantidade_nomes=document.getElementById('quantidade-nomes').value
let opcao_nomes=document.getElementById('opcao-nomes').value
let texto_nomes=document.getElementById('texto-nomes').value
let resultado_nomes=document.getElementById('resultado-nomes')

//Variaveis para testes de verificação do separador
let resultado, tamanho, opcao, test1, test2, test3

if(quantidade_nomes=='' || texto_nomes=='' || opcao_nomes=='Selecione uma opção'){
    alert('Erro!! Preencha todos os campos corretamente')
    resultado==''
    resultado_nomes.style.display= "none"
}else{
    switch(opcao_nomes){
        case 'opcao1': 
        opcao=1
         //texto_nomes é uma string, por isso não é necessário usar o toString()
        test1=texto_nomes.search('\n')
        test2=texto_nomes.search(',')
        test3=texto_nomes.search(';')
        resultado=texto_nomes.split('\n') //Verifica que o \n é o separador e a partir dessa informação formula um array       
        //resultado é um ARRAY
        //Tamanho recebe o tamanho do resultado
        tamanho=resultado.length
        break;

        case 'opcao2': //OK
        opcao=2
        test1=texto_nomes.search('\n')
        test2=texto_nomes.search(',')
        test3=texto_nomes.search(';')
        resultado=texto_nomes.split(',')
        tamanho=resultado.length
        break;

        case 'opcao3': //OK
        opcao=3
        test1=texto_nomes.search('\n')
        test2=texto_nomes.search(',')
        test3=texto_nomes.search(';')
        resultado=texto_nomes.split(';')
        tamanho=resultado.length
        break; 
    }
    let sem_repeticao=[]
    let valor=0
    let num=0
    let repeticao=0
    while(valor<tamanho){
        if((sem_repeticao.indexOf(resultado[valor])==-1) && resultado[valor]!=0){
            sem_repeticao[num]=resultado[valor]
            num++
            valor++
        }else if(resultado[valor]==0){
            valor++
        }else{    
            repeticao++
            valor++
        }
    }
    if(repeticao>0){
        alert('Elementos repetidos foram encontrados. Para maior eficiência do sorteio os mesmos são desconsiderados.')
    }
    tamanho=sem_repeticao.length
    //Verificação de possiveis Erros do usuário
    if(
        (opcao==1 && tamanho<=quantidade_nomes && (test2==-1 && test3==-1)) ||
        (opcao==2 && tamanho<=quantidade_nomes && (test1==-1 && test3==-1)) ||
        (opcao==3 && tamanho<=quantidade_nomes && (test2==-1 && test1==-1))
            ){
            alert('Erro!! A quantidade de elementos a serem sorteados deve ser menor que o conjunto de elementos que podem ser sorteados')
            resultado_nomes.style.display= "none"
    }else if(
        (opcao==1 && (( test1==-1) || test2!=-1 || test3!=-1))||
        (opcao==2 && (( test2==-1) || test1!=-1 || test3!=-1))||
        (opcao==3 && ((test3==-1) ||  test2!=-1 || test1!=-1))
            ){ //OK
                alert('Erro!! Verifique se o conteúdo da lista está separado corretamente.')
    }else{
        resultado_nomes.innerHTML=`Resultado:&nbsp;`
        /*Conversão das variaveis de string para number*/
        quantidade_nomes=Number(quantidade_nomes)
        /*Declaração de novas variaveis*/
        num=0
        valor=0
        let valoresSorteados=[]
        let resultadoSorteio=[]
        

        while(num<(quantidade_nomes)){
            valor=square(0,(tamanho-1))
            if(valoresSorteados.indexOf(valor)==-1 ){
                valoresSorteados[num]=valor
                resultadoSorteio[num]=sem_repeticao[valoresSorteados[num]]
                num++
            }
        }
        resultado_nomes.style.display= "block"
        resultado_nomes.innerHTML+=`${resultadoSorteio}`
    }
}
}

//SORTEIO POR ARQUIVOS
//Seleciona o botao e adiciona o evento click
var botao_arquivo=document.getElementById('botao-arquivo')
botao_arquivo.addEventListener('click',Sorteio_arquivo)

//Seleciona o input file e adiciona o evento onchange
var inputArquivo=document.getElementById('inputArquivo')
inputArquivo.addEventListener('change',function(){RecebeArquivo(this) })

var labelArquivo=document.getElementById('labelArquivo')
var leitorDeArquivo=new FileReader() //Define a variavel como leitor de arquivo

window.onload=function init(){//Executa a função init imediatamente após o carregamento da página
leitorDeArquivo.onload=modelaConteudo; //O evento modelaConteudo é iniciado quando o arquivo termina de ser lido
}

//Definição das extenções
var fileExtensionTXT =/text.*/;
var fileExtensionCSV=/vnd.ms-excel.*/
var file=''
function RecebeArquivo(inputFile) {
file = inputFile.files[0];//Seleciona o arquivo do inputArquivo e salva em file
//Verifica se o formato do arquivo é compativel
if(file.type.match(fileExtensionTXT) || file.type.match(fileExtensionCSV) ){
    //Caso haja um resultado anterior, este some da tela
    resultado_arquivo.style.display='none'
    //Verifica se o navegador é compatível com os 4 objetos principais da File API
    if(window.File && window.FileList && window.FileReader && window.Blob){
        console.info('O Navegador é compatível com a API')
        //Solicita o inicio da leitura do arquivo file
        leitorDeArquivo.readAsText(file)
        labelArquivo.innerHTML=`${file.name}`
    }else{
        console.info('O navegador não é compativel com a API')
        }
}else{
    alert('Verifique o formato do Arquivo')
    file=''
}
}
var semRepeticao=[]
function modelaConteudo(evt){
let conteudo=evt.target.result
conteudo=conteudo.split('\n').join(',').split(';').join(',').split(',')
let tamanho=conteudo.length

let valor=0
let num=0
let repeticao=0
//Zera novamente para evitar possíveis erros
semRepeticao=[]
while(valor<tamanho){
    if((semRepeticao.indexOf(conteudo[valor].trim())==-1) && conteudo[valor]!=0){
        semRepeticao[num]=conteudo[valor].trim()//.trim() remove possíveis espaços em branco desnecessários
        num++
        valor++
    }else if(conteudo[valor]==0){
        valor++
    }else{
        repeticao++
        valor++
    }    
}
if(repeticao>0){
    alert('Elementos repetidos foram encontrados. Para maior eficiência do sorteio os mesmos serão desconsiderados.')
    }
}
var resultado_arquivo=document.getElementById('resultado-arquivo')
function Sorteio_arquivo(){
let quantidade_arquivo=document.getElementById('quantidade-arquivo').value
let tamanho
//let inputArquivo=document.getElementById('inputArquivo')//??????
if(quantidade_arquivo=='' || file==''){ 
    alert('Erro! Preencha todos os campos')
}else{  
    tamanho=semRepeticao.length
    if(tamanho<=quantidade_arquivo){
        alert('Erro! A quantidade de elementos a serem sorteados deve ser menor que o total do conteudo')
    }else{
        let num=0,valor=0
        let valoresSorteados=[]
        let resultadoSorteio=[]
        
        while(num<(quantidade_arquivo)){
            valor=square(0,(tamanho-1))
            if(valoresSorteados.indexOf(valor)==-1 ){
                valoresSorteados[num]=valor
                resultadoSorteio[num]=semRepeticao[valoresSorteados[num]]
                num++
            }
        }
        //inputArquivo.style.display='block'
        resultado_arquivo.style.display='block'
        resultado_arquivo.innerHTML=`Resultado: ${resultadoSorteio}`
        }
    }
}


//Função responsável pelos sorteios
function square(a,b){
return a+Math.round(Math.random()*(b-a))
}     