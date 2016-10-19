import {Component} from '@angular/core';

@Component({
  selector: 'rio-root',
  template: `
    <div>
      <p *ngFor="let f of fileSizes">{{ f | formatFileSize }}</p>
      <p>{{ largeFileSize | formatFileSize:true }}</p>
    </div>`
})
export class App {
  fileSizes = [10, 100, 1000, 10000, 100000, 10000000, 10000000000];
  largeFileSize = Math.pow(10, 15)
}
