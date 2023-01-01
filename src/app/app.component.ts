import { Component, OnInit} from '@angular/core';
import { Card } from './card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title!:string; // je ne sais pas pourquoi angular n'est pas content si je ne mets pas ça.....

  cards!:Card[];
  cardsValue:string[]=['Bat.png','Bones.png','Cauldron.png','Dracula.png','Eye.png','Ghost.png','Pumpkin.png','Skull.png']

  //cardToCheck:[string, number] = ["", 0]; //[cardValue, cardNumber]
  cardToCheck:string="";
  overlayStart:string="visible";
  overlayGameOver:string="";
  overlayVictory:string="";

  totalTime:number=100; // vraiment utile? ou valeur direct sur timer?
  timer!:number;
  flips!:number;
  matchedCards!:string[];
  busy:boolean=false;
  matchedCard:number=0;

  ngOnInit() { //afterViewInit?
    this.cards=this.shuffleCards()
    this.timer=this.totalTime;
    this.flips=0;
    
  }

  shuffleCards(){
    let shuffleCards= [...this.cardsValue, ...this.cardsValue]
    .sort(() => Math.random()-0.5)
    .map((value,index)=> ({ id: index, value, visibility:"" }))
    return shuffleCards
  }

  startGame(){
    this.overlayStart="";
    this.starCountDown();
  }
  starCountDown(){
    return setInterval(()=>{
        this.timer--;
        if(this.timer==0){
            this.gameOver()
        }
    },1000)
}
gameOver(){
  this.overlayVictory="visible"
}
Victory(){
  this.overlayVictory="visible"
}

//que faire quand on click sur une carte? 
//if not busy
//checker si cardtocheck est vide
// si oui cardtocheck = la valeur de la carte cliquée
//sinon comparer la carte cliquée avec cartetocheck (ne pas oublier le cas ou on clique 2 fois sur la meme carte)
//si elles sont différentes enlever la classe visible
//sinon insérer la valeur de la carte dans matchedcard
//une fois que matchedcard est rempli > victory

clickOnCard(card:Card){
  console.log(card)
}




click(card:string, cardNumber:number):string{
  if(!this.busy){
    this.flips++;
    if(this.cardToCheck==""){
      this.cardToCheck=card;
      return "visible"
    }else{
      //comment envoyer data à cardtocheck
    }
  }
  
  console.log(card)
  console.log(cardNumber)
  return "visible"
}

}
