import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EstoqueService } from '../estoque.service';


@Component({
  selector: 'app-cadastro-produtos-estoque',
  templateUrl: './cadastro-produtos-estoque.component.html',
  styleUrls: ['./cadastro-produtos-estoque.component.scss']
})
export class CadastroProdutosEstoqueComponent {

  public formProduto: FormGroup = new FormGroup({
    peca: new FormControl('', Validators.required),
    tamanho: new FormControl('', Validators.required),
    quantidade: new FormControl('', Validators.required),
    id_fornecedor: new FormControl('', Validators.required),
    valor_compra: new FormControl('', Validators.required),
    valor_venda: new FormControl('', Validators.required)
  })

  constructor(private estoqueService: EstoqueService) {}

  public cadastrarProduto() {
    this.estoqueService.saveProduto(this.formProduto.value).subscribe((res) => {
      alert(res.msg)
    });
  }

}
