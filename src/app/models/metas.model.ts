import { Ods } from './ods.model';

export class Metas {
  id: number;
  descripcion: string;
  ods: Ods;
  eliminado: boolean;

  constructor(id: number, descripcion: string, ods: Ods, eliminado: boolean) {
    this.id = id;
    this.descripcion = descripcion;
    this.ods = ods;
    this.eliminado = eliminado;
  }
}


