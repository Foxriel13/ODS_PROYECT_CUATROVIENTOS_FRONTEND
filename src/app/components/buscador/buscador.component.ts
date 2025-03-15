import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceCursosService } from '../../serviceCursos/service-cursos.service';
import { Curso } from '../../models/curso.model';
import { ServiceOdsService } from '../../serviceOds/service-ods.service';
import { Ods } from '../../models/ods.model';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {

  constructor(private claseServicie: ServiceCursosService, private odsServicie: ServiceOdsService) {}
  cursoList: Curso[] = [];
  odsList: Ods[] = [];
  
  ngOnInit(): void {
    this.loadClases();
    this.loadOds();
  }

  loadClases() {
    this.claseServicie.getCursosList().subscribe(
      (response) => {
        this.cursoList = response; // Se asignan todos los cursos sin filtro
      },
      (error) => {
        console.error('❌ Error al cargar los cursos:', error);
      }
    );
  }
  loadOds() {
    this.odsServicie.getOdsList().subscribe(
      (response) => {
        this.odsList = response; // Se asignan todos los cursos sin filtro
      },
      (error) => {
        console.error('❌ Error al cargar los cursos:', error);
      }
    );
  }
  
  curso = '';
  ods = '';
  nombre = '';
  fechaRegistro = '';  // Variable para la fecha de registro

  @Output() filtersChanged = new EventEmitter<any>();

  // Método para emitir los filtros incluyendo la fecha de registro
  buscar(): void {
    this.filtersChanged.emit({
      curso: this.curso,
      ods: this.ods,
      nombre: this.nombre,
      fechaRegistro: this.fechaRegistro // Se incluye fechaRegistro en el filtro
    });
  }
}
