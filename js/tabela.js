import {toStringDia, formataDataDiaMes, formataHora} from "./util.js"
import {lab1} from "./labs_doDia.js"
import {formataNome, formataDisciplina} from "./util.js"

export class TabelaHorarios {
    constructor(tableNode) {
        this.tabela = tableNode;
    }

    construir(dataIni, dataFim, horaIni, horas) {
        this.dataIni = dataIni;
        this.dataFim = dataFim;
        this.horaIni = horaIni;
        this.horas = horas;

        // Iterador
        let d = new Date()

        // Geração da primeira linha:
        // 'horários' | os dias a serem impressos | ...
        let linhaZero = document.createElement("thead");
        for (d.setDate(dataIni.getDate() - 1); d < dataFim; d.setDate(d.getDate() + 1)) {
            let coluna = document.createElement("th");
            let auxStr = ' - ';

            // A primeira coluna é apenas a marcação de horas do dia
            if (d.getDate() == dataIni.getDate() - 1)
                auxStr = "Horários";
            else {
                auxStr = toStringDia(d.getDay());
                auxStr += ' ';
                auxStr += formataDataDiaMes(d);
            }

            coluna.appendChild(document.createTextNode(auxStr));
            linhaZero.appendChild(coluna);
        }
        this.tabela.appendChild(linhaZero);

        // Geração das linhas restantes da table
        // hora | celulas vazias de reserva | ...
        for (let h = horaIni; h < horaIni + horas; h++) {
            let linhaHora = document.createElement("tr");

            for (d.setDate(dataIni.getDate() - 1); d < dataFim; d.setDate(d.getDate() + 1)) {
                let celula = document.createElement("td");
                let auxStr = ''

                if (d.getDate() == dataIni.getDate() - 1)
                    auxStr = formataHora(h);

                celula.appendChild(document.createTextNode(auxStr));
                linhaHora.appendChild(celula);
            }

            this.tabela.appendChild(linhaHora);
        }
    }

    destruir() {
        this.table.remove();
    }

    preencher(listaReservas) {
        this.reservas = listaReservas;
        this.reservas.forEach(reserva => {
            this._setReserva(reserva);
        });
    }

    _setReserva(reserva) {
        let data = new Date(reserva.data);
    
        let col = this._dateDiffInDays(this.dataIni, data) + 2;
        let lin = reserva.hora - this.horaIni + 2;
        let cel = document.querySelectorAll(".time-table tr:nth-child(" + lin + ") td:nth-child(" + col + ")")[0];
    
        let nome = formataNome(reserva.nome);
        let disc = formataDisciplina(reserva.disciplina);
    
        console.log(nome);
        cel.innerHTML = (nome + ' ' + disc)
        //cel.appendChild(document.createTextNode);
        cel.setAttribute("class", "reserved");
    }
    
    
    // Obrigado a https://stackoverflow.com/questions/3224834
    _dateDiffInDays(a, b) {
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.abs(Math.floor((utc2 - utc1) / 86400000));
    }
}

// Dados de teste
// let listaReservas = lab1
// listaReservas = listaReservas.dados;
// const dataIni = new Date("2022-08-22");
// 
// const dataIni = new Date(Date.now());
// const dataFim = new Date().setDate(dataIni.getDate() + 4);
// const tableNode = document.getElementById("time-tbl");

// Teste
// let tabelinha = new TabelaHorarios(tableNode);
// tabelinha.construir(dataIni, dataFim, 7, 12)

// tem algum problema sério na hora de preencher as reservas
// tabelinha.preencher(listaReservas)

// essa parte do código não está bem implementada de acordo com o arquivo "horarios.js"