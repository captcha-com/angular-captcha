import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'captchaEndpoint'})
export class CaptchaEndpointPipe implements PipeTransform {

  // Strip '/' character from the end of the given path.
  transform(value: string): string {
    return value.trim().replace(/\/+$/g, '');
  }
}
