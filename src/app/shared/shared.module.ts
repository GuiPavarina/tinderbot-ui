import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormComponent} from './form/form.component';
import { Bootstrap4FrameworkModule } from 'angular6-json-schema-form';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    Bootstrap4FrameworkModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  declarations: [
    FormComponent
  ],
  exports: [
    FormComponent
  ]
})
export class SharedModule { }
