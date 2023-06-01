import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideNavContentComponent implements OnInit {

  navItems = [
    { label: 'Dashboard', route: '/dashboard'},
    { label: 'Transactions', route: '/transactions'},
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onNavigationSelection(navItem: any) {
    this.router.navigate([navItem.route]);
  }

}