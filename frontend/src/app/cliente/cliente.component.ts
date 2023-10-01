import { Component } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {

  public selectedTab: number = 0

  public setDarkMode(){
    let isDarkMode = localStorage.getItem('isDarkMode');

    return isDarkMode == 'true' ? 'dark' : '';
  };

  public changeSelectedTab(tab:number){
    this.selectedTab = tab
  }

}
