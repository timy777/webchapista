export class Endpoints {

  // FORMULARIOS
  public static get FORM_ROL(): string { return `/rol`; }
  public static get FORM_USUARIO(): string { return `/usuario`; }
  public static get FORM_GRUPO(): string { return `/grupo`; }
  public static get FORM_PARAMETRO(): string { return `/parametro`; } // NO TIENE PERMISO
  public static get FORM_ETIQUETA(): string { return `/etiqueta`; }
  public static get FORM_BITACORA(): string { return `/bitacora`; }   // NO TIENE PERMISO
  public static get FORM_LOG_SISTEMA(): string { return `/logs/sistema`; }  // NO TIENE PERMISO

  // ACCIONES
  public static get LOG_SISTEMA(): string { return `/logs/sistema`; }
  public static get LOGIN(): string { return `/autenticacion`; }
  public static get PERFIL(): string { return `/perfiles`; }
  public static get PERFIL_CAMBIO_CONTRASENA(): string { return `/perfiles/contrasena/cambio`; }
  public static get PERFIL_CAMBIO_CONTRASENALOGIN(): string { return `/perfiles/contrasena/cambioLogin`; }
  public static get ETIQUETAS(): string { return `/etiquetas`; }
  public static get ETIQUETA_POR_LLAVE(): string { return `/etiquetas/by/llave`; }
  public static get ETIQUETA_POR_GRUPO(): string { return '/etiquetas/by/grupo'; }
  public static get USUARIOS(): string { return `/usuarios`; }
  public static get ROLES(): string { return `/roles`; }
  public static get GRUPOS(): string { return `/grupos`; }
  public static get PARAMETROSCONEXION(): string { return `/parametrosconexion`; }

  public static get BITACORAS(): string { return `/bitacoras`; }
  public static get PARAMETROS(): string { return `/parametros`; }
  public static get TIPOS_PARAMETROS(): string { return `/tipos/parametros`; }
  public static get PERMISOS(): string { return `/permisos`; }
  public static get PERMISOS_POR_ROL(): string { return `/permisos/rol/`; }
  public static get ROL_TIPO_PARAMETRO_PERMISOS(): string { return `/permisos/tipos/parametros`; }
  public static get ROL_TIPO_PARAMETRO_PERMISOS_POR_ROL(): string { return `/permisos/tipos/parametros/rol/`; }
  public static get HABILITARUSUARIO(): string { return `/usuarios/habilitar`; }
  public static get INHABILITARUSUARIO(): string { return `/usuarios/inhabilitar`; }


}
