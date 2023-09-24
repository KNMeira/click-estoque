import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EstoqueService } from '../estoque.service';
import { disableDebugTools } from '@angular/platform-browser';


@Component({
  selector: 'app-cadastro-produtos-estoque',
  templateUrl: './cadastro-produtos-estoque.component.html',
  styleUrls: ['./cadastro-produtos-estoque.component.scss']
})
export class CadastroProdutosEstoqueComponent implements OnInit {

  public formProduto: FormGroup = new FormGroup({
    peca: new FormControl('', Validators.required),
    tamanho: new FormControl('', Validators.required),
    quantidade: new FormControl('', Validators.required),
    id_fornecedor: new FormControl('', Validators.required),
    valor_compra: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    valor_venda: new FormControl('', Validators.required)
  })

  public fornecedoresOptions: any = [];

  constructor(private estoqueService: EstoqueService) { }
  ngOnInit(): void {
    this.getFornecedores()
  }

  public cadastrarProduto() {
    console.log(this.formProduto.value);

    this.estoqueService.saveProduto(this.formProduto.value).subscribe((res) => {
      alert(res.msg)
    });
  }

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

  public validateOnlyNumbers(controlName: string) {

    this.formProduto.patchValue({ [controlName]: this.formProduto.controls[controlName].value });
    debugger
  }

}
