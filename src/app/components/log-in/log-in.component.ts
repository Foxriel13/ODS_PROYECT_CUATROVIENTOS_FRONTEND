import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/data-access/auth.service';
import { FadeRouterService } from '../../services/servicios/fade-rooter/fade-router.service';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule],
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
        await this.authService.signUp(email, password)
        console.log("Usuario creado correctamente")
        this.goTo('/')
      }
    } catch (error) {
      console.error("Error al guardar: " + error)
    }

  }
}
