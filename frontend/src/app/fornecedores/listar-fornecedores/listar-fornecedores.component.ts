import { Component, OnInit } from '@angular/core';
import { FornecedoresService } from '../fornecedores.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-listar-fornecedores',
  templateUrl: './listar-fornecedores.component.html',
  styleUrls: ['./listar-fornecedores.component.scss']
})
export class ListarFornecedoresComponent implements OnInit {
  public fornecedoresLoaded = false;
  public fornecedores: any = [];

  public formPesquisarFornecedor: FormGroup = new FormGroup({
    filtro: new FormControl('')
  })
  constructor(private fornecedoresService: FornecedoresService) { }
  ngOnInit(): void {
    this.getAllFornecedores()

    this.formPesquisarFornecedor.get('filtro')?.valueChanges.subscribe((value) => {
      if (value == '') {
        this.getAllFornecedores();
      }
      else {
        this.filterFornecedor();
      }


    })
  }

  public filterFornecedor(){
    let termoPesquisa = this.formPesquisarFornecedor.get('filtro')?.value;
    this.fornecedoresService.getAllFornecedores().subscribe((allFornecedores: any) => {
      
      if (termoPesquisa != '' && termoPesquisa != undefined) {
        this.fornecedores = allFornecedores.filter((fornecedor: any) => {
          return fornecedor.email.match(termoPesquisa) || fornecedor.fornecedor.match(termoPesquisa) || fornecedor.celular.match(termoPesquisa) || fornecedor.cnpj.match(termoPesquisa) || fornecedor.endereco.match(termoPesquisa)
        })
      }
    })  
  }


  public getAllFornecedores() {
    this.fornecedoresService.getAllFornecedores().subscribe((data: any) => {
      this.fornecedores = data
      this.fornecedoresLoaded = true;
    })
  }

}
