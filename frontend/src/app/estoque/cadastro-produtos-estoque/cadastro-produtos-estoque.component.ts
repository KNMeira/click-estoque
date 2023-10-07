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
    valor_compra: new FormControl('', [Validators.required]),
    valor_venda: new FormControl('', Validators.required)
  })

  public fornecedoresOptions: any = [];
  public isLoadingCadastrar: boolean = false;

  constructor(private estoqueService: EstoqueService) { }
  ngOnInit(): void {
    this.getFornecedores()
  }

  public cadastrarProduto() {
    this.isLoadingCadastrar = true;

    this.estoqueService.saveProduto(this.formProduto.value).subscribe((res) => {
      this.isLoadingCadastrar = false;
      alert(res.msg)
    });
  }

  public getFornecedores() {
    this.estoqueService.getFornecedores().subscribe((res) => {
      res.forEach((fornecedor: any) => {
        let options = { id: fornecedor.id, value: fornecedor.fornecedor }
        this.fornecedoresOptions.push(options)
      });

    })
  }

  public validateOnlyNumbers(controlName: string) {

    this.formProduto.patchValue({ [controlName]: this.formProduto.controls[controlName].value });
    debugger
  }

  public logForm() {
    console.log(this.formProduto)
  }
  
}
