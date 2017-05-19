import { File } from './file';
import { IParser } from './parser.interface';

export class FileParser implements IParser<Array<File>> {

  parse(data: any): Array<File> {
    let slides = data.content.match(/<!-- .slide:.*id=.*-->/g) || [];

    return slides.map(item => {
      return {
        fileName: data.fileName,
        slideId: item
      };
    });
  }
}
