import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionFormComponent } from './components/transaction-form.component';

const routes: Routes = [
	{ path: '', component: TransactionFormComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TransactionFormRoutingModule {}