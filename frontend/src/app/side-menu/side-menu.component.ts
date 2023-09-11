import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit{
  
  public sideMenuOpen: boolean = false;
  public isDarkMode: boolean = false;
  public darkModeText: 'Modo Escuro' | 'Modo Claro' = 'Modo Escuro';
  
  constructor(private router: Router){}
  
  ngOnInit(): void {
    localStorage.setItem('isDarkMode', this.isDarkMode.toString());
  }

  public sair() {
    sessionStorage.setItem('canAccess', 'false')
    this.router.navigate(['/login'])
  }
  
  public sideMenuOpenChange() {
    this.sideMenuOpen = !this.sideMenuOpen;
  };
  
  public isDarkModeChange() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('isDarkMode', this.isDarkMode.toString())  

    // if (this.isDarkMode) {
    //   this.darkModeText = 'Modo Claro';
    // } else {
    //   this.darkModeText = 'Modo Escuro';
    // }

    this.darkModeText = this.isDarkMode ? 'Modo Claro' : 'Modo Escuro'; 

  }

  public setDarkMode(){
    let isDarkMode = localStorage.getItem('isDarkMode');

    return isDarkMode == 'true' ? 'dark' : ''
  };

}
