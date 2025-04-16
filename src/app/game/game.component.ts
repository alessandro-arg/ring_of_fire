import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, onSnapshot, doc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    GameInfoComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  cards = [0, 1, 2, 3];
  card = '';
  game!: Game;
  firestore: Firestore = inject(Firestore);
  gameId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      if (this.gameId) {
        this.subGame(this.gameId);
        console.log(this.gameId);
      }
    });
  }

  subGame(id: string) {
    const gameDocRef = doc(this.firestore, `games/${id}`);
    return onSnapshot(gameDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log('Game update:', data);
        this.game.currentPlayer = data['currentPlayer'];
        this.game.playedCards = data['playedCards'];
        this.game.players = data['players'];
        this.game.stack = data['stack'];
        this.game.pickCardAnimation = data['pickCardAnimation'];
        this.game.currentCard = data['currentCard'];
      } else {
        console.log('No such document!');
      }
    });
  }

  async newGame() {
    this.game = new Game();
  }

  saveGame() {
    const gameDocRef = doc(this.firestore, `games/${this.gameId}`);
    updateDoc(gameDocRef, this.game.gameToJson()).then(() => {
      console.log('Game successfully updated');
    });
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        if (this.game.currentCard) {
          this.game.playedCards.push(this.game.currentCard);
        }
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }
}
