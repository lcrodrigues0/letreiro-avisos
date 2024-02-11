export function formata2d(val) {
    return (val.toString().padStart(2, '0'));
}

export function formataHora(numHora) {
    return (numHora.toString().padStart(2, '0') + ":00");
}

export function formataDataDiaMes(data) {
    return formataDiaMes(data.getDate(), data.getMonth() + 1);
}

export function formataDiaMes(numDia, numMes) {
    return (numDia.toString().padStart(2, '0') + '/' + numMes.toString().padStart(2, '0'));
}

export function toStringDia(diaNum) {
    switch (diaNum) {
        case 0:
            return "Domingo"
        case 1:
            return "Segunda"
        case 2:
            return "Terça"
        case 3:
            return "Quarta"
        case 4:
            return "Quinta"
        case 5:
            return "Sexta"
        case 6:
            return "Sábado"
        default:
            return "COD. DIA INVALIDO";
    }
}

//funcao para converter o utf do Javascript pro utf do HTML (funfa)
export function utfJsToUtfHtml(string){
    return string.replace(/\\u[\dA-F]{4}/gi, (match) => {
        return "&#" + parseInt(match.substring(2), 16) + ";"
    })
}

export function formataNome(string) {
    return utfJsToUtfHtml(string)
            .split(' ')
            .map(p => {
                let resto = p.slice(1).toLowerCase()
                return p.charAt(0).toUpperCase() + utfMaxToMin(resto)
            })
            .join(' ');
}

export function formataDisciplina(string) {
    const conv = {
        '&#199;': 'ç',
        '&#195;': 'ã',
        '&#193;': 'á',
        '&#201;': 'é',
        '&#205;': 'í',
        '&#211;': 'ó',
        '&#218;': 'ú',
    };

    // TODO: essa funcao *poderia* ser melhor
    return utfJsToUtfHtml(string)
        .split(' ')
        .map(p => {
            if (p[0].toLowerCase() == 'i' && p.split('').every(c => c == p[0]))
                return p.toUpperCase()
            else {
                let resto = p.slice(1).toLowerCase()
                
                Object.keys(conv).forEach((max) => {
                    resto = resto.replace(max, conv[max]);
                });

                return (p.charAt(0).toUpperCase() + resto);
            }
        })
        .join(' ');
}

export function utfMaxToMin(string) {
    const conv = {
        '&#199;': 'ç',
        '&#195;': 'ã',
        '&#193;': 'á',
        '&#201;': 'é',
        '&#205;': 'í',
        '&#211;': 'ó',
        '&#218;': 'ú',
    };
          
    Object.keys(conv).forEach((max) => {
        string = string.replace(max, conv[max]);
    });

    return string.toLowerCase();
}