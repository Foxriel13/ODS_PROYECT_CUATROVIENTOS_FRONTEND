import { entidades_externas } from "./entidades_externas.model";
import { Metas } from "./metas.model";  // Importar Metas correctamente
import { Modulos } from "./modulos.model";
import { Profesores } from "./profesores.model";

export class Iniciativas {
    id: number;
    tipo: string;
    horas: string;
    nombre: string;
    producto_final: string;
    fecha_registro: string;
    fecha_inicio: string;
    fecha_fin: string;
    eliminado: boolean;
    innovador: boolean;
    imagen: string;
    metas: Metas[];  // Ahora está correctamentxe tipado como un array de Metas
    profesores: Profesores[];  // Supongo que debería ser un array de strings
    entidades_externas: entidades_externas[];  // Supongo que debería ser un array de strings
    modulos: Modulos[];  // Supongo que debería ser un array de strings

    // Constructor para inicializar la clase
    constructor(
        id: number,
        tipo: string,
        horas: string,
        nombre: string,
        producto_final: string,
        fecha_registro: string,
        fecha_inicio: string,
        fecha_fin: string,
        eliminado: boolean,
        imagen: string,
        metas: Metas[],
        profesores: Profesores[],  // Tipificado correctamente
        entidades_externas: entidades_externas[],  // Tipificado correctamente
        modulos: Modulos[],  // Tipificado correctamente
        innovador: boolean  // Se añade el parámetro 'innovador'
    ) {
        this.id = id;
        this.tipo = tipo;
        this.horas = horas;
        this.nombre = nombre;
        this.producto_final = producto_final;
        this.fecha_registro = fecha_registro;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.eliminado = eliminado;
        this.imagen = imagen;
        this.metas = metas;
        this.profesores = profesores;
        this.entidades_externas = entidades_externas;
        this.modulos = modulos;
        this.innovador = innovador;  // Inicializa el campo 'innovador'
    }
}
