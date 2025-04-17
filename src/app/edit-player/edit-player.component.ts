import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss',
})
export class EditPlayerComponent {
  readonly dialogRef = inject(MatDialogRef<EditPlayerComponent>);
  selectedPicture: string = '';
  allProfilePictures = [
    'avatar_1.png',
    'avatar_2.png',
    'avatar_3.png',
    'avatar_4.png',
    'avatar_5.png',
    'avatar_6.png',
    'avatar_7.png',
    'avatar_8.png',
  ];

  onNoClick() {
    this.dialogRef.close();
  }
}
