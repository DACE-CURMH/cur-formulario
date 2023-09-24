import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VerifyFormComponent } from './verify-form/verify-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { PreRegistrationFormComponent } from './pre-registration-form/pre-registration-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { CandidateService } from './candidate.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    VerifyFormComponent,
    RegistrationFormComponent,
    PreRegistrationFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DigitOnlyModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [CandidateService, provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
