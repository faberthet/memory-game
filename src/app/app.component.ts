import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  cardsValue:string[]=['Bat.png','Bones.png','Cauldron.png','Dracula.png','Eye.png','Ghost.png','Pumpkin.png','Skull.png']
  cardsVisibility:{[index: string]:string} = { //"" ou "visible"
    'Bat.png1':"",'Bones.png1':"",'Cauldron.png1':"",'Dracula.png1':"",'Eye.png1':"",'Ghost.png1':"",'Pumpkin.png1':"",'Skull.png1':"",
    'Bat.png2':"",'Bones.png2':"",'Cauldron.png2':"",'Dracula.png2':"",'Eye.png2':"",'Ghost.png2':"",'Pumpkin.png2':"",'Skull.png2':""
  };

  overlayStart:string="visible";
  overlayGameOver:string="";
  overlayVictory:string="";

  cardToCheck!:string;

  totalTime:number=100; // vraiment utile? ou valeur direct sur timer?
  timer!:number;
  flips!:number;
  matchedCards!:string[];

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

}

//que faire quand on click sur une carte? 
//if not busy
//checker si cardtocheck est vide
// si oui cardtocheck = la valeur de la carte cliquée
//sinon comparer la carte cliquée avec cartetocheck
//si elles sont différentes enlever la classe visible
//sinon insérer la valeur de la carte dans matchedcard
//une fois que matchedcard est rempli > victory

onCardClick(card:string){ 
  if(this.cardToCheck==""){
    this.cardToCheck=card
  }else{
    if(card!=this.cardToCheck){

    
  }
  }
//fonction lancé par child component return valeur de class visible or not si possible... pas possible
//autre sol: faire un objet de variables (card1:"" ou "visible", card2:) associé à chaque child component card
//

}

// this.overlay.nativeElement.classList.remove('visible')
// removeClass(event: Event, className:string){
// (event.target as Element).classList.remove(className)
// }

}
