import { Injectable, Inject }    from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CaptchaEndpointPipe } from './captcha-endpoint.pipe';
import { CaptchaSettings } from './captcha-settings.interface';
import { CAPTCHA_SETTINGS } from './config';

declare var BotDetect: any;

@Injectable()
export class CaptchaService {

  private _captchaStyleName: string;

  constructor(
    private http: HttpClient,
    private captchaEndpointPipe: CaptchaEndpointPipe,
    @Inject(CAPTCHA_SETTINGS) private config: CaptchaSettings
  ) { }

  set captchaStyleName(captchaStyleName: string) {
    this._captchaStyleName = captchaStyleName;
  }

  get captchaStyleName(): string {
    return this._captchaStyleName;
  }

  // The captcha endpoint for BotDetect requests.
  get captchaEndpoint(): string {
    return this.captchaEndpointPipe.transform(this.config.captchaEndpoint);
  }

  // Get BotDetect instance, which is provided by BotDetect script.
  get botdetectInstance(): any {
    if (!this.captchaStyleName) {
      return null;
    }
    return BotDetect.getInstanceByStyleName(this.captchaStyleName);
  }

  // Get captcha html markup from BotDetect API.
  getHtml(): any {
    const url = this.captchaEndpoint + '?get=html&c=' + this.captchaStyleName;
    return this.http.get(url, { responseType: 'text' });
  }

  // UI validate captcha.
  validateUnsafe(captchaCode: string): any {
    if (!this.botdetectInstance) {
      throw new Error('BotDetect instance does not exist.');
    }
    const url = this.botdetectInstance.validationUrl + '&i=' + captchaCode;
    return this.http.get(url);
  }

}
