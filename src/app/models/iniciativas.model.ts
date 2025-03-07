import { entidadesExternas } from "./entidades_externas.model";
import { Metas } from "./metas.model";  // Importar Metas correctamente
import { Modulos } from "./modulos.model";
import { Profesores } from "./profesores.model";

export class Iniciativas {
    id: number;
    tipo: string;
    horas: number;
    nombre: string;
    producto_final: string;
    fecha_registro: string;
    fecha_inicio: string;
    fecha_fin: string;
    anyo_lectivo : string;
    eliminado: boolean;
    innovador: boolean;
    imagen: string;
    metas: Metas[];  // Ahora está correctamentxe tipado como un array de Metas
    profesores: Profesores[];  // Supongo que debería ser un array de strings
    entidades_Externas: entidadesExternas[];  // Supongo que debería ser un array de strings
    modulos: Modulos[];  // Supongo que debería ser un array de strings

    // Constructor para inicializar la clase
    constructor(
        id: number,
        tipo: string,
        horas: number,
        nombre: string,
        producto_final: string,
        fecha_registro: string,
        fecha_inicio: string,
        fecha_fin: string,
        anyo_lectivo: string,
        eliminado: boolean,
        imagen: string,
        metas: Metas[],
        profesores: Profesores[],  // Tipificado correctamente
        entidades_Externas: entidadesExternas[],  // Tipificado correctamente
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
        this.anyo_lectivo = anyo_lectivo;
        this.eliminado = eliminado;
        this.imagen = imagen;
        this.metas = metas;
        this.profesores = profesores;
        this.entidades_Externas = entidades_Externas;
        this.modulos = modulos;
        this.innovador = innovador;  // Inicializa el campo 'innovador'
    }
    
}
