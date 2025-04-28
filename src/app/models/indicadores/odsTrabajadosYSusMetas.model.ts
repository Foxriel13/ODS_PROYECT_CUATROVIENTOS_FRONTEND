import { Ods } from "../ods.model";

export class OdsTrabajadosYSusMetas{
    id_iniciativa: number;
    nombre_Iniciativa: string;
    ods: Ods[]

    constructor(id_iniciativa: number, nombre_Iniciativa: string, ods: Ods[]){
        this.id_iniciativa = id_iniciativa
        this.nombre_Iniciativa = nombre_Iniciativa,
        this.ods = ods
    }
}