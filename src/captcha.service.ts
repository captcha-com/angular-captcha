import { Injectable, Inject }    from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { CaptchaEndpointPipe } from './captcha-endpoint.pipe';
import { CaptchaSettings } from './captcha-settings.interface';
import { CAPTCHA_SETTINGS } from './config';

declare var BotDetect: any;

@Injectable()
export class CaptchaService {

  private _styleName: string;

  constructor(
    private http: Http,
    private captchaEndpointPipe: CaptchaEndpointPipe,
    @Inject(CAPTCHA_SETTINGS) private config: CaptchaSettings
  ) { }

  set styleName(styleName: string) {
    this._styleName = styleName;
  }

  get styleName(): string {
    return this._styleName;
  }

  // The captcha endpoint for BotDetect requests.
  get captchaEndpoint(): string {
    return this.captchaEndpointPipe.transform(this.config.captchaEndpoint);
  }

  // Get BotDetect instance, which is provided by BotDetect script.
  get botdetectInstance(): any {
    if (!this.styleName) {
      return null;
    }
    return BotDetect.getInstanceByStyleName(this.styleName);
  }

  // Get captcha html markup from BotDetect API.
  getHtml(): Observable<string> {
    const url = this.captchaEndpoint + '?get=html&c=' + this.styleName;
    return this.http.get(url)
      .map((response: Response) => response.text().replace(/<script.*<\/script>/g, ''))
      .catch((error: any) => Observable.throw(error.json().error));
  }

  // UI validate captcha.
  validateUnsafe(captchaCode: string): any {
    if (!this.botdetectInstance) {
      throw new Error('BotDetect instance does not exist.');
    }
    const url = this.botdetectInstance.validationUrl + '&i=' + captchaCode;

    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }

}
