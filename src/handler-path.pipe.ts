import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'handlerPath'})
export class HandlerPathPipe implements PipeTransform {

  /**
   * Strip all '/' from the beginning and end,
   * then add '/' to the beginning of the given path.
   */
  transform(value: string): string {
    let path = value.trim().replace(/^\/+|\/+$/g, '');
    return '/' + path;
  }
}
