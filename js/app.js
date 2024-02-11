import {Horarios} from "./horarios.js"
import {Layout} from "./layout.js"
import {Cabecalho} from "./cabecalho.js"
import {formataDisciplina, formataNome} from "./util.js"
import { Rodape } from "./rodape.js"
// Rodape.inicializaRodape(temAviso)


        function getAulasDia() {
            let request = new XMLHttpRequest();
            request.open("GET", "aulasDia", false);
            request.send(null);
            return JSON.parse(request.responseText);
        }

function trocaNome() {
    getAulasDia().forEach(idx =>
    {
        Horarios.adicionar(idx['labgrad_id'], idx['hora'], idx['disciplina'] + " - " + idx['nome'])
    });
}

function loopPrograma() {

    Horarios.reset()
    let temAviso = 1
    Cabecalho._tempo().addEventListener('load', Cabecalho.atualizaHorario())
    trocaNome()

    // Rodape.atualizaRodape(temAviso)
    // Cabecalho.atualizaAviso(temAviso)
    Cabecalho.atualizaHorario()
    Horarios.atualizar()
}

                loopPrograma();
setInterval(loopPrograma, 60000)


// Funcao capaz de rolar automaticamente qualquer elemento escrolavel
// Nao esta sendo usada mais, pois a tela nao deve mais rolar para a esquerda
function rolarEsquerdaSuperMelhorado(elemento, tempoIncremento = 10) {
    let indoParaDireita = true;
    let parado = false;

    // Serve para corrigir o bug de o scroll nao conseguir chegar no final
    // Se o scroll atual for igual o anterior, eh porque o programa nao esta conseguindo incrementar ou decrementar o scroll
    // A animacao deve ser resetada nesse caso
    let scrollLeftAnterior = 0;
    setInterval(() => {
        if (parado)
            return;

        if (indoParaDireita == true)
            scrollLeftAnterior = elemento.scrollLeft++;
        else
            scrollLeftAnterior = elemento.scrollLeft--;

        if (scrollLeftAnterior == elemento.scrollLeft) {
            setTimeout(() => parado = false, 2000);
            indoParaDireita = !indoParaDireita;
            return;
        }

        if (elemento.scrollLeft >= elemento.scrollWidth - elemento.clientWidth) {
            indoParaDireita = false;
            parado = true;

            setTimeout(() => parado = false, 2000);
        }

        if (elemento.scrollLeft == 0) {
            indoParaDireita = true;
            parado = true;

            setTimeout(() => parado = false, 2000);
        }

    }, tempoIncremento)
}

/*
 const elementoRolante = document.getElementsByClassName("nomes-monitores")[0];
 rolarEsquerdaSuperMelhorado(elementoRolante, 50);
 
 const descricaoAulaScroll = document.getElementsByClassName("descricao-do-dia-escrolavel");
 
 for(let i = 0; i < descricaoAulaScroll.length; i++)
 rolarEsquerdaSuperMelhorado(descricaoAulaScroll[i], 50)
 */

// Funcao responsavel por chamar Layout.avancarTela() em tempos adequados
// Nao esta sendo usada mais, pois o letreiro nao troca mais de tela
const trocaTela = (tempo) => {
    let i = 0;

    setInterval(() => {
        i = (i + 1) % 4;
        if (i == 2 || i == 3)
            Layout.avancarTela()
    }, tempo)
}