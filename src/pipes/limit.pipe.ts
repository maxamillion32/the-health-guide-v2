import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'limit-pipe'
})
@Injectable()
export class LimitPipe {

  transform(value, args) {
    value = value + '';
    return value.toLowerCase();
  }
}
