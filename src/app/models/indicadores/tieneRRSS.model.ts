import { Redes_Sociales } from "../redes_sociales";

export class TieneRRSS{
    nombreIniciativa: string;
    redesSociales: Redes_Sociales;

    constructor(nombreIniciativa: string, redesSociales: Redes_Sociales){
        this.nombreIniciativa = nombreIniciativa
        this.redesSociales = redesSociales
    }
}