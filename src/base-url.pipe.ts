import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'baseUrl'})
export class BaseUrlPipe implements PipeTransform {

  /**
   * Strip '/' character from the end of the given url.
   */
  transform(value: string): string {
    return value.trim().replace(/\/+$/g, '');
  }
}
