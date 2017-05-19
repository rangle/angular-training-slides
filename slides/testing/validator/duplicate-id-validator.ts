import { FileParser } from './../parser/file-parser';
import { IValidator } from './validator.interface';
import { File } from './../parser/file';
import * as fs from 'fs';
import * as path from 'path';

export class DuplicateIdValidator implements IValidator {

  private duplicateSlides: any;
  private basePath = path.resolve(__dirname, '../../../src/content/');

  get duplicates() {
    return this.duplicateSlides;    
  }
  
  validate(): boolean {
    let files = this.getFiles();
    let slideIds = this.getSlideIds(files);
    this.duplicateSlides  = this.getDuplicates(slideIds);
    return this.duplicateSlides.length === 0 ? true : false;
  }

  private getFiles(): Array<string> {
    const extension = '.md';
    return fs.readdirSync(this.basePath).filter((file) => file.endsWith(extension));
  }

  private getSlideIds(allMarkdownFiles: string[]): File[] {
    let parser: FileParser = new FileParser();

    let slideIds = allMarkdownFiles.map(mdFile => {
      let content = fs.readFileSync(path.resolve(this.basePath , mdFile), 'utf8');
      let data = { fileName: mdFile, content: content };
      return [...parser.parse(data)];
    }).reduce((list, slide) => [...list, ...slide], []);

    return slideIds;
  }

  private getDuplicates(slideIds: File[]): any {
    let allIds = new Set();
    let duplicates = new Set();
    slideIds.forEach(currentValue => {
      if (allIds.has(currentValue.slideId)) {
        duplicates.add(currentValue.slideId);
      };
      allIds.add(currentValue.slideId);
    });

    const duplicatesWithFileRef = [...duplicates].map(duplicate => {
      return {
        id: duplicate,
        files: slideIds.filter(allId => {
          return allId.slideId === duplicate;
        }).map(item => item.fileName)
      };
    });

    return duplicatesWithFileRef || [];
  }
}
