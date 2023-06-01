import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TransactionFormRoutingModule } from './transaction-form.routing.module';
import { TransactionFormComponent } from './components/transaction-form.component';

@NgModule({
	imports: [CommonModule, TransactionFormRoutingModule],
	declarations: [TransactionFormComponent]
})
export class TransactionFormModule {}