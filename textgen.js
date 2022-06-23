
class TextFlow {
    constructor(el) {
        this.el = el;
        this.update = this.update.bind(this);
        this.textNew = "";
    }
    setText(newText) {
        const promise = new Promise((resolve) => (this.resolve = resolve));
        this.queue = [];
        for (let nextChar of newText)
            this.queue.push(nextChar);
        this.frame = 0;
        this.output = "";
        this.update();
        return promise;
    }
    update() {
        let character = this.queue[this.frame];
        this.output += character;
        if(this.frame >= this.queue.length) {
            this.resolve();
        } else {
            this.el.innerHTML = this.output;
            let timeoutTime = 10 + Math.floor(Math.random() * 20)
            setTimeout(() => {  this.frameRequest = requestAnimationFrame(this.update); }, timeoutTime);
            this.frame++;
        }
    }
}