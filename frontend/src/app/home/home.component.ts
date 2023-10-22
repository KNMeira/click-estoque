import { Component, OnInit } from '@angular/core';
import { EstoqueService } from '../estoque/estoque.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public itensAlerta: any = [];
  public isOpenConfigAlerta: boolean = false;
  public isLoadingItensAlerta: boolean = false;
  public qntActive: number = 3

  constructor(private estoqueService: EstoqueService) { }

  public ngOnInit(): void {
    this.getAlertaEstoque(3);
  }

  public getAlertaEstoque(qnt: number) {
    this.isLoadingItensAlerta = true;
    this.qntActive = qnt;
    this.estoqueService.getAlertaEstoque(qnt).subscribe((res) => {
      this.itensAlerta = res
      this.isLoadingItensAlerta = false;

    })
  }

  public openConfigAlerta(isOpenConfigAlerta: boolean) {
    this.isOpenConfigAlerta = isOpenConfigAlerta;
  }

  public setDarkMode() {
    let isDarkMode = localStorage.getItem('isDarkMode');

    return isDarkMode == 'true' ? 'dark' : '';
  };
}
