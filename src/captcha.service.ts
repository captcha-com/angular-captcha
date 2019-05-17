import { Injectable, Inject }    from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { CaptchaEndpointPipe } from './captcha-endpoint.pipe';
declare var BotDetect: any;

@Injectable()
export class CaptchaService {

  private _captchaStyleName: string;
  private static _captchaEndpoint: string;

  constructor(
    private http: Http,
    private captchaEndpointPipe: CaptchaEndpointPipe
  ) { }

  set captchaStyleName(captchaStyleName: string) {
    this._captchaStyleName = captchaStyleName;
  }

  get captchaStyleName(): string {
    return this._captchaStyleName;
  }

  static set captchaEndpoint(captchaEndpoint: string) {
    CaptchaService._captchaEndpoint = captchaEndpoint;
  }

  // the captcha endpoint for botdetect requests.
  get captchaEndpoint(): string {
    return this.captchaEndpointPipe.transform(CaptchaService._captchaEndpoint);
  }

  // get botdetect instance, which is provided by botdetect script.
  get botdetectInstance(): any {
    return BotDetect.getInstanceByStyleName(this.captchaStyleName);
  }

  // check if configured captchaEndpoint is valid or not.
  isCaptchaEndpointValid(): boolean {
    return ((this.captchaEndpoint !== undefined)
            && (this.captchaEndpoint !== null)
            && (this.captchaEndpoint !== ''));
  }

  // get captcha html markup from botdetect api.
  getHtml(): Observable<string> {
    if (!this.isCaptchaEndpointValid()) {
      throw new Error("\'captchaEndpoint' setting is not set!");
    }

    const url = this.captchaEndpoint + '?get=html&c=' + this.captchaStyleName;
    return this.http.get(url)
      .map((response: Response) => response.text().replace(/<script.*<\/script>/g, ''))
      .catch((error: any) => Observable.throw(error.json().error));
  }

  // ui validate captcha.
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
