export class Cabecalho {
    static atualizaHorario(){
        let horario  = new Date();

        const acertaHorario =  (tempo) =>{
            return (tempo < 10) ? "0" + tempo : tempo
        }
    
        let stringTempo =  acertaHorario(horario.getDate())
            +  "/" + acertaHorario(horario.getMonth() + 1) + "/20"
            + (horario.getFullYear()%100) +  " - "
            + acertaHorario(horario.getHours())  + ":"
            + acertaHorario(horario.getMinutes())
        Cabecalho._tempo().textContent = stringTempo
    }

    static atualizaAviso(bool){
        if(bool == null) return
        if(bool){
            Cabecalho._aviso().textContent = "Avisos disponíveis"
            
        }
        else{
            Cabecalho._aviso().textContent = "Não há avisos"
        }    
    }

    static _tempo(){
        return document.querySelector("#tempo")
    }

    static _aviso(){
        return document.querySelector("#ha-aviso")
    }
}