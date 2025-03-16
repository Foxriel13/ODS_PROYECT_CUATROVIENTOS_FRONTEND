import { entidadesExternas } from "./entidades_externas.model";
import { Metas } from "./metas.model";  // Importar Metas correctamente
import { Modulos } from "./modulos.model";
import { Profesores } from "./profesores.model";

export class Iniciativas {
    id: number;
    tipo: string;
    horas: number;
    nombre: string;
    explicacion: string;
    redes_sociales: string;
    fecha_registro: string;
    fecha_inicio: string;
    fecha_fin: string;
    anyo_lectivo : string;
    eliminado: boolean;
    innovador: boolean;
    imagen: string;
    metas: Metas[];  // Ahora está correctamentxe tipado como un array de Metas
    profesores: Profesores[];  // Supongo que debería ser un array de strings
    entidades_externas: entidadesExternas[];  // Supongo que debería ser un array de strings
    modulos: Modulos[];  // Supongo que debería ser un array de strings
    mas_comentarios:String;

    // Constructor para inicializar la clase
    constructor(
        id: number,
        tipo: string,
        horas: number,
        nombre: string,
        explicacion: string,
        redes_sociales: string,
        fecha_registro: string,
        fecha_inicio: string,
        fecha_fin: string,
        anyo_lectivo: string,
        eliminado: boolean,
        imagen: string,
        metas: Metas[],
        profesores: Profesores[],  // Tipificado correctamente
        entidades_externas: entidadesExternas[],  // Tipificado correctamente
        modulos: Modulos[],  // Tipificado correctamente
        innovador: boolean,  // Se añade el parámetro 'innovador'
        mas_comentarios:string
    ) {
        this.id = id;
        this.tipo = tipo;
        this.horas = horas;
        this.nombre = nombre;
        this.explicacion = explicacion;
        this.redes_sociales = redes_sociales;
        this.fecha_registro = fecha_registro;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.anyo_lectivo = anyo_lectivo;
        this.eliminado = eliminado;
        this.imagen = imagen;
        this.metas = metas;
        this.profesores = profesores;
        this.entidades_externas = entidades_externas;
        this.modulos = modulos;
        this.innovador = innovador;  // Inicializa el campo 'innovador'
        this.mas_comentarios = mas_comentarios;
    }
}
