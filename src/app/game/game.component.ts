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
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  onSnapshot,
  doc,
  DocumentReference,
  DocumentData,
} from '@angular/fire/firestore';
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
  pickCardAnimation = false;
  currentCard: string | undefined = '';
  game!: Game;

  firestore: Firestore = inject(Firestore);
  item$ = collectionData(this.getGameRef());

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.subGame(id);
        console.log(id);
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
      } else {
        console.log('No such document!');
      }
    });
  }

  getGameRef() {
    return collection(this.firestore, 'games');
  }

  async newGame() {
    this.game = new Game();
    // await addDoc(this.getGameRef(), this.game.gameToJson())
    //   .then((docRef) => {
    //     console.log('Document written with ID:', docRef.id);
    //   })
    //   .catch((error) => {
    //     console.error('Error adding document:', error);
    //   });
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        if (this.currentCard) {
          this.game.playedCards.push(this.currentCard);
        }
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
