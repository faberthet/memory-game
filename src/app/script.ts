//support exemple en javascript
function ready(){
let overlays=Array.from(document.getElementsByClassName("overlay-text"))
let cards = Array.from(document.getElementsByClassName("card"))
// overlays.forEach( overlay => {
//     overlay.addEventListener('click',
//     )
// })
}

class MixOrMatch{
    cardsArray;
    totalTime;
    timeRemaining;
    timer;
    ticker;
    cardToCheck: any;
    totalClicks!: number;
    matchedCards!:string[];
    busy!:boolean;
    countDown!:NodeJS.Timeout;


    constructor(totalTime:number, cards:string[]){ //or number (id of card)
        this.cardsArray=cards;
        this.totalTime=totalTime;
        this.timeRemaining=totalTime;
        this.timer=document.getElementById("time-remaining")
        this.ticker=document.getElementById("flips")
    }
    startGame(){
       this.cardToCheck=null;
       this.totalClicks=0;
       this.timeRemaining=this.totalTime;
       this.matchedCards=[];
       this.busy=true;
       setTimeout(() =>{
        this.shuffleCards()
        this.countDown=this.starCountDown(); 
        this.busy=false
       },500)
       this.hideCards();
       this.timer!.innerText=this.timeRemaining.toString();
       this.ticker!.innerText=this.totalClicks.toString();

    }
    canFlipCard(card:string){
        return (!this.busy && !this.matchedCards.includes(card) && (card !== this.cardToCheck))
    }
    flipcard(card:string){
        if(this.canFlipCard(card)){
            this.totalClicks++;
            this.ticker!.innerText=this.totalClicks.toString();
            //card.className.add('visible')
        }
        if(this.cardToCheck){
            this.checkForCardMatch(card);
        }else{
            this.cardToCheck=card;
        }
    }
    shuffleCards(){
        for(let i = this.cardsArray.length-1; i>0;i--){
            let randIndex=Math.floor(Math.random()*(i+1))
        //  this.cardsArray[randIndex].style.order=i;
        //  this.cardsArray[i].style.order=randIndex;
        }

    }

    hideCards(){
        //card.classList.remove('visible')
        //card.classList.remove('matched') pas utilisé peut etre
    }
    starCountDown(){
        return setInterval(()=>{
            this.timeRemaining--;
            this.timer!.innerText=this.timeRemaining.toString();
            if(this.timeRemaining==0){
                this.gameOver()
            }
        },1000)
    }
    gameOver(){
        clearInterval(this.countDown)
        document.getElementById("game-over-text")?.classList.add('visible')

    }
    Victory(){
        clearInterval(this.countDown)
        document.getElementById("victory-text")?.classList.add('visible')
    }
    checkForCardMatch(card:string){
        if(this.getCardType(card)=== this.getCardType(this.cardToCheck)){
            this.cardMatch(card,this.cardToCheck);
        }else{
            this.cardMisMatch(card,this.cardToCheck)
        }
        this.cardToCheck=null;
    }
    getCardType(card:string){
        return ""// card.getElementsByClassName("card-value")[0].src;

    }
    cardMatch(card1:string,card2:string){
        this.matchedCards.push(card1)
        this.matchedCards.push(card2)
        if(this.matchedCards.length=== this.cardsArray.length){
            this.Victory();
        }
    }
    cardMisMatch(card1:string,card2:string){
        this.busy=true;
        setTimeout(() => {
          //  card1.classList.remove('visible')
           // card2.classList.remove('visible')
           this.busy=false;
        }, 1000);
    }
}