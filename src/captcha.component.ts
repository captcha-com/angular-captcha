import { Component, Input, Inject, OnInit, ElementRef, Renderer } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

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
    private renderer: Renderer,
    private captchaService: CaptchaService,
    private captchaHelper: CaptchaHelperService,
    @Inject(DOCUMENT) private document: any,
  ) { }

  /**
   * The current captcha id, which will be used for validation purpose.
   */
  get captchaId(): string {
    return this.captchaService.botdetectInstance.captchaId;
  }

  /**
   * Display captcha html markup on component initialize.
   */
  ngOnInit(): void {
    // if styleName is not specified, the styleName will be 'defaultCaptcha'
    if (!this.styleName) {
      this.styleName = 'defaultCaptcha';
    }

    // set captcha style name to CaptchaService for creating BotDetect object
    this.captchaService.styleName = this.styleName;

    // display captcha html markup on view
    this.addScriptToBody();
    this.showHtml();
  }

  /**
   * Display captcha html markup in the <botdetect-captcha> tag.
   */
  showHtml(): void {
    this.captchaService.getHtml()
      .subscribe(
        captchaHtml => {
          this.elementRef.nativeElement.innerHTML = captchaHtml;
          this.addInitScriptToBody();
		  this.removeScriptsNotExecuted();
        },
        error => {
          throw new Error(error);
        });
  }

  /**
   * Reload a new captcha image for the current captcha instance.
   */
  reloadImage(): void {
    this.captchaService.botdetectInstance.reloadImage();
  }

  /**
   * Add BotDetect client-side script include to body element.
   */
  private addScriptToBody(): void {
    if (this.document.getElementsByClassName('BDC_ScriptInclude').length !== 0) {
      // BotDetect client-side script is already added
      return;
    }

    // build BotDetect client-side script include url
    const url = this.captchaHelper.buildUrl(this.captchaService.handlerUrl, {
      get: 'script-include'
    });

    this.document.body.append(this.captchaHelper.scriptInclude(url, 'BDC_ScriptInclude'));
  }

  /**
   * Add BotDetect init script include to body element.
   */
  private addInitScriptToBody(): void {
    // remove included BotDetect init script if it exists
    let initScriptIncluded = this.document.getElementsByClassName('BDC_InitScriptInclude');
    if (initScriptIncluded.length !== 0) {
      this.renderer.invokeElementMethod(initScriptIncluded[0], 'remove');
    }

    const captchaId = this.elementRef.nativeElement.querySelector('#BDC_VCID_' + this.styleName);

    if (!captchaId) {
      return;
    }

    // build BotDetect init script include url.
    const initScriptIncludeUrl = this.captchaHelper.buildUrl(this.captchaService.handlerUrl, {
      get: 'init-script-include',
      c: this.styleName,
      t: captchaId.value
    });

    this.document.body.append(this.captchaHelper.scriptInclude(initScriptIncludeUrl, 'BDC_InitScriptInclude'));
  }

  /**
   * Remove script include and init script in captcha html markup, that are not executed,
   * because we have used innerHTML to display them.
   */
  private removeScriptsNotExecuted(): void {
    const scriptsNotExecuted = this.elementRef.nativeElement.querySelectorAll('script');

    if (scriptsNotExecuted.length === 0) {
      return;
    }

    for (let script of scriptsNotExecuted) {
      this.renderer.invokeElementMethod(script, 'remove');
    }
  }
}
