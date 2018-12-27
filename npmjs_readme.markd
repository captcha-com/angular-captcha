## BotDetect Captcha Angular Module (TypeScript: Angular 2/3/4/5/6/7+)

### Requirements:
BotDetect Captcha Angular Module requires [BotDetect ASP.NET Captcha](https://captcha.com/asp.net-captcha.html#simple-api), [BotDetect Java Captcha](https://captcha.com/java-captcha.html#simple-api) or [BotDetect PHP Captcha](https://captcha.com/php-captcha.html#simple-api) library to generate Captcha challenges. Simple API support for ASP.NET Core and .NET Core will be released this month -- very likely during the week of 2018/11/19-25. See our [roadmap](https://captcha.com/captcha-roadmap-and-release-notes.html#aspnet-release-notes) for details.

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
##### Step 3: Declare BotDetect Captcha Angular Module in your application, and configure backend Captcha endpoint

Endpoint Configuration depends on which technology you use in the backend.

- ASP.NET-based backend:

```typescript
import { BotDetectCaptchaModule } from 'angular-captcha';

@NgModule({
  imports: [
    ...
    BotDetectCaptchaModule.forRoot({
      captchaEndpoint: 'captcha-endpoint/BotDetectCaptcha.ashx'
    })
  ],
  ...
})
```

- Java-based backend:
```typescript
import { BotDetectCaptchaModule } from 'angular-captcha';

@NgModule({
  imports: [
    ...
    BotDetectCaptchaModule.forRoot({
      captchaEndpoint: 'captcha-endpoint/botdetectcaptcha'
    })
  ],
  ...
})
```

- PHP-based backend:
```typescript
import { BotDetectCaptchaModule } from 'angular-captcha';

@NgModule({
  imports: [
    ...
    BotDetectCaptchaModule.forRoot({
      captchaEndpoint: 'captcha-endpoint/simple-botdetect.php'
    })
  ],
  ...
})
```

##### Step 4: Displaying the Captcha Challenge in your form

Place the following tag in your form where you want to display Captcha:
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
These client-side captcha validations are just an usability improvement that you may use or not -- they do not protect your form from spammers at all.

As you are protecting some server-side action you must validate a Captcha at the server-side before executing that protected action.

- If you have [ASP.NET Captcha](https://captcha.com/asp.net-captcha.html#simple-api) library on a server side validation would look similar to this:
```csharp
// C#
SimpleCaptcha captcha = new SimpleCaptcha();
bool isHuman = captcha.Validate(captchaCode, captchaId);
```
```vbnet
' VB.NET
Dim captcha As SimpleCaptcha = New SimpleCaptcha()
Dim isHuman As Boolean = captcha.Validate(captchaCode, captchaId)
```

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
