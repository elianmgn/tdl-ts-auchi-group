import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TransactionListRoutingModule } from './transaction-list.routing.module';
import { TransactionListComponent } from './components/transaction-list.component';

@NgModule({
	imports: [CommonModule, TransactionListRoutingModule],
	declarations: [TransactionListComponent]
})
export class TransactionListModule {}