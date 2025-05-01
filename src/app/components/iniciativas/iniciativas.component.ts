import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IniciativasService } from '../../services/sercvicieIniciativasMostrar/iniciativas.service';
import { Iniciativas } from '../../models/iniciativas.model';
import { CommonModule } from '@angular/common';
import { BuscadorComponent } from '../buscador/buscador.component';
import { CardIniciativaComponent } from './card-iniciativa/card-iniciativa.component';
import { ModalIniciativaComponent } from "./modal-iniciativa/modal-iniciativa.component";
import { ModalService } from '../../services/servicios/modal.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-iniciativas',
  standalone: true,
  imports: [BuscadorComponent, CommonModule, CardIniciativaComponent, ModalIniciativaComponent],
  templateUrl: './iniciativas.component.html',
  styleUrls: ['./iniciativas.component.scss']
})
export class IniciativasComponent implements OnInit, AfterViewInit  {
  iniciativas: Iniciativas[] = [];  // Lista completa de iniciativas
  iniciativasFiltradas: Iniciativas[] = [];  // Lista filtrada

  filters = {
    curso: '',
    ods: '',
    nombre: '',
    fechaRegistro: '',
    anyo_lectivo: '',
    dimension: [] as string[],
    tipo:'',
    profesor: '',
    contratante: ''
  };

  constructor(private iniciativasService: IniciativasService, private cdr: ChangeDetectorRef) { }
  @ViewChildren('cardIniciativa', { read: ElementRef }) cardElements!: QueryList<ElementRef>;
  @ViewChild('buscadorWrapper', { static: false }) buscadorWrapper!: ElementRef;
  isLoading = true;

  animarTarjetas(): void {
    const elementos = this.cardElements.map(el => el.nativeElement);
    gsap.fromTo(
      elementos,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power2.out' }
    );
  }

