import { Injectable, Inject }    from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { CaptchaEndpointPipe } from './captcha-endpoint.pipe';
import { CaptchaHelperService } from './captcha-helper.service';
import { CaptchaSettings } from './captcha-settings.interface';
import { CAPTCHA_SETTINGS } from './config';

declare var BotDetect: any;

@Injectable()
export class CaptchaService {

  private _styleName: string;

  constructor(
    private http: Http,
    private captchaEndpointPipe: CaptchaEndpointPipe,
    private captchaHelper: CaptchaHelperService,
    @Inject(CAPTCHA_SETTINGS) private config: CaptchaSettings
  ) { }

  set styleName(styleName: string) {
    this._styleName = styleName;
  }

  get styleName(): string {
    return this._styleName;
  }

  /**
   * The captcha handler url for BotDetect requests.
   */
  get handlerUrl(): string {
    return this.captchaEndpointPipe.transform(this.config.captchaEndpoint);
  }

  /**
   * Get BotDetect instance, which is provided by BotDetect script.
   */
  get botdetectInstance(): any {
    if (!this.styleName) {
      return null;
    }
    return BotDetect.getInstanceByStyleName(this.styleName);
  }

  /**
   * Get captcha html markup from BotDetect API.
   */
  getHtml(): Observable<string> {
    const url = this.captchaHelper.buildUrl(this.handlerUrl, {
      get: 'html',
      c: this.styleName
    });

    return this.http.get(url)
      .map((response: Response) => response.text().replace(/<script.*<\/script>/g, ''))
      .catch((error: any) => Observable.throw(error.json().error));
  }

  /**
   * UI validate captcha.
   */
  validate(captchaCode: string): Observable<string> {
    if (!this.botdetectInstance) {
      throw new Error('BotDetect instance does not exist.');
    }

    const url = this.captchaHelper.buildUrl(this.botdetectInstance.validationUrl, {
      i: captchaCode
    });

    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }

}
