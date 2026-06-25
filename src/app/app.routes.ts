import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'mascotas',
    loadComponent: () => import('./features/pages/lost-pets-dashboard/lost-pets-dashboard.component')
      .then(m => m.LostPetsDashboardComponent)
  },
  {
    path: 'mascotas/reportar',
    canActivate: [authGuard],
    loadComponent: () => import('./features/pages/report-pet/report-pet.component')
      .then(m => m.ReportPetComponent)
  },
  {
    path: '',
    redirectTo: 'mascotas',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'mascotas'
  }
];
