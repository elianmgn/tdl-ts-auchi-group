import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';

@NgModule({
	imports: [CommonModule, DashboardRoutingModule],
	declarations: [DashboardComponent]
})
export class DashboardModule {}