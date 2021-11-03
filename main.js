
var bear;

class Bear {
    dBear = 100;
    htmlElement = document.getElementById("bear");
    id = this.htmlElement.id;
    x = this.htmlElement.offsetLeft;
    y = this.htmlElement.offsetTop;
    constructor() {
    }

    move(xDir, yDir) {
        this.x += this.dBear * xDir;
        this.y += this.dBear * yDir;
        this.display();
    };

    display() {
        this.htmlElement.style.position = 'absolute';
        
        this.htmlElement.style.left = this.x + "px";
        this.htmlElement.style.top = this.y + "px";
    };
}
   
function start() {
    bear = new Bear();
    document.addEventListener("keydown", moveBear, false);
}

function moveBear(e) {
    //codes of the four keys
    const KEYUP = 38;
    const KEYDOWN = 40;
    const KEYLEFT = 37;
    const KEYRIGHT = 39;
    if (e.keyCode == KEYRIGHT) {
        bear.move(1, 0)
    } // right key
    if (e.keyCode == KEYLEFT) {
        bear.move(-1, 0)
    } // left key
    if (e.keyCode == KEYUP) {
        bear.move(0, -1)
    } // up key
    if (e.keyCode == KEYDOWN) {
        bear.move(0, 1)
    } // down key
   }
   