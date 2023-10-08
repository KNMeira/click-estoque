import { Component } from '@angular/core';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.scss']
})
export class EstoqueComponent {
  public selectedTab = 0;
  public editProduto: any;
  
  public setDarkMode(){
    let isDarkMode = localStorage.getItem('isDarkMode');

    return isDarkMode == 'true' ? 'dark' : '';
  };

  public changeSelectedTab(tab: number){
    this.selectedTab = tab;
  }

  public openEditarTab(event: any) {
    this.changeSelectedTab(2);
    this.editProduto = event;
  }
}
