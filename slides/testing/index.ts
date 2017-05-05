import { DuplicateIdValidator } from './validator/duplicate-id-validator';
import * as Table from 'cli-table';
import * as path from 'path';

const duplicateIdValidator = new DuplicateIdValidator();
const isValid = duplicateIdValidator.validate();

if (isValid)
{
  process.exit(0);
}

const duplicates = duplicateIdValidator.duplicates;
var table = new Table({ head: ['Duplicated Id', 'File Names'] , colWidths: [50, 25] });
duplicates.forEach(r => table.push([r.id, r.files.join('\n')]));
console.log(table.toString());
process.exit(1);
