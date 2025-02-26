import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ Importar FormsModule
import { CommonModule } from '@angular/common'; // ✅ Importar CommonModule
import { CrearIniciativaComponent } from '../crear-iniciativa/crear-iniciativa.component';
import { ActualizarIniciativaComponent } from '../actualizar-iniciativa/actualizar-iniciativa.component';
import { EliminarIniciativaComponent } from '../eliminar-iniciativa/eliminar-iniciativa.component';

@Component({
  selector: 'app-modificar',
  standalone: true, // ✅ Indica que es un componente Standalone
  imports: [CommonModule, FormsModule,CrearIniciativaComponent,ActualizarIniciativaComponent,EliminarIniciativaComponent], // ✅ Agrega FormsModule aquí
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent {
  opcionSeleccionada: string = 'crear';
}
