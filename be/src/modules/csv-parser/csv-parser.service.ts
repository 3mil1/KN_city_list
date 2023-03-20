import { Injectable } from '@nestjs/common';
import { Options, parse } from 'csv-parse';

@Injectable()
export class CsvParserService {
  async parseCsv<T = ICity>(
    csvString: string,
    options: Options = {},
  ): Promise<T[]> {
    const records: T[] = [];
    return new Promise((resolve, reject) => {
      const parser = parse({
        ...options,
      });
      parser.on('readable', () => {
        let record;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        while ((record = parser.read()) !== null) {
          records.push(record as T);
        }
      });
      parser.on('error', (error: any) => reject(error));
      parser.on('end', () => resolve(records));
      parser.write(csvString);
      parser.end();
    });
  }
}
