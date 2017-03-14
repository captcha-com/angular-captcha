import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';

import { CaptchaComponent } from './captcha.component';
import { CaptchaService } from './captcha.service';
import { CaptchaHelperService } from './captcha-helper.service';
import { CorrectCaptchaDirective } from './correct-captcha.directive';
import { BaseUrlPipe } from './base-url.pipe';
import { HandlerPathPipe } from './handler-path.pipe';
import { CaptchaSettings } from './captcha-settings.interface';
import { CAPTCHA_SETTINGS } from './config';

@NgModule({
  imports: [
    HttpModule
  ],
  declarations: [
    BaseUrlPipe,
    HandlerPathPipe,
    CaptchaComponent,
    CorrectCaptchaDirective
  ],
  exports: [
    CaptchaComponent,
    CorrectCaptchaDirective
  ]
})
export class BotDetectCaptchaModule {

  static forRoot(config: CaptchaSettings): ModuleWithProviders {
    return {
      ngModule: BotDetectCaptchaModule,
      providers: [provideBotDetectCaptcha(config)]
    };
  }

  static forChild(config: CaptchaSettings): ModuleWithProviders {
    return {
      ngModule: BotDetectCaptchaModule,
      providers: [provideBotDetectCaptcha(config)]
    };
  }
}

export function provideBotDetectCaptcha(config: CaptchaSettings): any {
  return [
    {
      provide: CAPTCHA_SETTINGS,
      useValue: config
    },
    BaseUrlPipe,
    HandlerPathPipe,
    CaptchaService,
    CaptchaHelperService
  ];
}
