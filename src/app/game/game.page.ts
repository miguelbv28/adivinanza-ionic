import { Component, OnInit } from '@angular/core';
import { GameApiService } from '../services/game-api.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  numero: number = 0;
  mensaje: string = '';

  constructor(
    private api: GameApiService,
    private alertController: AlertController,
    private router: Router 
  ) { }

  ngOnInit() {
    
  }

  async confirmExit() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas salir del juego?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // Permanecer en la página actual
            this.router.navigate(['/game']);
          }
        },
        {
          text: 'Sí',
          handler: () => {
            // Redirigir al menú
            this.router.navigate(['/menu']);
          }
        }
      ]
    });

    await alert.present();
  }

  async onClickAdivinar() {
  // Validación de rango del número
  if (this.numero < 1 || this.numero > 100) {
    this.mensaje = 'Debes ingresar un número entre 1 y 100.';
    return;
  }

  // Llamamos a la API para adivinar el número
  await this.api.guess(this.numero)
    .then(data => {
      this.mensaje = data.message;  // Mostramos el mensaje del servidor (Muy alto, Muy bajo, Correcto)
      if (data.message === '¡Correcto! Has adivinado el número.') {
        // Si acertó, podríamos actualizar el leaderboard en el frontend
        this.api.leaderboard().then((players: any[]) => {
          console.log('Leaderboard actualizado:', players);
        });
      }
    })
    .catch(data => {
      this.mensaje = data.error.message;  // En caso de error
    });
}

async onClickReiniciar() {
  try {
    await this.api.restart(); // Reiniciamos el juego
    this.mensaje = 'El juego se ha reiniciado. ¡Intenta adivinar el número!'; // Mensaje de reinicio
    this.numero = 0; // Reinicia el input del número
  } catch (error) {
    this.mensaje = 'Hubo un problema al reiniciar el juego. Inténtalo nuevamente.'; // Manejo de errores
  }
}
}
