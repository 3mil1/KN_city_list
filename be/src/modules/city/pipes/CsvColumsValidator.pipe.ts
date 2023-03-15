import { FileValidator } from '@nestjs/common';
import { extname } from 'path';

interface UploadedFile {
  originalname: string;
  buffer: Buffer;
}

export class CsvColumnsValidator extends FileValidator<{ columns: string[] }> {
  isValid(file?: UploadedFile): boolean | Promise<boolean> {
    const validExtensions = ['.csv'];
    const extension = extname(file.originalname).toLowerCase();
    if (!validExtensions.includes(extension)) {
      return false;
    }

    const rows = file.buffer.toString().split('\n');
    const header = rows[0].split(',');
    return header.length === this.validationOptions.columns.length;
  }

  buildErrorMessage(file: UploadedFile): string {
    const validExtensions = ['.csv'];
    const extension = extname(file.originalname).toLowerCase();
    if (!validExtensions.includes(extension)) {
      return `Invalid file extension. Please upload a CSV file.`;
    }

    return `Invalid CSV file. It must have the following columns: ${this.validationOptions.columns.join(
      ', ',
    )}`;
  }
}
