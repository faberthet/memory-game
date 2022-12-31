import { Component,EventEmitter,Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

@Input() cardValue!:string;
cardVisibility:string="";
@Input() cardNumber!:number;

@Input() click!: (card:string, cardNumber:number) => string;
 
@Output() clickOnCard:EventEmitter<any>=new EventEmitter();

cardClick(){
  let data={cardValue:this.cardValue,cardNumber:this.cardNumber}
  this.clickOnCard.emit(data)
}
handleClick(){
  this.cardVisibility=this.click(this.cardValue,this.cardNumber)
}

flipCard(event: Event){
  
}
}
