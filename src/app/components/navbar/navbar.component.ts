import { Component, inject, OnInit } from '@angular/core';
import { FadeRouterService } from '../../services/servicios/fade-rooter/fade-router.service';
import { AuthService } from '../../auth/data-access/auth.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  authService = inject(AuthService)
  currentRoute: string = '';

  constructor(private fadeRouter: FadeRouterService, private router: Router) {
        this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  ngOnInit(): void {
      this.authState()
  }

  goTo(url: string): void {
    this.fadeRouter.navigateWithFade(url);
  }
  
  home = document.getElementById("home");
  iniciativas = document.getElementById("iniciativas");
  modificar = document.getElementById("modificar");
  indicadores = document.getElementById("indicadores");
  activarHome() {
    if (this.iniciativas) {  // Verifica si 'home' no es null
      this.iniciativas.classList.remove("active");
    }
    if (this.modificar) {  // Verifica si 'home' no es null
      this.modificar.classList.remove("active");
    }
    if (this.indicadores) {  // Verifica si 'indicadores' no es null
      this.indicadores.classList.remove("active");
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
    if (this.indicadores) {  // Verifica si 'indicadores' no es null
      this.indicadores.classList.remove("active");
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
    if (this.indicadores) {  // Verifica si 'indicadores' no es null
      this.indicadores.classList.remove("active");
    }
    if (this.modificar) {  // Verifica si 'home' no es null
      this.modificar.classList.add("active");
    }
  }
  activarIndicadores() {
    if (this.iniciativas) {  // Verifica si 'home' no es null
      this.iniciativas.classList.remove("active");
    }
    if (this.home) {  // Verifica si 'home' no es null
      this.home.classList.remove("active");
    }
    if (this.modificar) {  // Verifica si 'home' no es null
      this.modificar.classList.remove("active");
    }
    if (this.indicadores) {  // Verifica si 'indicadores' no es null
      this.indicadores.classList.add("active");
    }
  }

  isLogged: boolean = false
  authState(){
    this.authService.getAuthState().pipe(
      map(state =>{
        if(!state){
          this.isLogged = false
          return
        }else{
          this.isLogged = true
          return
        }
      })
    ).subscribe()
    this.isLogged = false
    return
  }

  async logOut(){
    try {
      await this.authService.signOut()
      console.log("Sesión Cerrada")
      this.goTo("/LogIn")
    } catch (error) {
      console.error("No se ha podido cerrar sesión")
    }
  }
  
}
