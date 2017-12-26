import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CaptchaComponent } from './captcha.component';
import { CaptchaService } from './captcha.service';
import { CaptchaHelperService } from './captcha-helper.service';
import { CorrectCaptchaDirective } from './correct-captcha.directive';
import { CaptchaEndpointPipe } from './captcha-endpoint.pipe';
import { CaptchaSettings } from './captcha-settings.interface';
import { CAPTCHA_SETTINGS } from './config';

@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: [
    CaptchaEndpointPipe,
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
    CaptchaEndpointPipe,
    CaptchaService,
    CaptchaHelperService
  ];
}
