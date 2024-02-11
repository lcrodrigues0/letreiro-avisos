class Status{

    static atualizaTemperatura(temperaturaNova, lab){
        let laboratorio = `[${lab}]`
        let tempPais = document.querySelectorAll( laboratorio + " .temperatura")
        let string = `☀<br>${String(temperaturaNova)} Cº`
        
        tempPais.forEach(tempPai => {
            tempPai.innerHTML = string
        })
    }

    static atualizaNumeroComputadores(numPCs, lab){
        let laboratorio = `[${lab}]`
        let pcsPais = document.querySelectorAll(laboratorio+ " .pcs-disponiveis")
        
        pcsPais.forEach(pcsPai => {
            pcsPai.innerHTML = String(numPCs)
        })
    }

    static atualizaNumeroMonitores(numMtrs ,lab){
        let laboratorio = `[${lab}]`

        let monitoresPais = document.querySelectorAll(laboratorio +  " .monitores-texto")
        let string  = `Monitores: ${String(numMtrs)}`

        monitoresPais.forEach(monitoresPai => {
            monitoresPai.innerHTML = string
        })        
    }

    static atualizaNomeMonitores(nomesMonitores, lab){
        let laboratorio = `[${lab}]`
        let nomesPais = document.querySelectorAll(laboratorio + " .nomes-monitores")

        let stringFinal = ""

        let index = 0
        for(let nome of nomesMonitores){
        
            if(index) stringFinal  = stringFinal  + `, ${nome}`
            else stringFinal = stringFinal + nome
            index ++ 
        }

        nomesPais.forEach(nomesPai => {
            nomesPai.textContent = stringFinal
        })
        
    }

    static atualizaStatus(lab,temperaturaNova, numPCs, nomesMonitores){
        Status.atualizaTemperatura(temperaturaNova, lab)

        Status.atualizaNumeroComputadores(numPCs, lab)

        Status.atualizaNumeroMonitores(nomesMonitores.length, lab)

//        Status.atualizaNomeMonitores(nomesMonitores, lab)
    }
    
    // Atualiza os monitores no rodape com base na lista de monitores
/*    static atualizaMonitores(monitores) {
         const qtdMonitoresEl = document.getElementsByClassName("monitores-texto")[0];
        qtdMonitoresEl.textContent = `Monitores: ${monitores.length}`;
        const monitoresEl = document.getElementsByClassName("nomes-monitores")[0];

        monitoresEl.textContent = "";
        monitores.forEach((monitor, index) => {
            if(index < monitores.length - 1)
                monitoresEl.textContent += `${monitor}, `;
            else
                monitoresEl.textContent += `${monitor}`;
        });
     } */
}

/*

let nomesMonitores = ["Daniel", "Gabriel", "Luca", "Matheus", "Pedro M", "Pedro S", "Thiago", "Vinicius M", "Vinicus N"];

Status.atualizaMonitores(nomesMonitores)

*/
