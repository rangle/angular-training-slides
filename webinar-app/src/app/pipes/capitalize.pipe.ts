import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(inputText: string, args?: any): any {
    return inputText.charAt(0).toUpperCase() + inputText.slice(1);
  }

}
