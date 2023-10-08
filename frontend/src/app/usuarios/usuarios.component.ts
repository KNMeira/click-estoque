import { Component } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  public selectedTab = 0;
  public usuarioEdit: any;

  public setDarkMode(){
    let isDarkMode = localStorage.getItem('isDarkMode');

    return isDarkMode == 'true' ? 'dark' : '';
  };

  public changeSelectedTab(tab: number){
    this.selectedTab = tab;
  }

  public openEditarTab(event: any) {
    this.changeSelectedTab(2);
    this.usuarioEdit = event;
  }

}
