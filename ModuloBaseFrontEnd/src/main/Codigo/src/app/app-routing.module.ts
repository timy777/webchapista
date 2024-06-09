import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@app/core/auth/login/components/login.component';
import { HomeComponent } from '@app/core/home/components/home.component';
import { NoAutorizadoComponent } from '@app/core/auth/noautorizado/components/no.autorizado.component';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { UsuarioComponent } from './core/usuario/components/usuario.component';
import { RolComponent } from './core/roles/components/rol.component';
import { GrupoComponent } from './core/grupo/components/grupo.component';
import { BitacoraComponent } from './core/bitacora/components/bitacora.component';
import { ParametroComponent } from './core/parametro/components/parametro.component';
import { environment } from '@env/environment';
import { NoEnctradoComponent } from './core/auth/noencontrado/components/no.encontrado.component';
import { EtiquetaComponent } from './core/etiqueta/components/etiqueta.component';
import { LogSistemaComponent } from './core/log-sistema/components/log.sistema.component';
import { SesionExpiradaComponent } from './core/auth/sesion.expirada/components/sesion.expirada.component';
import { SesionInactivaComponent } from './core/auth/sesion.inactiva/sesion.inactiva.component';

export const routes: Routes = [
  {
    path: environment.maLongin,
    component: LoginComponent,
  },
  {
    path: environment.maUsuario,
    component: UsuarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: environment.maParametro,
    component: ParametroComponent,
    canActivate: [AuthGuard]
  },
  {
    path: environment.maBitacora,
    component: BitacoraComponent,
    canActivate: [AuthGuard]
  },
  {
    path: environment.maLogsSistema,
    component: LogSistemaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: environment.maGrupo,
    component: GrupoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: environment.maRol,
    component: RolComponent,
    canActivate: [AuthGuard]
  },
  {
    path: environment.maEtiqueta,
    component: EtiquetaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: environment.maSesionExpirada,
    component: SesionExpiradaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: environment.maSesionInactiva,
    component: SesionInactivaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: environment.maNoAutorizado,
    component: NoAutorizadoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: environment.maDashboard,
    component: HomeComponent,
    canActivate: [AuthGuard]
  },

  {
    path: environment.maNoEncontrado,
    component: NoEnctradoComponent,
  },
  {
    path: '**',
    component: NoEnctradoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing: false }  // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
