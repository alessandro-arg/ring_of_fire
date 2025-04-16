import { Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./start-screen/start-screen.component').then(
        (m) => m.StartScreenComponent
      ),
  },
  {
    path: 'game/:id',
    loadComponent: () =>
      import('./game/game.component').then((m) => m.GameComponent),
  },
  {
    path: 'game',
    redirectTo: '',
    pathMatch: 'full',
  },
];
