import { ModuloOutput } from '../auth/login/dto/modulo.output';
import { TreeNode } from 'primeng/api';
import { FormularioOutput } from '../auth/login/dto/formulario.output';

export class ConvertUtil {

    public static partialSelecctionFormulario(formulario: FormularioOutput, seleccionadosTree: TreeNode[]): number {
        let resultado = 0;

        for (let accion of formulario.acciones) {
            seleccionadosTree.forEach(st => {
                if (st.data.id === accion.id) {
                    resultado++;
                }
            });
        }

        if (resultado === formulario.acciones.length) {
            return 2;
        }

        return (resultado > 0) ? 1 : 0;
    }

    public static partialSelecctionModulo(modulo: ModuloOutput, seleccionadosTree: TreeNode[]): number {
        let resultado = 0;
        let partial = true;

        for (let formulario of modulo.formularios) {
            const temp = this.partialSelecctionFormulario(formulario, seleccionadosTree);

            if (temp > 0) {
                resultado++;

                if (temp === 1) {
                    partial = false;
                }
            }
        }

        return (resultado > 0) ? ((partial) ? 1 : 2) : 0;
    }

    public static accionToTree(formulario: FormularioOutput, seleccionadosTree: TreeNode[]): TreeNode[] {
        let acciones: TreeNode[] = [];

        for (let accion of formulario.acciones) {
            let nuevo = true;

            seleccionadosTree.forEach(st => {
                if (st.data.id === accion.id) {
                    nuevo = false;
                    acciones.push(st);
                }
            });

            if (nuevo) {
                acciones.push({
                    data: accion,
                    selectable: true,
                    expanded: true,
                    children: []
                });
            }
        }

        return acciones;
    }

    public static formularioToTree(modulo: ModuloOutput, seleccionadosTree: TreeNode[]): TreeNode[] {
        let formularios: TreeNode[] = [];

        for (let formulario of modulo.formularios) {
            const temp = this.partialSelecctionFormulario(formulario, seleccionadosTree);

            const formu = {
                data: formulario,
                children: this.accionToTree(formulario, seleccionadosTree),
                selectable: (temp === 0),
                expanded: true,
                partialSelected: (temp > 0)
            };

            formularios.push(formu);
        }

        return formularios;
    }

    public static moduloToTree(modulos: ModuloOutput[], seleccionadosTree: TreeNode[]): TreeNode[] {
        let resultado: TreeNode[] = [];

        for (const modulo of modulos) {
            const temp = this.partialSelecctionModulo(modulo, seleccionadosTree);

            resultado.push({
                data: modulo,
                children: this.formularioToTree(modulo, seleccionadosTree),
                selectable: (temp === 0),
                expanded: true,
                partialSelected: (temp > 0)
            });
        }

        return resultado;
    }

}