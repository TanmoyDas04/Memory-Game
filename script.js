var errors=0;
var cardList=["darkness","double","fairy","grass","lightning","metal","psychic","water","fighting","fire"];
var cardSet;
var board=[];
var rows=4;
var columns=5;

var card1Selected;
var card2Selected;
const bgmusic=new Audio('bgmusic.m4a');
const flipsound=new Audio('flipsound.m4a');

window.onload=function(){
    setTimeout(() => {
        bgmusic.play();
    }, 1000);

    shuffleCards();
    startGame();
}

function shuffleCards() {

    cardSet=cardList.concat(cardList)  // two of each card
    console.log(cardSet);

    //shuffle
    for (let i = 0; i < cardSet.length; i++) {
        let j=Math.floor(Math.random()*(cardSet.length - 0)+0);
        let temp=cardSet[i];
        cardSet[i]=cardSet[j];
        cardSet[j]=temp;
    }
    console.log(cardSet);
}

function startGame() {
    // arrange the board 4X5
    for (let r = 0; r < rows; r++) {
        let row=[];
        for (let c = 0; c < columns; c++) {
            let cardImg=cardSet.pop();
            row.push(cardImg);

            let card=document.createElement("img");
            card.id=r.toString()+"-"+c.toString();
            card.src=cardImg+".jpg";
            card.classList.add("card");
            card.addEventListener("click",selectCard);
            document.getElementById('board').appendChild(card);
        }
        board.push(row)
    }
    setTimeout(() => {
        hideCards();
    }, 1000);
}

function hideCards() {
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns; c++){
            let card=document.getElementById(r.toString()+"-"+c.toString());
            card.src="back.jpg";
        }
    }
}

function selectCard() {
    if(this.src.includes("back")){
        if (!card1Selected) {
            card1Selected=this;
            let coords=card1Selected.id.split("-");
            let r=parseInt(coords[0]);
            let c=parseInt(coords[1]);

            flipsound.play();
            card1Selected.src=board[r][c]+".jpg";
        }
        else if(!card2Selected && this!=card2Selected){
            card2Selected=this;
            let coords=card2Selected.id.split("-");
            let r=parseInt(coords[0]);
            let c=parseInt(coords[1]);

            flipsound.play();
            card2Selected.src=board[r][c]+".jpg";

            setTimeout(() => {
                update();
            }, 1000);
        }
    }
}

function update() {
    // if cards are not same, flip both back
    if (card1Selected.src != card2Selected.src) {
        card1Selected.src="back.jpg";
        card2Selected.src="back.jpg";
        errors++;
        document.getElementById("errors").innerHTML=errors;
    }
    card1Selected=null;
    card2Selected=null;
}