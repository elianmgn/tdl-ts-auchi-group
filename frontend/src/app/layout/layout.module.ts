import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { AppRoutingModule } from '../app-routing.module';
import { LayoutPageComponent } from './pages/layout.page.component';

@NgModule({
	imports: [CommonModule, AppRoutingModule],
	declarations: [LayoutPageComponent, SidebarComponent, HeaderComponent],
})
export class LayoutModule {}