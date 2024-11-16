import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GameApiService } from '../services/game-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  usuario: string = '';
  correo: string = '';
  password: string = '';
  mensajeError: string = ''; // Variable para el mensaje de error

  constructor(
    private router: Router,
    private api: GameApiService
  ) {}

  ngOnInit() {}

  async onClickRegistrar(form: NgForm) {
    if (form.invalid) {
      this.mensajeError = 'Debes completar todos los campos';
      return;
    }

    this.mensajeError = ''; // Limpia el mensaje de error
    await this.api
      .register(this.correo, this.usuario, this.password)
      .then(() => this.router.navigate(['/login']))
      .catch((data) => {
        this.mensajeError = data.error.message;
      });
  }
}