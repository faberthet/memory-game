import { Component, OnInit} from '@angular/core';
import { Card } from './card';
import { interval, Observable } from 'rxjs';
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

  totalTime:number=100;
  timer!:number;
  interv:any;

  flips!:number;
  busy:boolean=false; //busy si 2 cartes sont déjà sélectionées
  matching:number=0;

  ngOnInit() { 
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
    this.cards=this.shuffleCards()
    this.timer=this.totalTime;
    this.flips=0;
    this.matching=0
    this.lastPick=-1;
    this.overlayStart="";
    this.overlayGameOver="";
    this.overlayVictory="";
    this.starCountDown();
  }

  starCountDown(){
    this.interv= setInterval(()=>{
      this.timer--;
      if(this.timer==0){
          this.gameOver()
      }
    },1000)
  }

  gameOver(){
    this.overlayGameOver="visible"
    clearInterval(this.interv)
  }

  Victory(){
    this.overlayVictory="visible"
    clearInterval(this.interv)
  }

  clickOnCard(card:Card){ 
    if(this.readyToHandle(card)){
      this.lastPick=card.id
      this.cards[card.id].visibility="visible";//carte.id = index de la carte dans le tableau cards
      this.flips++;
      if(this.cardToCheck.id==-1){
        this.cardToCheck=card
      }else{
        this.busy=true
        if(card.value!=this.cardToCheck.value){
          this.noMatch(card)
        }else{
          this.match(card)
        }
      } 
    }
  }

  //gestion du cas des doubles cliques sur une même carte
  readyToHandle(card:Card):boolean{ 
    return card.id!=this.lastPick && !this.busy;
  }

  match(card:Card){
    this.cardToCheck=new Card(-1,"","")
    Promise.resolve(this.matching++) 
    .then(()=>{
      if(this.matching==8){
        this.Victory()
      }
    }) 
    this.busy=false
  }

  noMatch(card:Card){
    console.log(this.cardToCheck)
    setTimeout(() => { //timeout pour laisser le temps à la deuxième carte de se retourner
      Promise.resolve(this.cards[this.cardToCheck.id].visibility="")
      .then(() => this.cards[card.id].visibility="")
      .then(() => this.cardToCheck=new Card(-1,"",""))
      .then(() =>this.busy=false)  
    }, 1000)
  }

}
