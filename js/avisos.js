class aviso {
    constructor(nome, texto) {
        this.nomeString = "😀" + ` ${nome}`
        this.textoString = texto
        let date = new Date()
        this.date = date

        const acertaHorario = (valor) => {
            return (valor < 10) ? "0" + valor : valor
        }
        let hora = acertaHorario(date.getHours())

        let tardeManha = "AM"

        if (hora > 12) {
            hora -= 12
            tardeManha = "PM"
        }
        this.horarioString = hora + ":" + acertaHorario(date.getMinutes()) + " " + tardeManha + " · " + acertaHorario(date.getDate()) + "/" + acertaHorario(date.getMonth()) + "/" + (acertaHorario(date.getFullYear() % 100)) + " ."

    }

    RetornaAvisoHTML() {

        let divAviso = document.createElement('div')
        divAviso.classList = "aviso"

        let nome = document.createElement('p')
        nome.innerHTML = this.nomeString
        nome.classList = "nome"

        let texto = document.createElement('p')
        texto.classList = "texto-aviso"
        texto.innerText = this.textoString

        let horario = document.createElement('p')
        horario.classList = "horario"
        horario.innerText = this.horarioString

        divAviso.appendChild(nome)
        divAviso.appendChild(texto)
        divAviso.appendChild(horario)

        return divAviso
    }

}

class avisos {
    constructor(avisosPai) {
        this.avisos = document.querySelector(avisosPai)
        let v = document.querySelectorAll(".aviso")

        this.listaAvisos = []

        let tam = 0
        v.forEach((x) => {
            this.listaAvisos.push(x)
            tam++
        })

        this.avisosTela = tam
        this.tamanho = tam
    }

    inserirAvisoLista(nome, texto) {
        let aviso_ = new aviso(nome, texto)
        let avisoHTML = aviso_.RetornaAvisoHTML()
        this.listaAvisos.push(avisoHTML)
        this.tamanho++


    }

    atualizaAvisos() {
        if (this.tamanho == 0) return
        let avisosTela = this.avisosTela
        /*avisos tela 0*/

        if (this.avisosTela == 6 && this.tamanho > 6) {

            let date = new Date()
            let lastChild = this.listaAvisos[0].children[2]
            let horasFilho = Number(lastChild.innerText[0]) * 10 + Number(lastChild.innerText[1])
            let splitado = String(lastChild.innerText)
            splitado = splitado.split(" ")
            if (splitado[1] == "PM") {
                horasFilho += 12
            }
            let horasReal = date.getHours()

            if (horasReal - horasFilho >= 1) {

                this.listaAvisos[0].remove()
                console.log(this.listaAvisos[0])
                this.listaAvisos.shift()
                this.tamanho--
                this.avisos.appendChild(this.listaAvisos[5])
            }


            return
        }

        for (let i = avisosTela; i < this.tamanho; i++) {
            if (this.avisosTela == 6) break
            this.avisos.appendChild(this.listaAvisos[i])
            console.log(this.avisosTela)
            this.avisosTela++
        }

    }

    resetaAvisos() {
        this.listaAvisos.forEach((x) => {
            x.remove()
        })
        this.tamanho = 0
        this.avisosTela = 0
        this.listaAvisos = []
    }
}