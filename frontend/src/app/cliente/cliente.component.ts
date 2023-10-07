import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit{
  
  public selectedTab: number = 0
  public editCliente: any;

  public setDarkMode(){
    let isDarkMode = localStorage.getItem('isDarkMode');

    return isDarkMode == 'true' ? 'dark' : '';
  };

  public changeSelectedTab(tab:number){
    this.selectedTab = tab
  }
  
  public openEditarTab(event: any) {
    this.changeSelectedTab(2);
    this.editCliente = event;
  }

  ngOnInit(): void {
    
  }
}
