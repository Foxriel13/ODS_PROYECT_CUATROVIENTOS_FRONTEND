import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ Importar FormsModule
import { CommonModule } from '@angular/common'; // ✅ Importar CommonModule

@Component({
  selector: 'app-modificar',
  standalone: true, // ✅ Indica que es un componente Standalone
  imports: [CommonModule, FormsModule], // ✅ Agrega FormsModule aquí
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent {
  iniciativas: string[] = ['']; // Almacena las iniciativas dinámicas

  agregarIniciativa() {
    this.iniciativas.push(''); // Agrega un nuevo campo de iniciativa vacío
  }

  guardarODS() {
    alert("ODS e iniciativas guardadas correctamente.");
  }
}
