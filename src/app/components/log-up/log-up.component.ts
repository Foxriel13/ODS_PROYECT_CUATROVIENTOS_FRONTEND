import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/data-access/auth.service';
import { FadeRouterService } from '../../services/servicios/fade-rooter/fade-router.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-log-up',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './log-up.component.html',
  styleUrl: './log-up.component.scss'
})
export class LogUpComponent {
  fb = inject(FormBuilder)
  authService = inject(AuthService)

  constructor(private fadeRouter: FadeRouterService) { }
  goTo(url: string): void {
    this.fadeRouter.navigateWithFade(url);
  }

  logUpForm = this.fb.group({
    email: this.fb.control('', [
      Validators.required,
      Validators.email
    ]),
    password: this.fb.control('', [
      Validators.required
    ]),
  })

  async submit() {
    //Validaciones
    if(this.logUpForm.invalid){
      console.error("El formulario es invalido")
      return
    }

    const email = this.logUpForm.controls.email.value
    const password = this.logUpForm.controls.password.value

    try {
      if (!email || !password) {
        console.error("Relena todos los campos antes del Registro")
      } else {
        //Código del LogIn
        await this.authService.signUp(email, password)
        console.log("Usuario creado correctamente")
        this.goTo('/')
      }
    } catch (error) {
      console.error("Error al guardar: " + error)
    }

  }
}
