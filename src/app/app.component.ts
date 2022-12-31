import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title!:string; // je ne sais pas pourquoi angular n'est pas content si je ne mets pas ça.....

  cardsValue:string[]=['Bat.png','Bones.png','Cauldron.png','Dracula.png','Eye.png','Ghost.png','Pumpkin.png','Skull.png']

  cardToCheck:[string, number] = ["", 0]; //[cardValue, cardNumber]

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
    this.timer=this.totalTime;
    this.flips=0;
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

// clickOnCard(card:string,cardNumber:number){
click(card:string, cardNumber:number):string{
  this.flips++;
  console.log(card)
  console.log(cardNumber)
  return "visible"
}


  clickOnCard(data:any){ 
    let card:string=data.cardValue;
    let cardNumber:number=data.cardNumber;

   
    //  if(this.cardToCheck[0]==""){ //si pas encore de carte selectionnée
    //    this.cardToCheck[0]=card
    //    this.cardToCheck[1]=cardNumber
    //  }else{
    //    this.busy=true; //2 cartes sélectionnées
    //    if(card!=this.cardToCheck[0]){ //si cards différentes elle se retournent timer peut etre necessaire
    //      this.cardsVisibility[card+cardNumber]="";
    //      this.cardsVisibility[this.cardToCheck[0]+this.cardToCheck[1]]="";
    //    }else{
    //     this.matchedCard++;
    //     if(this.matchedCard==8){ this.Victory() }
    //    }
    //  }
   
 // }

//fonction lancé par child component return valeur de class visible or not si possible... pas possible
//autre sol: faire un objet de variables (card1:"" ou "visible", card2:) associé à chaque child component card
//

}

// this.overlay.nativeElement.classList.remove('visible')
// removeClass(event: Event, className:string){
// (event.target as Element).classList.remove(className)
// }

}
