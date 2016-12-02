import { /* Imports */ } from '@angular/core';

@Pipe({name: 'filesize'})
export class FilesizePipe implements /* an interface */ {
  transform(/*arguments*/) : any {
    return `formatted file size`;
  }
}
