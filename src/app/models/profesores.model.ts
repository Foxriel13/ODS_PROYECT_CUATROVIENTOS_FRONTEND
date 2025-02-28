export class Profesores {
    idProfesor: number;  // Definido como número si es un identificador
    nombre: string;  // El nombre de la dimensión

    // Constructor para inicializar la clase
    constructor(idProfesor: number, nombre: string) {
        this.idProfesor = idProfesor;
        this.nombre = nombre;
    }
}
