import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(inputArray: Array<any>, sortBy: string): any {
    if (sortBy === 'desc'){
      return [...inputArray.sort().reverse()]
    }
    return [...inputArray.sort()];
  }

}
