export default class ToScroll{
    constructor(){
        this.x = 20000;
    }

    scroll() {
        window.scrollTo(this.x, 0);
        this.x = this.x * 2;
     }
     resetScroll() {
        this.x = 2000;
      }
}

window.scrollTo(document.body.scrollHeight, 0);