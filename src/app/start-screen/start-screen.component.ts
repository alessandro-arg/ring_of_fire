import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Game } from '../../models/game';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss',
})
export class StartScreenComponent {
  firestore: Firestore = inject(Firestore);
  router = inject(Router);
  game = Game;
  constructor() {}

  newGame() {
    let game = new Game();
    addDoc(this.getGameRef(), game.gameToJson()).then((gameInfo: any) => {
      this.router.navigateByUrl('/game/' + gameInfo.id);
    });
  }

  getGameRef() {
    return collection(this.firestore, 'games');
  }
}
