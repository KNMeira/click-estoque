import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EstoqueService } from '../estoque.service';

@Component({
  selector: 'app-editar-produto-estoque',
  templateUrl: './editar-produto-estoque.component.html',
  styleUrls: ['./editar-produto-estoque.component.scss']
})
export class EditarProdutoEstoqueComponent implements OnInit{

  public formPesquisarPeca: FormGroup = new FormGroup({
    filtro: new FormControl('', Validators.required)
  })

  public fornecedoresOptions:any =[]
  public msgBusca: string = "Ultilize o filtro para buscar o Código da peça que deseja editar" 
  public isProdutoLoaded: boolean = false;
  public loading: boolean = false;
  public isLoadingSalvar: boolean = false;
  
  public produto: any;  
  public formEditProduto: FormGroup = new FormGroup({
    peca: new FormControl('', Validators.required),
    id_peca: new FormControl({value: '', disabled: true }, Validators.required),
    tamanho: new FormControl('', Validators.required),
    quantidade: new FormControl('', Validators.required),
    id_fornecedor: new FormControl('', Validators.required),
    valor_compra: new FormControl('', Validators.required),
    valor_venda: new FormControl('', Validators.required),

  })
  
  constructor(private estoqueService: EstoqueService){}

  ngOnInit(): void {
    this.getFornecedores()
  }
  
  public pesquisarPeca() {
    if (this.formPesquisarPeca.get('filtro')?.value == '' ) {
      alert('Preencha o filtro de busca')
      return;
    }
    this.isProdutoLoaded = false;
    this.loading = true;
    const data = {
      cod: this.formPesquisarPeca.get('filtro')?.value
    }
    this.estoqueService.getPeca(data).subscribe((prod) => {
      console.log(prod);
      
      if (prod[0]) {
        this.produto = prod[0]
        this.formEditProduto.patchValue(this.produto);
        this.isProdutoLoaded = true;
      } else {
        this.isProdutoLoaded = false
        this.msgBusca = 'Nenhum resultado encontrado'
      }      
      this.loading = false;
    })
  }
  
  public editProduto() {
    this.isLoadingSalvar = true;
    let data = {
      ...this.formEditProduto.value,
      id_peca: this.formEditProduto.get('id_peca')?.value
    }
    
    this.estoqueService.editProduto(data).subscribe((res)=> {
      console.log(res);
    this.isLoadingSalvar = false;
      
      alert(res.msg)
    })
  }
  
  public cancelarEdicao() {}

  public getFornecedores() {
    this.estoqueService.getFornecedores().subscribe((res) => {
      console.log(res);
      res.forEach((fornecedor: any) => {
        let options = { id: fornecedor.id, value: fornecedor.fornecedor }
        this.fornecedoresOptions.push(options)
      });
      console.log(this.fornecedoresOptions);

    })
  }
  
}
