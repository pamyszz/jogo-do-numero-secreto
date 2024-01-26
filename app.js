// let titulo = document.querySelector('h1'); // 'S' deve estar maiúsculo, se não, não funciona
// titulo.innerHTML = 'Jogo do número secreto'; // Dentro do HTML daquele título, guarda a seleção do h1

// let paragrafo = document.querySelector('p'); // Pega do parágrafo, salva elementos dentro do p
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10'; 

// Sempre que temos um padrão de código ou um código muito parecido, onde apenas alguns detalhes são modificados, podemos isolar esse comportamento em uma função.

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) { 
    let campo = document.querySelector(tag);
    campo.innerHTML = texto; 
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
    // campo.innerhtml o texto muda, pois o padrão de código é mudança de detalhes, 2 seletores! (isso é uma maneira mais simples pro contexto, ela somente exibe coisas na tela)
}

// exibirTextoNaTela('h1', 'Jogo do número secreto');
// exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

// Função chamada ao clicar no botão. Responsável por verificar o chute do usuário.
function verificarChute() {
    // Obtém o valor digitado pelo usuário no campo de entrada.
    let chute = document.querySelector('input').value;

    // Compara se o chute é igual ao número secreto.
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas': 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`; 
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); //remover o atributo
    } else {
        
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
    }
}

// Função auxiliar para exibir texto na tela. Recebe o tipo de elemento HTML (tag) e o texto a ser exibido.
function exibirTextoNaTela(tag, texto) {
    // Seleciona o elemento HTML especificado e define o texto interno.
    document.querySelector(tag).innerText = texto;
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNalista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNalista == 3) {
        listaDeNumerosSorteados = [];
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}


// function gerarNumeroAleatorio() {
//     return parseInt(Math.random() * 10 + 1); // Informando que queremos um retorno, não tem nenhum parâmetro, porém tem um retorno da geração de um número aleatório entre 1 e 10. 
// }

//Quando acertar o número secreto, desativar 
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}


//Quando o botão for clicado o jogo reiniciará
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas=1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

