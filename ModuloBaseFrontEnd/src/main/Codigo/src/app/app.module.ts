import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from './shared';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@env/environment';
import { AuthInterceptor } from './core/http-interceptors/auth-interceptor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GlobalModule } from './core/global/global.module';
import { HomeComponent } from './core/home/components/home.component';
import { NoAutorizadoComponent } from './core/auth/noautorizado/components/no.autorizado.component';
import { LoginComponent } from './core/auth/login/components/login.component';
import { HeaderComponent } from './core/header/header.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { AuthGuard } from './core/guards/auth.guard';
import { TableModule } from 'primeng/table';
import { UsuarioComponent } from './core/usuario/components/usuario.component';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { PanelModule } from 'primeng/panel';
import { RolComponent } from './core/roles/components/rol.component';
import { GrupoComponent } from './core/grupo/components/grupo.component';
import { BitacoraComponent } from './core/bitacora/components/bitacora.component';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule, DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ParametroComponent } from './core/parametro/components/parametro.component';
import { TreeTableModule } from 'primeng/treetable';
import { InputSwitchModule } from 'primeng/inputswitch';
import { NoEnctradoComponent } from './core/auth/noencontrado/components/no.encontrado.component';
import { SpinnerModule } from 'primeng/spinner';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EtiquetaComponent } from './core/etiqueta/components/etiqueta.component';
import { PasswordModule } from 'primeng/password';
import { EditorModule } from 'primeng/editor';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SliderModule } from 'primeng/slider';
import { FileUploadModule } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';
import { ListboxModule } from 'primeng/listbox';
import { LogSistemaComponent } from './core/log-sistema/components/log.sistema.component';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { SesionExpiradaComponent } from './core/auth/sesion.expirada/components/sesion.expirada.component';
import { SesionInactivaComponent } from './core/auth/sesion.inactiva/sesion.inactiva.component';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ChartModule } from 'primeng/chart';
import {RadioButtonModule} from 'primeng/radiobutton';
import { ModalcomponentComponent } from './core/modal/components/modalcomponent.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { CopyPasteDirective } from './services/copy-paste.service';
import { NoCaheInterceptor } from './core/http-interceptors/nocahe-interceptor'; // Ajusta la ruta según tu estructura
import { CronEditorModule } from 'ngx-cron-editor';
import { DEFAULT_TIMEOUT, TimeoutInterceptor } from './core/http-interceptors/TimeOut-interceptor';
@NgModule({
  declarations: [
    
    AppComponent,
    DashboardComponent,
    HomeComponent,
    NoAutorizadoComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    UsuarioComponent,
    RolComponent,
    GrupoComponent,
    BitacoraComponent,
    ParametroComponent,
    NoEnctradoComponent,
    EtiquetaComponent,
    LogSistemaComponent,
    SesionExpiradaComponent,
    SesionInactivaComponent,
    ModalcomponentComponent,
    CopyPasteDirective
  ],
  imports: [
    ChartModule,
    RadioButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),
    AppRoutingModule,
    GlobalModule.forRoot(),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    SharedModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    MessageModule,
    InputTextModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    BlockUIModule,
    PanelModule,
    FormsModule,
    CalendarModule,
    CommonModule,
    TreeTableModule,
    InputSwitchModule,
    SpinnerModule,
    ColorPickerModule,
    InputTextareaModule,
    PasswordModule,
    CheckboxModule,
    EditorModule,
    AutoCompleteModule,
    SliderModule,
    FileUploadModule,
    MultiSelectModule,
    ListboxModule,
    SidebarModule,
    ToastModule,
    DialogModule,
    AccordionModule,
    CronEditorModule,
    ContextMenuModule
  ],
  exports: [CopyPasteDirective],
  providers: [
    
    AuthGuard,
    ConfirmationService,
    MessageService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NoCaheInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
    { provide: DEFAULT_TIMEOUT, useValue: 30000 }
    //   { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {
  
}


// ...




