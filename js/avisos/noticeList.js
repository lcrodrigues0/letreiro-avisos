import { Notice } from "./notice.js"

export class NoticeList {
    constructor(jsonNotices) {
        this.list = [];
        this.index = 0;
        this.mergeJsonNotices(jsonNotices);
    }

    length() {
        return this.list.length;
    }

    getNextFiveNotices() {
        let fiveNotices = [];
    
        for (let i=this.index; i< this.index+5; i++) {
            // Módulo para se manter no range da lista
            fiveNotices.push(this.list[i%this.length()])
        }

        // Passa para próximo aviso
        this.index += 1;
        
        // Módulo para se manter no range da lista
        this.index %= this.length();

        return fiveNotices;
    } 

    // Merge the jsonNotices and the this.list using a map
    mergeJsonNotices(jsonNotices) {
        const noticeList = [];
        for (const info of jsonNotices) {
            const notice = new Notice(info.id, info.type, info.sender, info.title, info.content, info.duration, info.timestamp);
            noticeList.push(notice);
        }
        
        // Passing these unique notices to the list
        const map = new Map([...this.list, ...noticeList].map(notice => [notice.id, notice]));
        this.list = Array.from(map.values());
    }
}