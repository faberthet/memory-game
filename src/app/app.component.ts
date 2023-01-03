import { Component, OnInit} from '@angular/core';
import { Card } from './card';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title!:string; // je ne sais pas pourquoi angular n'est pas content si je ne mets pas ça.....

  cards!:Card[];
  cardsValue:string[]=['Bat.png','Bones.png','Cauldron.png','Dracula.png','Eye.png','Ghost.png','Pumpkin.png','Skull.png']

  cardToCheck:Card=new Card(-1,"","");
  lastPick:number=-1;

  overlayStart:string="visible";
  overlayGameOver:string="";
  overlayVictory:string="";

  totalTime:number=100; // vraiment utile? ou valeur direct sur timer?
  timer!:number;
  flips!:number;
  matchedCards!:string[];
  busy:boolean=false; //busy si 2 cartes sont déjà sélectionées
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

  //gestion du cas des doubles cliques sur une même carte
  readyToHandle(card:Card):boolean{ 
      return card.id!=this.lastPick && !this.busy;
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
  this.overlayGameOver="visible"
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
  
  if(this.readyToHandle(card)){
    this.lastPick=card.id
    console.log(card.id)
    this.cards[card.id].visibility="visible";//carte.id = index de la carte dans le tableau cards
    if(this.cardToCheck.id==-1){
      this.cardToCheck=card
    }else{
      if(card.value!=this.cardToCheck.value){
        console.log(this.cardToCheck)
        setTimeout(() => { //sinon la carte se retourne trop vites
        Promise.resolve(this.cards[this.cardToCheck.id].visibility="")
        .then(() => this.cardToCheck=new Card(-1,"",""))
        this.cards[card.id].visibility=""
          
        }, 1000)
        
      }
    } 
  }
}

}
