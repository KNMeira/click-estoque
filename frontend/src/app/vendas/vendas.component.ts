import { Component } from '@angular/core';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss']
})
export class VendasComponent {
  public selectedTab = 0;
  public vendaEdit!: any;

  public setDarkMode(){
    let isDarkMode = localStorage.getItem('isDarkMode');

    return isDarkMode == 'true' ? 'dark' : '';
  };

  public changeSelectedTab(tab: number){
    this.selectedTab = tab;
  }

  public openEditarTab(event: any) {
    this.changeSelectedTab(2);
    this.vendaEdit = event;
  }

}
