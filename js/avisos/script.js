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

    setTimeout(switchPage, noticesShown[0].duration*100);
}, 4000); // Intervalo de tempo definido para page horários de 40s, no max.

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
    
    
    
    // const elMainBoard = document.querySelector('.main-board');
    // const elMainImg = document.querySelector("#main-image");
    // const elDivImg = document.querySelector(".image");
    // const elDivSender = document.querySelector(".teacher");
    // const elSender = document.querySelector("#sender");
    // const elTitle = document.querySelector('#subject-h2');
    // const elContent = document.querySelector('#text-notice-p')
    // const elTimestamp = document.querySelector('#post-timestamp');

    // let mainImgSrc;
    // let mainBkColor;
    // let imgBkColor;
    // let secColor;

    // if (info.type == 1){
    //     mainImgSrc = './img/avisos/notice-icon.png';
    //     mainBkColor = '#faee89';
    //     imgBkColor = '#fce157';
    //     secColor = '#fff7ab';
    // }
    // else if (info.type == 2){
    //     mainImgSrc = './img/avisos/info-icon.png';
    //     mainBkColor = '#96ade8';
    //     imgBkColor = '#6f8fe1';
    //     secColor = '#bbccf6';
    // }
    // else if (info.type == 3){
    //     mainImgSrc = './img/avisos/event-icon.png';
    //     mainBkColor = '#c686f9';
    //     imgBkColor = '#a66ed2';
    //     secColor = '#d5adf5';
    // } else {
    //     mainImgSrc = './img/avisos/notice-icon.png';
    //     mainBkColor = '#b7d3fc';
    //     imgBkColor = '#d9d9d9';
    //     secColor = '#ccdffc';
    // }

    // elMainImg.setAttribute('src', mainImgSrc );
    // elMainBoard.style.background = mainBkColor;
    // elDivImg.style.background = imgBkColor;
    // elDivSender.style.background = secColor;
    // elSender.textContent = info.sender;
    // elTitle.textContent = info.title;
    // elContent.textContent = info.content;
    // elTimestamp.style.background = secColor;
    // elTimestamp.textContent = info.timestamp;
}

// Load main notice
function loadFirstNotice(firstNotice) {
    document.querySelector("#sender").textContent = firstNotice.sender;
    document.querySelector('#subject-h2').textContent = firstNotice.title;
    document.querySelector('#text-notice-p').textContent = firstNotice.content;
    document.querySelector('#post-timestamp').textContent = firstNotice.timestamp;
}

// Load sidebar with four notices
function loadSidebarNotices(sidebarNotices) {
    // Get the 'ul' element on the sidebar
    const elNoticesList = document.querySelector('.left-board__content');

    // Clean the content inside this 'ul' element
    elNoticesList.innerHTML = ""

    // Append all 'sidebarNotices' to the 'ul' element
    sidebarNotices.forEach(notice => {
        const elNotice = document.createElement('li');
        const elNoticeImg = document.createElement('img');
        const elNoticeSpan = document.createElement('span');
        const elNoticeTitle = document.createElement('p');

        elNoticeImg.setAttribute('src', "./img/avisos/info-icon.png");
        elNoticeTitle.textContent = notice.title;

        elNoticeSpan.appendChild(elNoticeTitle);
        elNotice.appendChild(elNoticeImg);
        elNotice.appendChild(elNoticeSpan);
        elNoticesList.appendChild(elNotice);

        elNotice.classList = "message";
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