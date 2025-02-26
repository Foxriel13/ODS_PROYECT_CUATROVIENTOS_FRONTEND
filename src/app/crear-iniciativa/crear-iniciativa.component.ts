import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Importa CommonModule

@Component({
  selector: 'app-crear-iniciativa',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Añadir CommonModule aquí
  templateUrl: './crear-iniciativa.component.html',
  styleUrls: ['./crear-iniciativa.component.scss']
})
export class CrearIniciativaComponent {
  iniciativas: string[] = [''];  // Inicializa con un campo vacío visible

  agregarIniciativa() {
    this.iniciativas.push('');  // Añade un nuevo input vacío al arreglo
  }

  guardarODS(form: any): void {
    if (form.invalid) {
      return;  // Si el formulario es inválido, no hacer nada
    }

    const odsNombre = form.value.odsNombre;  // Obtiene el nombre del ODS
    console.log('Nombre del ODS:', odsNombre);
    console.log('Iniciativas:', this.iniciativas);  // Muestra todas las iniciativas

    // Reinicia el formulario
    form.resetForm();
    
    // Limpia el arreglo de iniciativas para empezar con un solo input vacío
    this.iniciativas = [''];  // Vuelve a inicializar
  }
  buscarPor(){
    
  }
}
