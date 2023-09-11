import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'click-estoque';
  showSideMenu: boolean = false

  constructor( private router: Router) {
    router.events.subscribe((event) => {      
      if (event instanceof NavigationStart) {
        this.showSideMenu = event.url !== '/login';
      }
    })
  }
}
