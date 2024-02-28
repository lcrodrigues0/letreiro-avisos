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
            fiveNotices.push(this.list[i%this.length()])
        }

        this.index += 1;
        return fiveNotices;
    } 

    // Merge the jsonNotices and the this.list using a map
    // the map don't store the shared notification. ('-')
    mergeJsonNotices(jsonNotices) {
        let map = new Map();

        // Adding the notice from 'noticeList' to the map
        this.list.forEach(notice => {
            map.set(notice.id, notice);
        })

        // Adding the notice from 'jsonNotices' to the map
        for (const info of jsonNotices) {
            const notice = new Notice(info.id, info.type, info.sender, info.title, info.content, info.duration, info.timestamp);
            map.set(notice.id, notice);
        }

        // Passing these unique notices to the list
        this.list = [...map.values()];

        console.log(this.list);
    }
}