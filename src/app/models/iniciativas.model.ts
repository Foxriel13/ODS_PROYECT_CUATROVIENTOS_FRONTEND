export class Iniciativas {
    id: number;
    accion: string;
    horas: string;
    nombre: string;
    producto_final: string;
    fecha_inicio: string;
    fecha_fin: string;
    ods: string;
    curso:string;
    eliminado: boolean;
    imagen: string;  // Añadir la propiedad imagenUrl

    // Constructor que recibe todos los parámetros necesarios
    constructor(
        id: number,
        accion: string,
        horas: string,
        nombre: string,
        producto_final: string,
        fecha_inicio: string,
        fecha_fin: string,
        ods: string,
        curso:string,
        eliminado: boolean,
        imagen: string  // Añadir imagenUrl al constructor
    ) {
        this.id = id;
        this.accion = accion;
        this.horas = horas;
        this.nombre = nombre;
        this.producto_final = producto_final;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.ods = ods;
        this.curso = curso;
        this.eliminado = eliminado;
        this.imagen = imagen;  // Asignar imagenUrl
    }
}
