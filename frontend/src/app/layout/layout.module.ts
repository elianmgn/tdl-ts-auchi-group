import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarContentComponent } from './components/sidebar-content/sidebar-content.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './pages/layout-page.component';
import { LayoutRoutingModule } from './layout-routing.module';

@NgModule({
	imports: [CommonModule, LayoutRoutingModule],
	declarations: [LayoutComponent, HeaderComponent, SidebarComponent, SidebarContentComponent]
})
export class LayoutModule {}