## BotDetect CAPTCHA Angular Module (TypeScript: Angular 2/4/5/6/7/8+)

For a comprehensive step-by-step integration guide please see our [Angular Captcha Module Integration Guide](https://captcha.com/angular-captcha.html).  
The guide covers the integration with the following backends:
- ASP.NET (Core): web API with MVC Core
- ASP.NET (Legacy): Web-API2, MVC1-5, Generic Handler
- Java: Servlet, Spring, Struts
- PHP: the plain PHP

To give you a hint how Angular Captcha Module works we pasted bellow a few excerpts from the Integration Guide.

### Quick guide:

##### Step 1:  Install Angular Captcha Module

```sh
npm install angular-captcha --save
```

and add the following lines into the import section of your app's app.module.ts file:

```typescript
// import the Angular Captcha Module 
import { BotDetectCaptchaModule } from 'angular-captcha'; 

@NgModule({
  imports: [
    ...
    BotDetectCaptchaModule
  ],
  ...
})
```

##### Step 2: Set the captchaEndpoint in Your App's Frontend

Endpoint configuration depends on which technology you use in the backend.

- ASP.NET-based backend:

```typescript
import { CaptchaComponent } from 'angular-captcha'; 
 
export class YourFormWithCaptchaComponent {

  ngOnInit(): void {
    this.captchaComponent.captchaEndpoint = 
      'https://your-app-backend-hostname.your-domain.com/simple-captcha-endpoint.ashx';
  }
```

- Java-based backend:

```typescript
import { CaptchaComponent } from 'angular-captcha'; 

export class YourFormWithCaptchaComponent {

  ngOnInit(): void {
    this.captchaComponent.captchaEndpoint = 
      'https://your-app-backend-hostname.your-domain.com/simple-captcha-endpoint';
  }
```

- PHP-based backend:
```typescript
import { CaptchaComponent } from 'angular-captcha'; 

export class YourFormWithCaptchaComponent {

  ngOnInit(): void {
    this.captchaComponent.captchaEndpoint = 
      'https://your-app-backend-hostname.your-domain.com/botdetect-captcha-lib/simple-botdetect.php';
  }
```

##### Step 3: Displaying the Captcha Challenge in Your Form

Place the following lines in your form where you want to display captcha:
```html
<botdetect-captcha captchaStyleName="yourFirstCaptchaStyle"></botdetect-captcha>  
<input id="userCaptchaInput" 
  name="userCaptchaInput" 
  ngModel 
  #userCaptchaInput="ngModel"  
  type="text" >  
```

##### Step 4: Captcha Validation: Client-side Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { YourFormWithCaptchaService } from './your-form-with-captcha.service';

import { CaptchaComponent } from 'angular-captcha';

@Component({
  moduleId: module.id,
  selector: 'your-form-with-captcha',
  templateUrl: 'your-form-with-captcha.component.html',
  styleUrls: ['your-form-with-captcha.component.css'],
  providers: [YourFormWithCaptchaService]
})
export class YourFormWithCaptchaComponent {

  // uncomment the line bellow if you use Angular 2/4/5/6/7
  // @ViewChild(CaptchaComponent) captchaComponent: CaptchaComponent;

  // uncomment the line bellow if you use Angular 8
  // @ViewChild(CaptchaComponent, { static: true }) captchaComponent: CaptchaComponent;

  constructor(
    private yourFormWithCaptchaService: YourFormWithCaptchaService
  ) { }

  // Process the form on submit event.
  validate(value, valid): void {

    // get the user-entered captcha code value to be validated at the backend side        
    let userEnteredCaptchaCode = this.captchaComponent.userEnteredCaptchaCode;
    
    // get the id of a captcha instance that the user tried to solve
    let captchaId = this.captchaComponent.captchaId;

    const postData = {
      userEnteredCaptchaCode: userEnteredCaptchaCode,
      captchaId: captchaId
    };

    // post the captcha data to the /your-app-backend-path on your backend
    this.yourFormWithCaptchaService.send(postData)
      .subscribe(
        response => {
          if (response.success == false) {
            // captcha validation failed; reload image
            this.captchaComponent.reloadImage();
            // TODO: maybe display an error message, too
          } else {
            // TODO: captcha validation succeeded; proceed with the workflow
          }
        },
        error => {
          throw new Error(error);
        });
  }
}
```

##### Step 5: Captcha Validation: Server-side Code

The `userEnteredCaptchaCode` and `captchaId` values posted from the frontend are used to validate a captcha challenge on the backend.

The validation is performed by calling the: `Validate(userEnteredCaptchaCode, captchaId)`.

- If you have [ASP.NET Captcha](https://captcha.com/asp.net-captcha.html) library on a server side validation would look similar to this:
```csharp
// C#
SimpleCaptcha yourFirstCaptcha = new SimpleCaptcha();
bool isHuman = yourFirstCaptcha.Validate(userEnteredCaptchaCode, captchaId);
```
```vbnet
' VB.NET
Dim yourFirstCaptcha As SimpleCaptcha = New SimpleCaptcha()
Dim isHuman As Boolean = yourFirstCaptcha.Validate(userEnteredCaptchaCode, captchaId)
```

- If you have [Java Captcha](https://captcha.com/java-captcha.html) library on a server side validation would look similar to this:
```java
SimpleCaptcha yourFirstCaptcha = SimpleCaptcha.load(request);
boolean isHuman = yourFirstCaptcha.validate(userEnteredCaptchaCode, captchaId);
```

- If you have [PHP Captcha](https://captcha.com/php-captcha.html) library on a server side validation would look similar to this:
```php
$yourFirstCaptcha = new SimpleCaptcha();
$isHuman = $yourFirstCaptcha->Validate($userEnteredCaptchaCode, $captchaId);
```

### Documentation:

[Angular Captcha Module Step-by-step Integration Guide](https://captcha.com/angular-captcha.html) -- read this one first

[Angular Captcha Module Basic Example](https://captcha.com/doc/angular/examples/angular-basic-captcha-example.html) -- partial code walk-through

[Angular Captcha Module Form Example](https://captcha.com/doc/angular/examples/angular-form-captcha-example.html) -- partial code walk-through

### Dependencies:

The current version of the Angular Captcha Module requires one of the following BotDetect CAPTCHA backends:
- [ASP.NET v4.4.2+](https://captcha.com/asp.net-captcha.html)
- [Java v4.0.Beta3.7+](https://captcha.com/java-captcha.html)
- [PHP v4.2.5+](https://captcha.com/php-captcha.html)


### Support:

Send us questions, suggestions [contact form on captcha.com](https://captcha.com/contact.html).