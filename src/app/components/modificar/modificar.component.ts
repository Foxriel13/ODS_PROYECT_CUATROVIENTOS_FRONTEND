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
    icon: 'bi bi-plus-circle',
    titulo: 'Crea Iniciativas',
    descripcion: 'Gestiona las iniciativas de tu organización de forma clara y estructurada.',
  },
  {
    icon: 'bi bi-pencil-square',
    titulo: 'Edita Iniciativas',
    descripcion: 'Selecciona una iniciativa ya creada y edita sus detalles.',
  },
  {
    icon: 'bi bi-trash',
    titulo: 'Elimina Iniciativas',
    descripcion: 'Elimina iniciativas que ya no son necesarias.',
  } 
  ];
  getOpcion(titulo: string): string {
    switch (titulo) {
      case 'Crea Iniciativas':
        return 'crear';
      case 'Edita Iniciativas':
        return 'actualizar';
      case 'Elimina Iniciativas':
        return 'eliminar';
      default:
        return 'home';
    }
  }

}
