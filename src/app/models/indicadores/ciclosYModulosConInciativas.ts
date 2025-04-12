// Indicador 3

export interface Modulo {
    id_modulo: number;
    nombre_modulo: string;
}

export interface Ciclo {
    id_ciclo: number;
    nombre_ciclo: string;
    modulos: Modulo[];
}

export interface CiclosYModulosConInciativas {
    id: number;
    nombre_iniciativa: string;
    ciclos: Ciclo[];
}
