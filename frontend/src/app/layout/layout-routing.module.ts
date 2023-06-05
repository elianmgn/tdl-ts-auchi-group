import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { layoutRoutes } from './layout-routes';

@NgModule({
	imports: [RouterModule.forChild(layoutRoutes)],
	exports: [RouterModule]
})
export class LayoutRoutingModule {}