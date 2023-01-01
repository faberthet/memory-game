import { Component,EventEmitter,Input, Output } from '@angular/core';
import { Card } from '../card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() card!:Card;
  @Output() clickOnCard:EventEmitter<Card>=new EventEmitter();

  handleClick(){
    this.clickOnCard.emit(this.card)
  }

}


// @Input() click!: (card:string, cardNumber:number) => string;

// handleClick(){
//   this.cardVisibility=this.click(this.cardValue,this.cardNumber) //callback function who return "visible" or ""
// }