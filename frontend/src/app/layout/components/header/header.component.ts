import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationService } from 'app/layout/navigation.service';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css'],
//   // standalone: true,
//   // imports: [MatToolbarModule, MatButtonModule, MatIconModule],
//   encapsulation: ViewEncapsulation.None
// })

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(private navService: NavigationService) { }

  ngOnInit(): void {
  }

  toggleSideNav() {
    this.navService.setShowNav(true);
  }

  getPage() {
    this.navService.setShowNav(true);
  }
}