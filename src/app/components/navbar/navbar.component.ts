import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  home = document.getElementById("home");
  iniciativas = document.getElementById("iniciativas");
  modificar = document.getElementById("modificar");
  activarHome() {
    if (this.iniciativas) {  // Verifica si 'home' no es null
      this.iniciativas.classList.remove("active");
    }
    if (this.modificar) {  // Verifica si 'home' no es null
      this.modificar.classList.remove("active");
    }
    if (this.home) {  // Verifica si 'home' no es null
      this.home.classList.add("active");
    }
  }
  activarIniciativas() {
    if (this.home) {  // Verifica si 'home' no es null
      this.home.classList.remove("active");
    }
    if (this.modificar) {  // Verifica si 'home' no es null
      this.modificar.classList.remove("active");
    }
    if (this.iniciativas) {  // Verifica si 'home' no es null
      this.iniciativas.classList.add("active");
    }
  }
  activarModificar() {
    if (this.iniciativas) {  // Verifica si 'home' no es null
      this.iniciativas.classList.remove("active");
    }
    if (this.home) {  // Verifica si 'home' no es null
      this.home.classList.remove("active");
    }
    if (this.modificar) {  // Verifica si 'home' no es null
      this.modificar.classList.add("active");
    }
  }
  
}
