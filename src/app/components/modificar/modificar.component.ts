import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CrearIniciativaComponent } from '../crear-iniciativa/crear-iniciativa.component';
import { ActualizarIniciativaComponent } from '../actualizar-iniciativa/actualizar-iniciativa.component';
import { EliminarIniciativaComponent } from '../eliminar-iniciativa/eliminar-iniciativa.component';

@Component({
  selector: 'app-modificar',
  standalone: true,
  imports: [CommonModule, FormsModule,CrearIniciativaComponent,ActualizarIniciativaComponent,EliminarIniciativaComponent],
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent {
  opcionSeleccionada: string = 'crear';

  cardsInicio = [
  {
    icon: 'bi bi-lightbulb',
    titulo: 'Iniciativas',
    descripcion: 'Gestiona las iniciativas de tu organización de forma clara y estructurada.',
    ruta: '/iniciativas'
  },
  {
    icon: 'bi bi-people',
    titulo: 'Profesores',
    descripcion: 'Administra el personal académico vinculado a tus módulos y clases.',
    ruta: '/profesores'
  },
  {
    icon: 'bi bi-graph-up',
    titulo: 'Actividades',
    descripcion: 'Revisa y gestiona todas las actividades activas asociadas.',
    ruta: '/actividades'
  }
];
}
