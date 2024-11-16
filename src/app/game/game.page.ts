import { Component, OnInit } from '@angular/core';
import { GameApiService } from '../services/game-api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  numero: number = 0;
  mensaje: string = '';

  constructor(
    private api: GameApiService
  ) { }

  ngOnInit() {
    
  }

  async onClickAdivinar() {
    // Llamamos a la API para adivinar el número
    await this.api.guess(this.numero)  // Enviamos el número y el jugador al backend
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
    await this.api.restart();  // Reiniciamos el juego
    this.mensaje = '';
    this.numero = 0;
  }
}
