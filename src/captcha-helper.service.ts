import { Injectable, NgZone } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class CaptchaHelperService {

  constructor(
    private http: Http,
    private ngZone: NgZone
  ) { }

  // get script and execute it immediately
  getScript(url: string): void {
    this.http.get(url)
      .map((response: Response) => response.text())
      .subscribe(
        scriptString => {
          let f = new Function(scriptString);
          this.ngZone.runOutsideAngular(() => {
            f();
          });
        }
      );
  }

  useUserInputBlurValidation(userInput: any): boolean {
    return (userInput.getAttribute('correctCaptcha') !== null);
  }

}
