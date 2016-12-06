import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatFileSize'})
export class FilesizePipe implements PipeTransform {
  transform() : any {
    return `formatted file size`;
  }
}
