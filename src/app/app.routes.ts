import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'mascotas',
    title: 'Find My Pet - Mascotas Perdidas',
    loadComponent: () =>
      import('./features/pages/lost-pets-dashboard/lost-pets-dashboard.component')
        .then(m => m.LostPetsDashboardComponent)
  },
  {
    path: 'mascotas/reportar',
    title: 'Reportar Mascota Perdida',
    // canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages/report-pet/report-pet.component')
        .then(m => m.ReportPetComponent)
  },
  {
    path: 'login',
    title: 'Find My Pet - Ingresar',
    loadComponent: () =>
      import('./features/pages/login-page/login-page.component')
        .then(m => m.LoginPageComponent)
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
