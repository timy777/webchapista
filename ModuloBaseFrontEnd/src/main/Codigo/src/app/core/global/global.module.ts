import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

/** avoid app module full of declarations */
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule,
    NgbModule
  ],
  declarations: [
  ]
})

export class GlobalModule {
  // OAC
	//static forRoot(): ModuleWithProviders {
	static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: GlobalModule
    };
  }
}