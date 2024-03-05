export class Notice {
    constructor(id, type, sender, title, content, duration, timestamp) {
        this.id = id;
        this.type = type;
        this.sender = sender;
        this.title = title;
        this.content = content;
        this.duration = duration;
        this.timestamp = new Date(timestamp);
    }
}
