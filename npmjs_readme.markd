## BotDetect Captcha Angular Module (TypeScript: Angular 2/4/5/6+)

### Requirements:
BotDetect Captcha Angular Module requires [BotDetect Java](https://captcha.com/java-captcha.html#simple-api) or [PHP Captcha](https://captcha.com/php-captcha.html#simple-api) library to generate Captcha challenges. BotDetect ASP.NET (Core) Captcha does not support it yet -- but the support in it is coming soon.

### Quickstart:

##### Step 1: Install Captcha Angular Module
```sh
npm install angular-captcha --save
```
##### Step 2: Load Captcha Angular Module
If you use SystemJS, declare the following in your SystemJS config file:
```javascript
  map: {
    ...
    'angular-captcha': 'npm:angular-captcha'
  },
  packages: {
    ...
    'angular-captcha': {
      defaultExtension: 'js',
      main: 'index'
    },
```
##### Step 3: Declare Captcha Angular Module
- Java Captcha endpoint:
```typescript
import { BotDetectCaptchaModule } from 'angular-captcha';

@NgModule({
  imports: [
    ...
    BotDetectCaptchaModule.forRoot({
      captchaEndpoint: '/botdetect-java-captcha-api-path-at-server-side/botdetectcaptcha'
    })
  ],
  ...
})
```

- PHP Captcha endpoint:
```typescript
import { BotDetectCaptchaModule } from 'angular-captcha';

@NgModule({
  imports: [
    ...
    BotDetectCaptchaModule.forRoot({
      captchaEndpoint: '/botdetect-php-captcha-api-path-at-server-side/simple-botdetect.php'
    })
  ],
  ...
})
```

##### Step 4: Displaying the Captcha Challenge
```html
<botdetect-captcha styleName="exampleCaptcha"></botdetect-captcha>
```

##### Step 5: Client-side Captcha Validation
- Using validateUnsafe(callback) method to validate Captcha code on form submit:
```typescript
export class ExampleComponent {

  /**
   * BotDetect CAPTCHA component.
   */
  @ViewChild(CaptchaComponent) captchaComponent: CaptchaComponent;

  /**
   * On form submit.
   */
  validate(value, valid): void {

    this.captchaComponent.validateUnsafe((isCaptchaCodeCorrect: boolean) => {
      if (isCaptchaCodeCorrect) {
        // Captcha code is correct
      } else {
        // Captcha code is incorrect
      }
    });
  }

}
```

OR

- Using correctCaptcha directive attribute to validate Captcha code on blur event:
```html
<input
  type="text"
  id="captchaCode"
  name="captchaCode"
  #captchaCode="ngModel"
  ngModel
  correctCaptcha
>
```
##### Step 6: Server-side Captcha Validation
These client-side captcha validations are just an UI usability improvement that you may use or not -- they do not protect your form from spammers at all.

As you are protecting some server-side action you must validate a Captcha at the server-side before executing that protected action.

- If you have [Java Captcha](https://captcha.com/java-captcha.html#simple-api) library on a server side validation would look similar to this:
```java
SimpleCaptcha captcha = SimpleCaptcha.load(request);
boolean isHuman = captcha.validate(captchaCode, captchaId);
```

- If you have [PHP Captcha](https://captcha.com/php-captcha.html#simple-api) library on a server side validation would look similar to this:
```php
$captcha = new SimpleCaptcha();
$isHuman = $captcha->Validate($captchaCode, $captchaId);
```

### Documentation:
 
[Angular CAPTCHA Integration Guide](https://captcha.com/angular-captcha.html#angular:2+)

### Examples: 
[Basic Angular CAPTCHA Example](https://captcha.com/doc/angular/examples/angular-basic-captcha-example.html)

[Angular CAPTCHA Form Example](https://captcha.com/doc/angular/examples/angular-form-captcha-example.html)

### Support:

Send us questions, suggestions [contact form on captcha.com](https://captcha.com/contact.html).
