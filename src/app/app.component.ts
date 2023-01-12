import { Component, OnInit} from '@angular/core';
import { Card } from './card';
import { StringToCardsPipe } from './pipes/string-to-cards.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title!:string;

  images: string[]= ["clownfish.png","jellyfish.png","octopus.png","sea-snail.png","sea-turtle.png","shark.png","shrimp.png","starfish.png"]

  cards!:Card[];          

  cardToCheck:Card=new Card(-1,"","");
  lastPick:number=-1;

  overlayStart:string="start-screen";
  overlayGameOver:string="";
  overlayVictory:string="";

  totalTime:number=100;
  timer!:number;
  interv:any;

  flips!:number;
  busy:boolean=false; //busy si 2 cartes sont déjà sélectionées
  matching:number=0;

  constructor(private stringToCardsPipe: StringToCardsPipe){}
  

  ngOnInit() { 
    this.timer=this.totalTime;
    this.flips=0;
    this.cards=this.stringToCardsPipe.transform(this.images)
  }

  shuffleCards(){
    this.cards=this.shuffle(this.cards)
    .map((value,index)=> ({ id: index, value:value.value, visibility:"" }))
  }

  shuffle(array:Card[]) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  startGame(){
    this.shuffleCards()
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
    return this.cardToCheck.id==-1 || (card.id!=this.lastPick && !this.busy);
  }

  match(card:Card){
    Promise.resolve(this.matching++) 
    .then(()=>{
      if(this.matching==8){
       setTimeout(() => {
        this.Victory()
       }, 400); 
      }
    })
    setTimeout(() => { //attendre que l'arrière de la carte ne sois plus visible
                      // car sinon le deuxieme clique d'un double clique est pris en compte par readyToHandle()
      this.cardToCheck=new Card(-1,"","")
      this.busy=false
    }, 500); 
    
  }

  noMatch(card:Card){
    setTimeout(() => { //timeout pour laisser le temps à la deuxième carte de se retourner
      Promise.resolve(this.cards[this.cardToCheck.id].visibility="")
      .then(() => this.cards[card.id].visibility="")
      .then(() => this.cardToCheck=new Card(-1,"",""))
      .then(() =>this.busy=false)  
    }, 1000)
  }

}
