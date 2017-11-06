import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class CaptchaHelperService {

  constructor(
    private http: Http
  ) { }

  getScript(url: string, onLoadSuccess: () => void): void {
    this.http.get(url)
      .map((response: Response) => response.text())
      .subscribe(
        scriptString => {
          let f = new Function(scriptString); f();
          onLoadSuccess();
        }
      );
  }

}
