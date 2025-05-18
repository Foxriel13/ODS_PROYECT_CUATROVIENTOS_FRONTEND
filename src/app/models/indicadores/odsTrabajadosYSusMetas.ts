export class Meta {
    nombre_meta: string;

    constructor(nombre_meta: string) {
        this.nombre_meta = nombre_meta;
    }
}

export class Ods {
    nombre_ods: string;
    metas: Meta[];

    constructor(nombre_ods: string, metas: Meta[]) {
        this.nombre_ods = nombre_ods;
        this.metas = metas;
    }
}

export class OdsTrabajadosYSusMetas {
    nombre_Iniciativa: string;
    ods: Ods[];

    constructor(nombre_Iniciativa: string, ods: Ods[]) {
        this.nombre_Iniciativa = nombre_Iniciativa;
        this.ods = ods;
    }
}