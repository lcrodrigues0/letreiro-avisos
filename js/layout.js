//import { lab1 } from "./labs_doDia.js"
import { Rodape } from "./rodape.js"

export class Layout {
    static telaAtual = 0

    static avancarTela(){
        const telas = Layout._telas()
        telas.forEach(tela => {
            tela.classList.add("display_none")
        })
        
        //console.log("telas length", telas.length)

        Layout.telaAtual++
        Layout.telaAtual %= telas.length

        telas[Layout.telaAtual].classList.remove("display_none")


        if(Layout.telaAtual == 2 && Rodape.temAviso == 0 ){
            telas[Layout.telaAtual].classList.add("display_none")
            telas[0].classList.remove("display_none")
            Layout.telaAtual =0 
            console.log("ola mundo")
            

        }

        Rodape.avancarTela()
    }

    static voltarTela(){
        const telas = Layout._telas()
        telas.forEach(tela => {
            tela.classList.add("display_none")
        })

        Layout.telaAtual--
        Layout.telaAtual = (Layout.telaAtual < 0) ? 2 : Layout.telaAtual

        telas[Layout.telaAtual].classList.remove("display_none")

        if(Layout.telaAtual ==2 && Rodape.temAviso == 0 ){
            telas[Layout.telaAtual].classList.add("display_none")
            telas[1].classList.remove("display_none")
            Layout.telaAtual =1
        }

        Rodape.voltarTela()

    }

    static _telas(){
        const telas = document.querySelectorAll(".tela");
        //console.log(telas);
        return telas;
    }
}
