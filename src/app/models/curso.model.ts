export class Curso {
    idCurso: number;  // Definido como número si es un identificador
    nombre: string;  // El nombre de la dimensión

    // Constructor para inicializar la clase
    constructor(idCurso: number, nombre: string) {
        this.idCurso = idCurso;
        this.nombre = nombre;
    }
}
