import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss',
})
export class DialogAddPlayerComponent {
  readonly dialogRef = inject(MatDialogRef<DialogAddPlayerComponent>);
  name: string = '';

  onNoClick() {
    this.dialogRef.close();
  }
}
