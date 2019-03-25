import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'orderBy'})
export class OrderByPipe implements PipeTransform {
    transform(array: haippi.Person[], args: string): haippi.Person[] {
        array.sort((a: haippi.Person, b: haippi.Person) => {
          if (a.order < b.order) {
            return -1;
          } else if (a.order > b.order) {
            return 1;
          } else {
            return 0;
          }
        });
        return array;
      }
}