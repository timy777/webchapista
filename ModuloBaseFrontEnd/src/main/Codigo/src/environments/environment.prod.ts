const contextoInterno = {
  contexto: 'v1',
};

const urls = {
  moduloInternoAdministracion: contextoInterno.contexto + '/administracion',
  moduloInternoParametrizacion: contextoInterno.contexto + '/parametrizacion',
};

export const environment = {
  production: true,
  contexto: contextoInterno.contexto,
  maSesionExpirada: urls.moduloInternoAdministracion + '/sesionExpirada',
  maSesionInactiva: urls.moduloInternoAdministracion + '/sesionInactiva',
  maLongin: urls.moduloInternoAdministracion + '/login',
  maUsuario: urls.moduloInternoAdministracion + '/usuario',
  maParametro: urls.moduloInternoAdministracion + '/parametro',
  maBitacora: urls.moduloInternoAdministracion + '/bitacora',
  maLogsSistema: urls.moduloInternoAdministracion + '/logs/sistema',
  maGrupo: urls.moduloInternoAdministracion + '/grupo',
  maRol: urls.moduloInternoAdministracion + '/rol',
  maNoAutorizado: urls.moduloInternoAdministracion + '/noautorizado',
  maNoEncontrado: urls.moduloInternoAdministracion + '/noencontrado',
  maDashboard: urls.moduloInternoAdministracion + '/dashboard',
  maEtiqueta: urls.moduloInternoAdministracion + '/etiqueta',
  
  
};

