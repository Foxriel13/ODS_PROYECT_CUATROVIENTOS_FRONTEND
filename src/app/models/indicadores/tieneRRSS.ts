// Indicador 7

export class redesSociales {
    nombreRRSS: string;
    enlace: string;

    constructor(nombreRRSS: string, enlace: string) {
        this.nombreRRSS = nombreRRSS;
        this.enlace = enlace;
    }
}

export class TieneRRSS {
    nombre_iniciativa: string;
    redes_sociales: redesSociales[];

    constructor(nombre_iniciativa: string, redes_sociales: redesSociales[]) {
        this.nombre_iniciativa = nombre_iniciativa;
        this.redes_sociales = redes_sociales;
    }
}