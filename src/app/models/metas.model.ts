// metas.model.ts
import { Ods } from './ods.model';  // Asegúrate de importar Ods correctamente


export class Metas {
  id: number;
  descripcion: string;
  ods: Ods;  // Puede ser un array o un solo objeto
  eliminado: boolean;

  constructor(id: number, descripcion: string, ods: Ods, eliminado: boolean) {
    this.id = id;
    this.descripcion = descripcion;
    this.ods = ods;
    this.eliminado = eliminado;
  }
}


