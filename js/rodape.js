export class Rodape{
    static telaAtual = 0
    static temAviso =0 
    static avancarTela(){
        // const elipses = Rodape._elipses()
        // elipses.forEach(elipse => {
        //     elipse.style.backgroundColor = "#4785FF"
        // })

        Rodape.telaAtual++
        Rodape.telaAtual %= 3

        // elipses[Rodape.telaAtual].style.backgroundColor = "#E6EAD8"
        Rodape.atualizaAvisoElipse()
        if(Rodape.telaAtual == 2 && Rodape.temAviso == 0){
            // elipses[0].style.backgroundColor = "#E6EAD8"
            Rodape.telaAtual = 0
        }
    }

    static voltarTela(){
        const elipses = Rodape._elipses()
        elipses.forEach(elipse => {
            console.log(elipse)
            elipse.style.backgroundColor = "#4785FF"
        })

        Rodape.telaAtual--
        Rodape.telaAtual = (Rodape.telaAtual < 0) ? 2 : Rodape.telaAtual

        elipses[Rodape.telaAtual].style.backgroundColor = "#E6EAD8"
        Rodape.atualizaAvisoElipse(Rodape.temAviso)
        if(Rodape.telaAtual == 2 && Rodape.temAviso ==0){
            elipses[1].style.backgroundColor = "#E6EAD8"
            Rodape.telaAtual = 1
        }
    }

    static atualizaRodape(temAviso){
        Rodape.temAviso = temAviso
    }

    static atualizaAvisoElipse(){
        const elipses = Rodape._elipses()
        // if(Rodape.temAviso ==0 ) elipses[2].style.backgroundColor= "#003399"
    }

    static inicializaRodape(temAviso){
        const elipses = Rodape._elipses()
        elipses[0].style.backgroundColor = "#E6EAD8"
        elipses[1].style.backgroundColor = "#4785FF"
        elipses[2].style.backgroundColor = "#4785FF"
        Rodape.temAviso = temAviso
        Rodape.atualizaAvisoElipse()

    }

    static _elipses(){
        return document.querySelectorAll(".pages")
    }
}