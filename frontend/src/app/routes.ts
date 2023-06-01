import { Routes } from '@angular/router';

export const routes: Routes = [
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
      {
        path:         'transaction-list',
        loadChildren: () =>
          import('./modules/transaction-list/transaction-list.routing.module').then(
            mod => mod.TransactionListRoutingModule
          )
      },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];