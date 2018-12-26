import { Component, Input, OnInit, ElementRef } from '@angular/core';

import { CaptchaService } from './captcha.service';
import { CaptchaHelperService } from './captcha-helper.service';

@Component({
  selector: 'botdetect-captcha',
  template: ''
})
export class CaptchaComponent implements OnInit {

  @Input() styleName: string;

  constructor(
    private elementRef: ElementRef,
    private captchaService: CaptchaService,
    private captchaHelper: CaptchaHelperService
  ) { }

  // The current captcha id, which will be used for validation purpose.
  get captchaId(): string {
    return this.captchaService.botdetectInstance.captchaId;
  }

  // The typed captcha code value.
  get captchaCode(): string {
    return this.captchaService.botdetectInstance.userInput.value;
  }

  // Display captcha html markup on component initialization.
  ngOnInit(): void {
    // if styleName is not specified, the styleName will be 'defaultCaptcha'
    if (!this.styleName) {
      this.styleName = 'defaultCaptcha';
    }

    // set captcha style name to CaptchaService for creating BotDetect object
    this.captchaService.styleName = this.styleName;

    // display captcha html markup on view
    this.displayHtml();
  }

  // Display captcha html markup in the <botdetect-captcha> tag.
  displayHtml(): void {
    this.captchaService.getHtml()
      .subscribe(
        captchaHtml => {
          // display captcha html markup
          this.elementRef.nativeElement.innerHTML = captchaHtml;
          // load botdetect scripts
          this.loadScriptIncludes();
        },
        error => {
          throw new Error(error);
        });
  }

  // Reload a new captcha image.
  reloadImage(): void {
    this.captchaService.botdetectInstance.reloadImage();
  }

  // Validate captcha on client-side and execute user callback function on ajax success
  validateUnsafe(callback: (isHuman: boolean) => void): void {
    let userInput = this.captchaService.botdetectInstance.userInput;
    let captchaCode = userInput.value;
    if (captchaCode.length !== 0) {
      this.captchaService.validateUnsafe(captchaCode)
        .subscribe(
          (isHuman: boolean) => {
            callback(isHuman);
            if (!this.captchaHelper.useUserInputBlurValidation(userInput) && !isHuman) {
              this.reloadImage();
            }
          },
          (error: any) => {
            throw new Error(error);
          }
        );
    } else {
      const isHuman = false;
      callback(isHuman);
    }
  }

  // Load BotDetect scripts.
  loadScriptIncludes(): void {
    let captchaId = this.elementRef.nativeElement.querySelector('#BDC_VCID_' + this.styleName).value;
    const scriptIncludeUrl = this.captchaService.captchaEndpoint +  '?get=script-include&c=' + this.styleName + '&t=' + captchaId + '&cs=201';
    this.captchaHelper.getScript(scriptIncludeUrl);
  }

}
