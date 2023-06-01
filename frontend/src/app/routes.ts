import { Routes } from '@angular/router';
import { LayoutPageComponent } from './layout/pages/layout.page.component';

export const routes: Routes = [
  {
    path:        '',
    component:   LayoutPageComponent,
    children:    [
      {
        path:         'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.routing.module').then(
            mod => mod.DashboardRoutingModule
          )
      },
      {
        path:         'transaction-form',
        loadChildren: () =>
          import('./modules/transaction-form/transaction-form.routing.module').then(
            mod => mod.TransactionFormRoutingModule
          )
      },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }
];