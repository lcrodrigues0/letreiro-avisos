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
let active = 'horarios';

const horariosPage = document.querySelector("#horarios");
const avisosPage = document.querySelector("#notices");

let count = 0;

setInterval(() => {
    if (active == 'horarios'){
        horariosPage.className = "page-horarios"
        avisosPage.className += " hidden";
        active = 'avisos';
    } else {
        const info = noticeList[count%noticeList.length];
        loadInfos(info);
        count++;

        avisosPage.className = "page-notice"
        horariosPage.className += " hidden";
        active = 'horarios';
    }
}, 600);

function loadInfos(info){
    const elMainBoard = document.querySelector('.main-board');
    const elMainImg = document.querySelector("#main-image");
    const elDivImg = document.querySelector(".image");
    const elDivSender = document.querySelector(".teacher");
    const elSender = document.querySelector("#sender");
    const elTitle = document.querySelector('#subject-h2');
    const elContent = document.querySelector('#text-notice-p')
    const elTimestamp = document.querySelector('#post-timestamp');

    let mainImgSrc;
    let mainBkColor;
    let imgBkColor;
    let secColor;

    if (info.type == 1){
        mainImgSrc = './img/avisos/notice-icon.png';
        mainBkColor = '#faee89';
        imgBkColor = '#fce157';
        secColor = '#fff7ab';
    }
    else if (info.type == 2){
        mainImgSrc = './img/avisos/info-icon.png';
        mainBkColor = '#96ade8';
        imgBkColor = '#6f8fe1';
        secColor = '#bbccf6';
    }
    else if (info.type == 3){
        mainImgSrc = './img/avisos/event-icon.png';
        mainBkColor = '#c686f9';
        imgBkColor = '#a66ed2';
        secColor = '#d5adf5';
    } else {
        mainImgSrc = './img/avisos/notice-icon.png';
        mainBkColor = '#b7d3fc';
        imgBkColor = '#d9d9d9';
        secColor = '#ccdffc';
    }

    elMainBoard.style.background = mainBkColor;
    elMainImg.setAttribute('src', mainImgSrc );
    elDivImg.style.background = imgBkColor;
    elDivSender.style.background = secColor;
    elSender.textContent = info.sender;
    elTitle.textContent = info.title;
    elContent.textContent = info.content;
    elTimestamp.style.background = secColor;
    elTimestamp.textContent = info.timestamp;
}


