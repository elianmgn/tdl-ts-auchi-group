import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './pages/layout-page.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { MaterialModule } from 'app/material.module';

@NgModule({
	imports: [CommonModule, LayoutRoutingModule, MaterialModule],
	declarations: [LayoutComponent, HeaderComponent]
})
export class LayoutModule {}