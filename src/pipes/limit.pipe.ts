import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'limit'
})
@Injectable()
export class Limit {
  transform(value: any[], exponent: number): any {
       if (value) {
           return value.filter((item, index) => {
               if (index < exponent) {
                   return item;
               }
           });
       }
    }
}
