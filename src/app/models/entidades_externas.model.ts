export class entidades_externas {
    idEntidades_externa: number;  // Definido como número si es un identificador
    nombre: string;  // El nombre de la dimensión

    // Constructor para inicializar la clase
    constructor(idEntidades_externa: number, nombre: string) {
        this.idEntidades_externa = idEntidades_externa;
        this.nombre = nombre;
    }
}