  animarBuscador(): void {
    if (!this.buscadorWrapper) return;
    gsap.fromTo(
      this.buscadorWrapper.nativeElement,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }
    );
  }

  ngOnInit(): void {
    this.loadIniciativas();
  }

  ngAfterViewInit(): void {
    this.cardElements.changes.subscribe(() => this.animarTarjetas());
    this.animarBuscador(); // animar buscador al iniciar
  }

  // Cargar todas las iniciativas
  loadIniciativas(): void {
    this.iniciativasService.getIniciativas().subscribe(
      (data: Iniciativas[]) => {
        console.log('Iniciativas recibidas:', data);
        
        // Filtramos las iniciativas que NO estén eliminadas
        this.iniciativas = data.filter(iniciativa => !iniciativa.eliminado);
        this.iniciativasFiltradas = [...this.iniciativas]; // Copia para mostrar
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar las iniciativas', error);
      }
    );
  }

  // Método para recibir cambios de filtros desde el componente Buscador
  onFiltersChanged(updatedFilters: any): void {
    this.filters = { ...updatedFilters }; // Clonar objeto para forzar detección de cambios

    this.filtrarIniciativas(); // Aplica los filtros en el frontend
    this.cdr.detectChanges(); 
   // this.buscar(); // Llamamos al método de búsqueda para aplicar los filtros
  }

  // Buscar iniciativas con filtros
  buscar(): void {
    this.iniciativasService.filterIniciativas(this.filters).subscribe(
      (filteredData: Iniciativas[]) => {
        this.iniciativasFiltradas = filteredData; // Actualizamos la lista filtrada
      },
      (error) => {
        console.error('Error al aplicar los filtros', error);
      }
    );
  }

  // Filtrar las iniciativas en el frontend
  filtrarIniciativas(): void {
    let iniciativasFiltradas = this.iniciativas; // Lista original de iniciativas

    // Filtro por nombre (solo si hay algo escrito)
    if (this.filters.nombre && this.filters.nombre.trim() !== '') {
      iniciativasFiltradas = iniciativasFiltradas.filter((iniciativa) =>
        iniciativa.nombre?.toLowerCase().includes(this.filters.nombre.toLowerCase().trim())
      );
    }

    // Filtro por tipo (solo si hay algo seleccionado)
    if (this.filters.tipo && this.filters.tipo.trim() !== '') {
      iniciativasFiltradas = iniciativasFiltradas.filter((iniciativa) =>
        iniciativa.tipo?.toLowerCase().includes(this.filters.tipo.toLowerCase().trim())
      );
    }

    // Filtro por año lectivo (solo si hay algo escrito)
    if (this.filters.anyo_lectivo && this.filters.anyo_lectivo.trim() !== '') {
      iniciativasFiltradas = iniciativasFiltradas.filter((iniciativa) =>
        iniciativa.anyo_lectivo?.trim().includes(this.filters.anyo_lectivo.trim())
      );
    }

    // Filtro por ODS (solo si hay algo escrito)
    if (this.filters.ods && this.filters.ods.trim() !== '') {
      const odsArray = this.filters.ods.split(',').map(ods => ods.trim().toLowerCase()); // Convertir a array de nombres
      iniciativasFiltradas = iniciativasFiltradas.filter((iniciativa) =>
        iniciativa.metas?.some(meta =>
          meta.ods && odsArray.includes(meta.ods.nombre.toLowerCase())
        )
      );
    }

    // Filtro por curso (solo si hay algo seleccionado)
    if (this.filters.curso && this.filters.curso.trim() !== '') {
      iniciativasFiltradas = iniciativasFiltradas.filter((iniciativa) =>
        this.filterCursos(iniciativa.modulos, this.filters.curso)
      );
    }

    // Filtro por fecha de registro (solo si hay algo escrito)
    if (this.filters.fechaRegistro && this.filters.fechaRegistro.trim() !== '') {
      iniciativasFiltradas = iniciativasFiltradas.filter((iniciativa) =>
        new Date(iniciativa.fecha_registro) >= new Date(this.filters.fechaRegistro)
      );
    }

    // Filtro por profesor (solo si hay algo escrito)
    if (this.filters.profesor && this.filters.profesor.trim() !== '') {
      iniciativasFiltradas = iniciativasFiltradas.filter((iniciativa) =>
        iniciativa.profesores?.some(prof =>
          prof.nombre?.toLowerCase().includes(this.filters.profesor.toLowerCase().trim())
        )
      );
    }

    // Filtro por contratante (solo si hay algo escrito)
    if (this.filters.contratante && this.filters.contratante.trim() !== '') {
      iniciativasFiltradas = iniciativasFiltradas.filter((iniciativa) =>
        iniciativa.entidades_externas?.some(entidad =>
          entidad.nombre?.toLowerCase().includes(this.filters.contratante.toLowerCase().trim())
        )
      );
    }

    // Filtro por dimensión de ODS (solo si hay algo seleccionado)
    if (this.filters.dimension && this.filters.dimension.length > 0) {
      iniciativasFiltradas = iniciativasFiltradas.filter((iniciativa) =>
        iniciativa.metas?.some(meta =>
          this.filters.dimension.some((dim: string) =>
            (meta.ods?.dimension ?? '').toLowerCase().includes(dim.toLowerCase())
          )
        )
      );
    }
    // Actualizar lista de iniciativas filtradas
    this.iniciativasFiltradas = [...iniciativasFiltradas]; // Clonar para que Angular detecte cambios
    // Fuerza la detección de cambios manualmente
    console.log('Iniciativas filtradas:', this.iniciativasFiltradas);
  }




  // Función para filtrar por 'ods' dentro de las 'metas'
  filterOds(metas: any[], odsFilter: string): boolean {
    if (!Array.isArray(metas)) return false; // Asegura que metas sea un array
  
    return metas.some(meta => {
      if (!meta || !meta.ods) return false;
  
      if (Array.isArray(meta.ods)) {
        return meta.ods.some((ods: any) => 
          ods.nombre?.toLowerCase().includes(odsFilter.toLowerCase())
        );
      } else {
        return meta.ods.nombre?.toLowerCase().includes(odsFilter.toLowerCase());
      }
    });
  }
  

  // Filtrar por cursos dentro de los módulos
  filterCursos(modulos: any[], cursosFilter: string): boolean {
    if (!Array.isArray(modulos)) return false; // Asegura que modulos sea un array
  
    return modulos.some(modulo => {
      if (!modulo || !modulo.curso) return false;
  
      if (Array.isArray(modulo.curso)) {
        return modulo.curso.some((curso: any) => 
          curso.nombre?.toLowerCase().includes(cursosFilter.toLowerCase())
        );
      } else {
        return modulo.curso.nombre?.toLowerCase().includes(cursosFilter.toLowerCase());
      }
    });
  }
  
}
