import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { VendasService } from '../vendas.service';
import { ClienteService } from 'src/app/cliente/cliente.service';
import { EstoqueService } from 'src/app/estoque/estoque.service';

@Component({
  selector: 'app-cadastrar-vendas',
  templateUrl: './cadastrar-vendas.component.html',
  styleUrls: ['./cadastrar-vendas.component.scss']
})
export class CadastrarVendasComponent implements OnInit {

  public isLoadingCadastrar: boolean = false;

  public formVendas: FormGroup = new FormGroup({
    //Dados Cliente
    idCliente: new FormControl(''),
    cliente: new FormControl({ value: '', disabled: true }),
    cpf: new FormControl({ value: '', disabled: true }),
    celular: new FormControl({ value: '', disabled: true }),
    email: new FormControl({ value: '', disabled: true }),

    //Dados Produto
    Produtos: new FormArray([
      new FormGroup({
        idPeca: new FormControl(''),
        quantidade: new FormControl('', Validators.required),
        valorPeca: new FormControl({ value: '', disabled: true }, Validators.required),
        valorTotalPeca: new FormControl({ value: '', disabled: true }, Validators.required),
      }),
    ]),

    valorDesconto: new FormControl(0),
    valorTotalVenda: new FormControl({ value: '', disabled: true }, Validators.required),
  })

  public isClienteLoaded: boolean = false;
  public showNoClienteMsg: boolean = false;
  public loading: boolean = false;

  public pecas: any = [];

  constructor(private vendasService: VendasService, private clienteService: ClienteService, private estoqueService: EstoqueService) { }

  ngOnInit(): void {

    this.estoqueService.getEstoque().subscribe((produtos: any) => {
      produtos.forEach((p: any) => {
        let opt = { id: p.id_peca, value: `${p.id_peca} - ${p.peca} - ${p.tamanho.toUpperCase()} `, valor: p.valor_venda.replace('$', '') }
        this.pecas.push(opt);
      });
    })
  }

  public setValor(event: any, i: number) {
    let valor = this.pecas.find((x: any) => x.id == event.target.value).valor;
    this.Produtos.at(i).get('valorPeca')?.setValue(valor);

  }

  public calcularTotalProduto(i: number) {
    const qntd = Number(this.Produtos.at(i).get('quantidade')?.value);
    const valorPeca = Number(this.Produtos.at(i).get('valorPeca')?.value);
    let totalPorPeca = valorPeca * qntd;

    this.Produtos.at(i).get('valorTotalPeca')?.setValue(totalPorPeca.toFixed(2));

    this.calcularTotalVenda()
  }

  public calcularTotalVenda() {
    let desconto = Number(this.formVendas.get('valorDesconto')?.value ?? 0);
    let totalVendas = 0;
    for (let i = 0; i < this.Produtos.length; i++) {
      totalVendas = totalVendas + Number(this.Produtos.at(i).get('valorTotalPeca')?.value)
    }

    totalVendas = totalVendas - desconto;
    this.formVendas.get('valorTotalVenda')?.setValue(totalVendas.toFixed(2))
  }

  public cadastrarVenda() {
    this.isLoadingCadastrar = true;
    const venda = this.formVendas.getRawValue();

    this.vendasService.saveVenda(venda).subscribe((res) => {
      alert(res.msg)

      if (res.status == 200) {
        this.formVendas.reset();
        this.formVendas.get('valorDesconto')?.setValue(0);
        for (let i = this.Produtos.length; this.Produtos.length > 1; i--) {
          this.removeProduto(i);
        }

        this.isClienteLoaded = false;
      }

      this.isLoadingCadastrar = false;


    })

  }

  addProduto() {
    this.Produtos.push(
      new FormGroup({
        idPeca: new FormControl(''),
        quantidade: new FormControl('', Validators.required),
        valorPeca: new FormControl({ value: '', disabled: true }, Validators.required),
        valorTotalPeca: new FormControl({ value: '', disabled: true }, Validators.required),
      }),
    );
  }

  public removeProduto(index: number) {
    this.Produtos.removeAt(index);
    this.calcularTotalVenda();

  }

  public getCliente() {
    const data = {
      id: this.formVendas.get('idCliente')?.value
    }

    if (data.id != '') {
      this.loading = true;
      this.showNoClienteMsg = false;
      this.isClienteLoaded = false;

      this.clienteService.getCliente(data).subscribe((cliente) => {
        if (cliente.length == 0) {
          this.isClienteLoaded = false;
          this.loading = false;
          this.showNoClienteMsg = true;
        } else {
          this.formVendas.patchValue(cliente[0]);

          this.isClienteLoaded = true;
          this.showNoClienteMsg = false;
          this.loading = false;
        }
      })
    }
  }

  get Produtos() {
    return this.formVendas.get('Produtos') as FormArray;
  }

}
