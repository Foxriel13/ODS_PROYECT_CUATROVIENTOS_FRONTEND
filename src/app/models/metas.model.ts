// metas.model.ts
import { Ods } from './ods.model';  // Asegúrate de importar Ods correctamente

export class Metas {
  id: number;
  descripcion: string;
  idOds: Ods;  // Puede ser un array o un solo objeto

  constructor(id: number, descripcion: string, idOds: Ods) {
    this.id = id;
    this.descripcion = descripcion;
    this.idOds = idOds;
  }
}
