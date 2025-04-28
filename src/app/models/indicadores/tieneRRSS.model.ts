import { Redes_Sociales } from "../redes_sociales";

export class TieneRRSS{
    nombre_iniciativa: string;
    redes_sociales: Redes_Sociales;

    constructor(nombre_iniciativa: string, redes_sociales: Redes_Sociales){
        this.nombre_iniciativa = nombre_iniciativa
        this.redes_sociales = redes_sociales
    }
}