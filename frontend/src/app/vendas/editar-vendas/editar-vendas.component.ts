import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { VendasService } from '../vendas.service';
import { ClienteService } from 'src/app/cliente/cliente.service';
import { EstoqueService } from 'src/app/estoque/estoque.service';

@Component({
  selector: 'app-editar-vendas',
  templateUrl: './editar-vendas.component.html',
  styleUrls: ['./editar-vendas.component.scss']
})
export class EditarVendasComponent {
  @Input() vendaEdit: any;
  @Output() vendaEditChange = new EventEmitter<any>();


  public formVendasEdit: FormGroup = new FormGroup({
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
        idDetalhe: new FormControl('', Validators.required),
      }),
    ]),

    valorDesconto: new FormControl(0),
    valorTotalVenda: new FormControl({ value: '', disabled: true }, Validators.required),
  })

  public formPesquisarVenda: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required])
  })

  public pecas: any = [];

  public isVendaLoaded: boolean = false;
  public isLoadingEdit: boolean = false;
  public isClienteLoaded: boolean = false;
  public loading: boolean = false;
  public loadingCliente: boolean = false;
  public showNoClienteMsg: boolean = false;
  public msgBusca: string = 'Ultilize o filtro para buscar o ID da venda que deseja editar'

  constructor(private vendasService: VendasService, private clienteService: ClienteService, private estoqueService: EstoqueService) { }

  ngOnInit(): void {

    this.estoqueService.getEstoque().subscribe((produtos: any) => {
      produtos.forEach((p: any) => {
        let opt = { id: p.id_peca, value: `${p.id_peca} - ${p.peca} - ${p.tamanho.toUpperCase()} `, valor: p.valor_venda.replace('$', '') }
        this.pecas.push(opt);
      });
    })      

    if (this.vendaEdit != undefined) {
      this.vendaEdit = {
          idCliente: this.vendaEdit.id_cliente,
          valorDesconto: this.vendaEdit.valor_desconto.replace('R$', '').replace(',', ''),
          valorTotalVenda: this.vendaEdit.valor_total.replace('R$', '').replace(',', ''),
          detalheVenda: this.vendaEdit.detalheVenda.map((detalhe:any) => {
            return {
              idPeca: detalhe.id_produto,
              quantidade: detalhe.quantidade,
              idDetalhe: detalhe.id_detalhe,
              valorPeca: detalhe.valor_unitario.replace('R$', '').replace(',', ''),
              valorTotalPeca: detalhe.valor_total.replace('$', '').replace(',', ''),
            }
          })
        }

      this.formVendasEdit.patchValue(this.vendaEdit);
      if (this.Produtos.value.length != this.vendaEdit.detalheVenda.length) {
        if (this.vendaEdit.detalheVenda.length > this.Produtos.value.length) {
          for (let i = this.vendaEdit.detalheVenda.length; i > 1; i--) {
            this.addProduto();
          }
        }
        if (this.Produtos.value.length > this.vendaEdit.detalheVenda.length) {
          for (let i = this.Produtos.value.length; i > this.vendaEdit.detalheVenda.length; i--) {
            this.removeProduto(i - 1);
          }
        }
      }

      this.Produtos.patchValue(this.vendaEdit.detalheVenda);
      this.getCliente();
      this.isVendaLoaded= true;
    }
  }

  ngOnDestroy(): void {
    this.vendaEdit = undefined;
    this.vendaEditChange.emit(this.vendaEdit);
  }

  public buscarVenda() {
    if (this.formPesquisarVenda.get('filtro')?.value == '' || this.formPesquisarVenda.get('tipoBusca')?.value == '') {
      alert('Preencha o filtro de busca')
      return;
    }
    this.formVendasEdit.reset();
    this.loading = true;
    this.isVendaLoaded = false

    this.vendasService.getVenda(this.formPesquisarVenda.value).subscribe((venda: any) => {
      if (venda[0]) {
        this.vendaEdit = {
          idCliente: venda[0].id_cliente,
          valorDesconto: venda[0].valor_desconto.replace('$', '').replace(',', ''),
          valorTotalVenda: venda[0].valor_total.replace('$', '').replace(',', ''),
          detalheVenda: venda[0].detalheVenda.map((detalhe: any) => {
            return {
              idPeca: detalhe.id_produto,
              quantidade: detalhe.quantidade,
              idDetalhe: detalhe.id_detalhe,
              valorPeca: detalhe.valor_unitario.replace('$', '').replace(',', ''),
              valorTotalPeca: detalhe.valor_total.replace('$', '').replace(',', ''),
            }
          })
        }

        this.formVendasEdit.patchValue(this.vendaEdit);
        this.getCliente();
        if (this.Produtos.value.length != this.vendaEdit.detalheVenda.length) {
          if (this.vendaEdit.detalheVenda.length > this.Produtos.value.length) {
            for (let i = this.vendaEdit.detalheVenda.length; i > 1; i--) {
              this.addProduto();
            }
          }
          if (this.Produtos.value.length > this.vendaEdit.detalheVenda.length) {
            for (let i = this.Produtos.value.length; i > this.vendaEdit.detalheVenda.length; i--) {
              this.removeProduto(i - 1);
            }
          }
        }

        this.Produtos.patchValue(this.vendaEdit.detalheVenda);

        this.isVendaLoaded = true;
      } else {
        this.isVendaLoaded = false
        this.msgBusca = 'Nenhum resultado encontrado'
      }
      this.loading = false;

    })
  }

  public cancelarEdit() {
    this.formVendasEdit.reset();
    this.isVendaLoaded = false;
    this.vendaEdit = undefined;
    this.vendaEditChange.emit(this.vendaEdit);
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
    let desconto = Number(this.formVendasEdit.get('valorDesconto')?.value ?? 0);
    let totalVendas = 0;
    for (let i = 0; i < this.Produtos.length; i++) {
      totalVendas = totalVendas + Number(this.Produtos.at(i).get('valorTotalPeca')?.value)
    }

    totalVendas = totalVendas - desconto;
    this.formVendasEdit.get('valorTotalVenda')?.setValue(totalVendas.toFixed(2))
  }

  public editarVenda() {
    this.isLoadingEdit = true;
    const venda = {
      ...this.formVendasEdit.getRawValue(),
      idVenda: this.formPesquisarVenda.get('id')?.value
    };    

    this.vendasService.editVenda(venda).subscribe((res) => {
      alert(res.msg)
      this.isLoadingEdit = false;
    })

  }

  addProduto() {
    this.Produtos.push(
      new FormGroup({
        idPeca: new FormControl(''),
        quantidade: new FormControl('', Validators.required),
        valorPeca: new FormControl({ value: '', disabled: true }, Validators.required),
        valorTotalPeca: new FormControl({ value: '', disabled: true }, Validators.required),
        idDetalhe: new FormControl('', Validators.required),
      }),
    );
  }

  public removeProduto(index: number) {
    this.Produtos.removeAt(index);
    this.calcularTotalVenda();

  }

  public getCliente() {
    const data = {
      id: this.formVendasEdit.get('idCliente')?.value
    }

    if (data.id != '') {
      this.loadingCliente = true;
      this.showNoClienteMsg = false;
      this.isClienteLoaded = false;

      this.clienteService.getCliente(data).subscribe((cliente) => {
        if (cliente.length == 0) {
          this.isClienteLoaded = false;
          this.loadingCliente = false;
          this.showNoClienteMsg = true;
        } else {
          this.formVendasEdit.patchValue(cliente[0]);

          this.isClienteLoaded = true;
          this.showNoClienteMsg = false;
          this.loadingCliente = false;
        }
      })
    }
  }

  get Produtos() {
    return this.formVendasEdit.get('Produtos') as FormArray;
  }

}