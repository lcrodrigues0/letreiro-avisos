export class Horarios {
    static remover(){
        Horarios._containersHorarios().forEach(container_horarios => {
            let horarios = container_horarios.children
            if(horarios.length == 0) return
            horarios[0].remove()
        })
    }

    static adicionar(lab, hora, descricao)
    {
        const funcaoCerta = [
            Horarios._containersHorariosLab1,
            Horarios._containersHorariosLab2,
            Horarios._containersHorariosLab3
        ]
        funcaoCerta[lab-1]().forEach(container_horarios => 
        {
            for(let horario of container_horarios.children)
            {
                if(parseInt(horario.children[0].innerHTML) == parseInt(hora))
                {
                    horario.children[1].innerHTML = `
                        <marquee
                            class="descricao-do-dia-escrolavel"
                            scrollamount="5"
                            scrolldelay="1"
                            behavior="scroll"
                        >
                            ${descricao}
                        </marquee>`
                    
                    if(descricao == "Aberto"){
                        horario.children[0].className = "hora aberto"
                        horario.children[1].className = "descricao aberto"
                    }
                    else if(descricao == "Fechado"){
                        horario.children[0].className = "hora fechado"
                        horario.children[1].className = "descricao fechado" 
                    }
                    else{
                        horario.children[0].className = "hora em_aula"
                        horario.children[1].className = "descricao em_aula"
                    }
                }                    
            }
        })
    }

    static reset(){
        const funcaoCerta = [
            Horarios._containersHorariosLab1,
            Horarios._containersHorariosLab2,
            Horarios._containersHorariosLab3
        ]

        for(let i = 0; i < 3; i++){
            funcaoCerta[i]().forEach(container_horarios => {
                const horarios = container_horarios.children
                const length = horarios.length
    
                for(let j = 0; j < length; j++){
                    horarios[0].remove()
                }
    
                for(let j = 0; j < 12; j++){
                    container_horarios.appendChild(Horarios._criarDivHorario(i + 1, j + 7))
                }
            })
        }
    }

    static atualizar() {

        // Pega o primeiro horario impresso na interface grafica
        let hora = null
        if(Horarios._containersHorarios()[0].children.length > 0){
            hora = Horarios._containersHorarios()[0]
                .children[0]
                .children[0]
                .textContent
        }
        else{
            return
        }
        
        while(new Date().getHours() > parseInt(hora)) {
            Horarios.remover()

            if(Horarios._containersHorarios()[0].children.length > 0){
                hora = Horarios._containersHorarios()[0]
                    .children[0]
                    .children[0]
                    .textContent
            }
            else{
                return
            }
        }
    }

    static _containersHorarios(){
        return document.querySelectorAll(".container_horarios")
    }
    
    static _containersHorariosLab1(){
        return document.querySelectorAll("[lab1] .container_horarios")
    }

    static _containersHorariosLab2(){
        return document.querySelectorAll("[lab2] .container_horarios")
    }

    static _containersHorariosLab3(){
        return document.querySelectorAll("[lab3] .container_horarios")
    }

    static _criarDivHorario(lab, hora){
        let horario = document.createElement("div")
        horario.className = "horario"
    
        let campoHora = document.createElement("div")
        
        if(hora >= 0 && hora <= 9){
            campoHora.textContent = "0" + hora + ":00"
        }
        else if(hora >= 10 && hora <= 23){
            campoHora.textContent = hora + ":00"
        }
    
        let campoDescricao = document.createElement("div")

        if(lab == 1 || lab == 3){
            campoHora.className = "hora fechado"
            campoDescricao.className = "descricao fechado"
            campoDescricao.textContent = "Fechado"
        }
        else{
            campoHora.className = "hora aberto"
            campoDescricao.className = "descricao aberto"
            campoDescricao.textContent = "Aberto"
        }
    
        horario.appendChild(campoHora)
        horario.appendChild(campoDescricao)
    
        return horario
    }
    
    // Funcao nao utilizada mais, serve para trocar a cor do Lab no canto superiror direiro
    /*
    static _mudaCorLab(lab){
        return
        const funcaoCerta = [
            Horarios._containersHorariosLab1,
            Horarios._containersHorariosLab2,
            Horarios._containersHorariosLab3
        ]

        funcaoCerta[lab - 1]().forEach(container_horarios => {              
            let estado = container_horarios.children[0].textContent.slice(5)
            // a solução aqui provavelmente não é a melhor
            // a cor do lab em questão é a mesma do horário atual:
            let el = document.getElementById(`lab${lab}`)
            if(estado === "Fechado"){
                el.className = "qual-lab fechado"
            }
            else if(estado === "Aberto"){
                el.className = "qual-lab aberto"
            }
            else{
                el.className = "qual-lab em_aula"
            }
        })
    }
    */
}
