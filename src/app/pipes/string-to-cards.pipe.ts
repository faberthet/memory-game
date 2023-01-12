import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../card';

@Pipe({
  name: 'stringToCards'
})
export class StringToCardsPipe implements PipeTransform {

  transform(value: string[]): Card[] {
    return [...value,...value]
           .map( (value) => ({ id: -1, value:value, visibility:"" }) )
  }

}
