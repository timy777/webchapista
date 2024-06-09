import { Page } from './page';
import { Paginacion } from './paginacion';

export interface IService<I, T, P> {

    obtener(id: P): Promise<T>;

    listar(params?: Map<string, string>, input?: Paginacion): Promise<Page<T>>;

    crear(input: I): Promise<T>;

    actualizar(input: I, id: P): Promise<T>;

    eliminar(id: P): Promise<{}>;

}