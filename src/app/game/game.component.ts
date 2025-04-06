import { Component } from '@angular/core';
import { log } from 'console';
import { url } from 'inspector';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  cards = [0, 1, 2, 3];
  card = '';
  pickCardAnimation = false;
  currentCard: string | undefined = '';
  game!: Game;

  constructor() {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      console.log(this.currentCard);
      this.pickCardAnimation = true;
      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 1500);
    }
  }
}
