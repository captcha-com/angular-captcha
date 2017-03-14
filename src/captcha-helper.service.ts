import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class CaptchaHelperService {

  constructor(@Inject(DOCUMENT) private document: any) { }

  /**
   * Build url with parameters.
   */
  buildUrl(url: string, params: any): string {
    let p: Array<string> = [];

    for (let key in params) {
      if (typeof key === 'string') {
        p.push(key + '=' + params[key]);
      }
    }

    let hasParamsPattern = /\?+/g;
    return hasParamsPattern.test(url) ? (url + '&' + p.join('&')) : (url + '?' + p.join('&'));
  }

  /**
   * Create script include element.
   */
  scriptInclude(url: string, className: string): any {
    let script = this.document.createElement('script');
        script.src = url;
        script.className = className;
    return script;
  }

}
