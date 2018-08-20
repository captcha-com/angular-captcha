import { NgZone, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CaptchaHelperService {

  constructor(private http: HttpClient, private ngZone: NgZone) { }

  // get script and execute it immediately
  getScript(url: string, onLoadSuccess: () => void): void {
    this.http.get(url, { responseType: 'text' })
      .subscribe(
        scriptString => {
          let f = new Function(scriptString);
            this.ngZone.runOutsideAngular(() => {
              f();
              this.ngZone.run(() => {
                  setTimeout(onLoadSuccess, 200);
              });
            });
        }
      );
  }

}
