import { Component, OnInit } from '@angular/core';
import { GameApiService } from '../services/game-api.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private api: GameApiService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async onLogout() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas salir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // El usuario canceló la acción
          }
        },
        {
          text: 'Sí',
          handler: () => {
            // Acción al confirmar
            this.api.logout(); // Llamada al método de logout
            this.router.navigate(['/login']); // Redirigir al login
          }
        }
      ]
    });

    await alert.present();
  }
}