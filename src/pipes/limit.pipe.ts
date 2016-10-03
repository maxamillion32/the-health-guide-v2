import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the LimitPipe pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'limit-pipe'
})
@Injectable()
export class LimitPipe {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value, args) {
    value = value + ''; // make sure it's a string
    return value.toLowerCase();
  }
}
