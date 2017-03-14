import { Directive, forwardRef, HostListener } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl, Validator } from '@angular/forms';

import { CaptchaService } from './captcha.service';

@Directive({
  selector: '[correctCaptcha][formControlName],[correctCaptcha][formControl],[correctCaptcha][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => CorrectCaptchaDirective),
      multi: true
    }
  ]
})
export class CorrectCaptchaDirective implements Validator {

  /**
   * Cached captcha input control.
   */
  control: AbstractControl;

  constructor(private captchaService: CaptchaService) { }

  validate(c: AbstractControl, onBlur?: boolean) {
    if (c) {
      // cache the control for using on blur
      this.control = c;
    }

    return new Promise((resolve: any) => {
      // the control should have incorrect status first
      resolve({ correctCaptcha: true });

      // we only validate the captcha on blur
      if (onBlur) {
        let captchaCode = this.control.value;

        if (captchaCode) {
          this.captchaService.validate(captchaCode)
            .subscribe(
              isHuman => {
                if (!isHuman) {
                  // ui captcha validation failed
                  this.captchaService.botdetectInstance.reloadImage();
                  this.control = null;
                } else {
                  // ui captcha validation passed
                  this.control.setErrors(null);
                }
              },
              error => {
                throw new Error(error);
              }
            );
        }
      }
    });
  }

  @HostListener('blur') onBlur() {
    this.validate(undefined, true);
  }

}
