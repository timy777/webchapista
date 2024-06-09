import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { LoggingInterceptor } from './http-interceptors/logging-interceptor';
import { ModalcomponentComponent } from './modal/components/modalcomponent.component';
/* our own custom services  */
// e.g:
// import { ContactService } from '@app/core/contact.service';

// services across the app
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    AuthInterceptor,
    LoggingInterceptor
    // ContactService
  ],
 

})

export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
