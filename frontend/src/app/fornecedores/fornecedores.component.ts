import { Component } from '@angular/core';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.scss']
})
export class FornecedoresComponent {
  public selectedTab = 0;
  public fornecedorEdit: any;

  public setDarkMode(){
    let isDarkMode = localStorage.getItem('isDarkMode');

    return isDarkMode == 'true' ? 'dark' : '';
  };

  public changeSelectedTab(tab: number){
    this.selectedTab = tab;
  }

  public openEditarTab(event: any) {
    this.changeSelectedTab(2);
    this.fornecedorEdit = event;
  }
}
