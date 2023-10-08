import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EstoqueService } from '../estoque.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lista-estoque',
  templateUrl: './lista-estoque.component.html',
  styleUrls: ['./lista-estoque.component.scss']
})
export class ListaEstoqueComponent implements OnInit {
  @Output() editarClick = new EventEmitter<any>()
  public estoqueLoaded: boolean = false;
  public estoque:any = [];

  public formPesquisarEstoque: FormGroup = new FormGroup({
    filtro: new FormControl('')
  })

  constructor(private estoqueService: EstoqueService) {

  }
  ngOnInit(): void {
    this.getEStoque();

    this.formPesquisarEstoque.get('filtro')?.valueChanges.subscribe((value) => {
      if (value == '') {
        this.getEStoque();
      }
      else {
        this.filterEstoque();
      }


    })
  }

  public getEStoque(){
    this.estoqueService.getEstoque().subscribe(res => {
    this.estoque = res;
    this.estoqueLoaded = true;
      
    })
     
  }

  public filterEstoque(){
    let termoPesquisa = this.formPesquisarEstoque.get('filtro')?.value;
    this.estoqueService.getEstoque().subscribe((estoque: any) => {      
      
      if (termoPesquisa != '' && termoPesquisa != undefined) {
        this.estoque = estoque.filter((produto: any) => {
          return produto.peca.match(termoPesquisa) || produto.id_peca.toString().match(termoPesquisa) || produto.tamanho.match(termoPesquisa) || produto.quantidade.toString().match(termoPesquisa) || produto.valor_compra.match(termoPesquisa) || produto.valor_venda.match(termoPesquisa) || produto.fornecedor.match(termoPesquisa) 
        })
      }
    })  
  }

  public confirmDelete(produto: any) {
    if(confirm(`Tem certeza que deseja deletar o produto ${produto.peca}?` )) {
      this.deleteProduto(produto.id_peca)
    } 
  }


  public deleteProduto(idPeca: any) {
    this.estoqueService.deleteProduto(idPeca).subscribe((res) => {
      alert(res.msg)
      this.estoqueLoaded = false
      this.getEStoque();
      
    })  
  }

  public editarProduto(produto: any) {
    this.editarClick.emit(produto);
  }
}
