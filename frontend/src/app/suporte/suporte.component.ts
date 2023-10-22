import { Component } from '@angular/core';

@Component({
  selector: 'app-suporte',
  templateUrl: './suporte.component.html',
  styleUrls: ['./suporte.component.scss']
})
export class SuporteComponent {
  public showEmailCopiado: boolean = false;
  public showTelCopiado: boolean = false;

  public setDarkMode(){
    let isDarkMode = localStorage.getItem('isDarkMode');

    return isDarkMode == 'true' ? 'dark' : '';
  };

  public copyEmail() {
    navigator.clipboard.writeText('suporte@exitoconsultoria.br');
    this.showEmailCopiado = true;
    setTimeout(() => {
      this.showEmailCopiado = false;
    }, 2000);
  }

  public copyTel() {
    navigator.clipboard.writeText('(19) 97777-7777');
    this.showTelCopiado = true;
    setTimeout(() => {
      this.showTelCopiado = false;
    }, 2000);
  }

}
