import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/data-access/auth.service';
import { FadeRouterService } from '../../services/servicios/fade-rooter/fade-router.service';
import { RouterLink } from '@angular/router';
import { uid } from 'chart.js/helpers';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  fb = inject(FormBuilder)
  authService = inject(AuthService)

  constructor(private fadeRouter: FadeRouterService) { }
  goTo(url: string): void {
    this.fadeRouter.navigateWithFade(url);
  }

  logInForm = this.fb.group({
    email: this.fb.control('', [
      Validators.required,
      Validators.email
    ]),
    password: this.fb.control('', [
      Validators.required
    ]),
  })

  async signInWithGoogle(){
    try {
      let uid;
      await this.authService.signInWithGoogle().then(email =>{
        uid = email.user.uid
      })
      console.log("Iniciando sesión con Google...")
      console.log(uid)
      this.goTo('/')
    } catch (error) {
      console.error("No se ha podido iniciar sesión con Google")
    }
    
  }
  async submit() {
    //Validaciones
    if(this.logInForm.invalid){
      console.error("El formulario es invalido")
      return
    }

    const email = this.logInForm.controls.email.value
    const password = this.logInForm.controls.password.value

    try {
      if (!email || !password) {
        console.error("Relena todos los campos antes del Login")
      } else {
        //Código del LogIn
        const uid = (await this.authService.signIn(email, password)).user.uid
        console.log("Inicio de Sesión correcto")
        console.log(uid)
        this.goTo('/')
      }
    } catch (error) {
      console.error("Error al iniciar sesión: " + error)
    }
  }
}
