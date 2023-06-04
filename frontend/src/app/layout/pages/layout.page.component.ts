import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-layout-page',
	templateUrl: './layout.page.component.html',
	styleUrls: ['./layout.page.component.scss']
})
export class LayoutPageComponent implements OnInit {
    collapedSideBar: boolean;

    constructor() {}

    ngOnInit() {}

    receiveCollapsed($event: boolean) {
    	this.collapedSideBar = $event;
    }
}