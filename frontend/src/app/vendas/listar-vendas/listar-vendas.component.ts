import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VendasService } from '../vendas.service';

@Component({
  selector: 'app-listar-vendas',
  templateUrl: './listar-vendas.component.html',
  styleUrls: ['./listar-vendas.component.scss']
})
export class ListarVendasComponent {

  public formFiltroVendas: FormGroup = new FormGroup({
    idCliente: new FormControl('', Validators.required),
    data: new FormControl(this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required),
  })
  public vendas: any = [];
  public msgBuscar: string = 'Utilize o filtro para listar as vendas';
  public isVendasLoaded: boolean = false;
  public loading: boolean = false;

  constructor(private datePipe: DatePipe, private vendasService: VendasService) { }

  public getVendasFilter() {
    if (this.formFiltroVendas.valid) {
      this.isVendasLoaded = false;
      this.loading = true;
      this.vendasService.getVendas(this.formFiltroVendas.value).subscribe((res) => {
        this.vendas = res.map((venda: any) => {
          venda.detalheVenda.map((detalhe: any) => {
            detalhe.valor_unitario = detalhe.valor_unitario.replace('$', 'R$')
          })
          return {
            ...venda,
            data_venda: this.datePipe.transform(venda.data_venda, 'dd/MM/yyyy'),
            valor_desconto: venda.valor_desconto.replace('$', 'R$'),
            valor_total: venda.valor_total.replace('$', 'R$'),

          }
        })
        this.loading = false;
        if (this.vendas.length > 0) {
          this.isVendasLoaded = true;
        } else {
          this.msgBuscar = "Nenhum resultado encontrado"
        }
      })
    } else {
      alert('Preencha os dois campos de filtro para buscar')
    }
  }

  public confirmDelete(venda: any) {
    if (confirm(`Tem certeza que deseja deletar a venda ID: ${venda.id_venda} e todos seus registros?`)) {
      this.deleteVenda(venda.id_venda);
    }
  }

  public deleteVenda(id: any) {
    this.vendasService.deleteVenda(id).subscribe((res) => {
      alert(res.msg)
      this.isVendasLoaded = false
      this.getVendasFilter();
      
    })  
  }

}
