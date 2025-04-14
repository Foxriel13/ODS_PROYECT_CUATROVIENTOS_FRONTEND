import { Ods } from "../ods.model";

export class OdsTrabajadosYSusMetas{
    idIniciativa: number;
    nombreIniciativa: string;
    ods: Ods[]

    constructor(idIniciativa: number, nombreIniciativa: string, ods: Ods[]){
        this.idIniciativa = idIniciativa
        this.nombreIniciativa = nombreIniciativa,
        this.ods = ods
    }
}