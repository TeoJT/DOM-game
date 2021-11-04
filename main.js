
var bear;
var bees;

function start() {
    bear = new Bear();
    document.addEventListener("keydown", moveBear, false);

    //create new array for bees
    bees = [];
    
    //create bees
    makeBees();

    updateBees();
}

class Character {
    id;
    x;
    y;
    htmlElement;
    width;
    height;

    constructor(elementName) {
        this.htmlElement = document.getElementById(elementName);
        this.id = this.htmlElement.id;
        this.x = this.htmlElement.offsetLeft;
        this.y = this.htmlElement.offsetTop;
        this.width = this.htmlElement.clientWidth;
        this.height = this.htmlElement.clientHeight;
    }

    move(xDir, yDir) {
        this.x += this.dBear * xDir;
        this.y += this.dBear * yDir;
        this.fitBounds();
        this.display();
    };
    display() {
        this.htmlElement.style.position = 'absolute';

        this.htmlElement.style.left = this.x + "px";
        this.htmlElement.style.top = this.y + "px";
    };
    fitBounds() {
        let parent = document.querySelector("#board");
        let boardW = parent.offsetWidth;
        let boardH = parent.offsetHeight;

        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.x + this.width > boardW) {
            this.x = boardW - this.width;
        }
        if (this.y + this.height > boardH) {
            this.y = boardH - this.height;
        }
    };
}


class Bear extends Character {
    dBear = 100;

    constructor() {
        super("bear");
    }
}






class Bee extends Character {
    constructor(beeNumber) {
        let htmlElement = createBeeImg(beeNumber);
        super(htmlElement.id);
        
        //the HTML element corresponding to the IMG of the bee

    }

    move(dx, dy) {
        //move the bees by dx, dy
        this.x += dx;
        this.y += dy;
        this.fitBounds();
        this.display();
    };
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


function createBeeImg(wNum) {
    //get dimension and position of board div
    let boardDiv = document.getElementById("board");
    let boardDivW = boardDiv.offsetWidth;
    let boardDivH = boardDiv.offsetHeight;
    let boardDivX = boardDiv.offsetLeft;
    let boardDivY = boardDiv.offsetTop;

    //create the IMG element
    let img = document.createElement("img");
    img.setAttribute("src", "images/bee.png");
    img.setAttribute("width", "100");
    img.setAttribute("alt", "A bee!");
    img.setAttribute("id", "bee" + wNum);
    img.setAttribute("class", "bee"); //set class of html tag img
    //add the IMG element to the DOM as a child of the board div
    img.style.position = "absolute";
    boardDiv.appendChild(img);
    //set initial position
    let x = getRandomInt(boardDivW);
    let y = getRandomInt(boardDivH);
    img.style.left = (boardDivX + x) + "px";
    img.style.top = (y) + "px";
    //return the img object
    return img;
}


function makeBees() {
    //get number of bees specified by the user
    let nbBees = document.getElementById("nbBees").value;
    nbBees = Number(nbBees); //try converting the content of the input to a number
    if (isNaN(nbBees)) { //check that the input field contains a valid number
        window.alert("Invalid number of bees");
        return;
    }

    //create bees
    let i = 1;
    while (i <= nbBees) {
        var num = i;
        var bee = new Bee(num); //create object and its IMG element
        bee.display(); //display the bee
        bees.push(bee); //add the bee object to the bees array
        i++;
    }
}

function addBee() {
    bees.push(new Bee(bees.length+1));
    document.getElementById("nbBees").value = bees.length;

}

function moveBees() {
    //get speed input field value
    let speed = document.getElementById("speedBees").value;

    //move each bee to a random location
    for (let i = 0; i < bees.length; i++) {
        let dx = getRandomInt(2 * speed) - speed;
        let dy = getRandomInt(2 * speed) - speed;
        bees[i].move(dx, dy);
        isHit(bear.htmlElement, bees[i].htmlElement);
    }
}

function getRandomInt(max) {
    return Math.random()*max;
}

function updateBees() { // update loop for game
    //move the bees randomly
    moveBees();

    //use a fixed update period
    let period = 50; //modify this to control refresh period

    //update the timer for the next move
    updateTimer = setTimeout('updateBees()', period);
}

let lastHit = new Date();
function isHit(defender, offender) {
    if (overlap(defender, offender)) { //check if the two image overlap
        let score = hits.innerHTML;
        score = Number(score) + 1; //increment the score
        hits.innerHTML = score; //display the new score
        let longestDuration = 0;

        //calculate longest duration
        longestTimeHTMLElement = document.querySelector("#duration");
        if (longestTimeHTMLElement.innerHTML === '?') {
            longestDuration = 0;
        }
        else {
            longestDuration = Number(longestTimeHTMLElement.innerHTML);
        }

        now = new Date();
        newTime = now.getTime() - lastHit.getTime();
        if (newTime > longestDuration) {
            longestTimeHTMLElement.innerHTML = String(newTime);
        }
        lastHit = now;

        
    }
}

function overlap(e1, e2) {

    if (e1.x + e1.width > e2.x && e1.x < e2.x + e2.width &&
        e1.y + e1.height > e2.y && e1.y < e2.y + e2.height) {
        return true;
    }
    else {
        return false;
    }

    //consider the two rectangles wrapping the two elements
    //rectangle of the first element
    left1 = element1.htmlElement.offsetLeft;
    top1 = element1.htmlElement.offsetTop;
    right1 = element1.htmlElement.offsetLeft + element1.htmlElement.offsetWidth;
    bottom1 = element1.htmlElement.offsetTop + element1.htmlElement.offsetHeight;
    //rectangle of the second element
    left2 = element2.htmlElement.offsetLeft; //e2x
    top2 = element2.htmlElement.offsetTop; //e2y
    right2 = element2.htmlElement.offsetLeft + element2.htmlElement.offsetWidth;
    bottom2 = element2.htmlElement.offsetTop + element2.htmlElement.offsetHeight;
    //calculate the intersection of the two rectangles
    x_intersect = Math.max(0, Math.min(right1, right2) - Math.max(left1, left2));
    y_intersect = Math.max(0, Math.min(bottom1, bottom2) - Math.max(top1, top2));
    intersectArea = x_intersect * y_intersect;
    //if intersection is nil no hit
    if (intersectArea == 0 || isNaN(intersectArea)) {
    return false;
    }
    return true;
}

