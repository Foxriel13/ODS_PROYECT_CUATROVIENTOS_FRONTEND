// metas.model.ts
import { Ods } from './ods.model';  // Asegúrate de importar Ods correctamente

export class Metas {
  idMetas: number;
  descripcion: string;
  ods: Ods[] | Ods;  // Puede ser un array o un solo objeto

  constructor(idMetas: number, descripcion: string, ods: Ods[] | Ods) {
    this.idMetas = idMetas;
    this.descripcion = descripcion;
    this.ods = ods;
  }
}
