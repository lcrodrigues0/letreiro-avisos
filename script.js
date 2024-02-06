let active = 'horarios';

const horariosPage = document.querySelector("#horarios");
const avisosPage = document.querySelector("#avisos");

setInterval(() => {
    if (active == 'horarios'){
        horariosPage.className = "page"
        avisosPage.className += " hidden";
        active = 'avisos';
    } else {
        avisosPage.className = "page"
        horariosPage.className += " hidden";
        active = 'horarios';
    }

}, 6000)
