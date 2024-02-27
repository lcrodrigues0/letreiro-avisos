import { Notice } from "./notice.js"

// Fetch JSON archive
const response = await fetch('./avisosDia.json');
const infos = await response.json();
console.log(infos)

let noticeList = [];
for (const info of infos){
    const notice = new Notice(info.type, info.sender, info.title, info.content, info.duration, info.timestamp);
    noticeList.push(notice)
}
console.log(noticeList)


// Switch pages
const horariosPage = document.querySelector("#horarios");
const avisosPage = document.querySelector("#notices");

let count = 0;

setInterval(() => {
    console.log('aviso: ' + (new Date()).getSeconds()); //Apenas para debug

    const noticesShown = getNextFiveNotices(count)
    loadInfos(noticesShown);
    count = (count + 1)%noticeList.length;

    avisosPage.className = "page-notice";
    horariosPage.className += " hidden";

    // setTimeout(switchPage, noticesShown[0].duration*100);
}, 1000); // Intervalo de tempo definido para page horários de 40s, no max.

function getNextFiveNotices(count) {
    let fiveNotices = [];
    const len = noticeList.length;

    for (let i=count; i< count+5; i++) {
        fiveNotices.push(noticeList[i%len])
    }
    return fiveNotices;
} 

/*
    Troca da página de avisos para paǵina de horários 
*/
function switchPage(){
    console.log('horarios: ' + (new Date()).getSeconds()); //Apenas para debug

    horariosPage.className = "page-horarios"
    avisosPage.className += " hidden";
}

/*
    Carrega informações na página de avisos
*/
function loadInfos(notices){
    const firstNotice = notices[0];
    loadFirstNotice(firstNotice);

    const sidebarNotices = notices.slice(1);
    loadSidebarNotices(sidebarNotices);
}


//// DEBUG: Retirar setAtribute('src', ...) # Muito feio
// Load main notice
function loadFirstNotice(firstNotice) {
    let noticeType;
    if (firstNotice.type == 1) {
        noticeType = 'warning'
        document.querySelector('#main-image').setAttribute('src', "./img/avisos/notice-icon.png")
    } else if(firstNotice.type == 2) {
        noticeType = 'information'
        document.querySelector('#main-image').setAttribute('src', "./img/avisos/info-icon.png")
    } else if(firstNotice.type == 3) {
        noticeType = 'event'
        document.querySelector('#main-image').setAttribute('src', "./img/avisos/event-icon.png")
    }
    
    // Modifies the entire main-board according to the type
    let elMainBoard = document.querySelector('.main-board');
    elMainBoard.classList.remove('warning');
    elMainBoard.classList.remove('information');
    elMainBoard.classList.remove('event');
    elMainBoard.classList.add(noticeType);

    // Load main-notice fields with the firstNotice atributes
    document.querySelector('#sender').textContent = firstNotice.sender;
    document.querySelector('#subject-h2').textContent = firstNotice.title;
    document.querySelector('#text-notice-p').textContent = firstNotice.content;
    document.querySelector('#post-timestamp').textContent = firstNotice.timestamp;
}

// Load left-board with four notices
function loadSidebarNotices(sidebarNotices) {
    // Get the 'ul' element on the left-board
    const elNoticesList = document.querySelector('.left-board__content');

    // Clean the content inside this 'ul' element
    elNoticesList.innerHTML = ""

    // Append all 'sidebarNotices' to the 'ul' element
    sidebarNotices.forEach(notice => {
        const elNotice = document.createElement('li');
        const elNoticeImg = document.createElement('img');
        const elNoticeSpan = document.createElement('span');
        const elNoticeTitle = document.createElement('p');

        console.log(notice.type);
        if (notice.type == 1) {
            elNoticeImg.setAttribute('src', "./img/avisos/notice-icon.png")
            elNotice.classList.add("message-warning");
        } else if (notice.type == 2) {
            elNoticeImg.setAttribute('src', "./img/avisos/info-icon.png")
            elNotice.classList.add("message-information");
        } else {
            elNoticeImg.setAttribute('src', "./img/avisos/event-icon.png")
            elNotice.classList.add("message-event");
        }
        elNoticeTitle.textContent = notice.title;

        elNoticeSpan.appendChild(elNoticeTitle);
        elNotice.appendChild(elNoticeImg);
        elNotice.appendChild(elNoticeSpan);
        elNoticesList.appendChild(elNotice);

        elNotice.classList.add("message");
        elNoticeSpan.classList = "message_text";
    })
}

///// HEADER ///////
// Update header date and time
function updateCurrentDate() {
    const time = new Date();

    const formatTime = (time) => {
        return (time < 10) ? "0" + time : time;
    }

    // Format the date as "DD/MM/YYYY - HH:MM"
    let formattedDate = formatTime(time.getDate()) + '/' + 
                        formatTime(time.getMonth() +1) + '/' + 
                        time.getFullYear() + ' - ' + 
                        formatTime(time.getHours()) + ':' + 
                        formatTime(time.getMinutes());

    // Update the content of the element with id="currentDate"
    let elDateAndTime = document.querySelector('header .header__content__time p');
    elDateAndTime.textContent = formattedDate;
}

// Call the function initially
updateCurrentDate();

// Update the current date and time every 5 seconds
setInterval(updateCurrentDate, 5000);