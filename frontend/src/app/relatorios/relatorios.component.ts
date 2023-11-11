import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { UsuariosService } from '../usuarios/usuarios.service';
import { ClienteService } from '../cliente/cliente.service';
import { EstoqueService } from '../estoque/estoque.service';
import { FornecedoresService } from '../fornecedores/fornecedores.service';
import { DatePipe } from '@angular/common';
import { VendasService } from '../vendas/vendas.service';


@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent {

  public formRelatorio: FormGroup = new FormGroup({
    tipoRelatorio: new FormControl('', Validators.required),
    dataInicio: new FormControl(''),
    dataFim: new FormControl('')
  })

  public objectKeys = Object.keys;
  public objectEntries = Object.entries;
  public table!: any;
  public showTable: boolean = false;

  constructor(private usuariosService: UsuariosService, private clientesService: ClienteService, private estoqueService: EstoqueService, private fornecedoresService: FornecedoresService, private vendasService: VendasService, private datePipe: DatePipe) { }

  public gerarRelatorio() {
    this.showTable = false;
    const tipoRelatorio = this.formRelatorio.get('tipoRelatorio')?.value;
    const dataInicio = this.formRelatorio.get('dataInicio')?.value;
    const dataFim = this.formRelatorio.get('dataFim')?.value;

    if ((tipoRelatorio == 'entradasSaidas' || tipoRelatorio == 'vendas' ) && (dataInicio == '' || dataFim == '')) {
      alert('Preencha os campos de data')
      return
    }

    switch (tipoRelatorio) {
      case 'usuarios':
        this.usuariosService.getAllUsuarios().subscribe((res: any) => {
          this.table = res
          this.showTable = true
        });

        break;

      case 'clientes':
        this.clientesService.getAllClientes().subscribe((res: any) => {
          this.table = res
          this.showTable = true
        });

        break;

      case 'fornecedores':
        this.fornecedoresService.getAllFornecedores().subscribe((res: any) => {
          this.table = res
          this.showTable = true
        });

        break;

      case 'estoque':
        this.estoqueService.getEstoque().subscribe((res: any) => {
          res = res.map((e: any) => {
            return {
              produto: e.peca,
              id: e.id_peca,
              tamanho: e.tamanho,
              ['valor compra']: e.valor_compra.replace('$', ''),
              ['valor venda']: e.valor_venda.replace('$', ''),
              quantidade: e.quantidade,
              fornecedor: e.fornecedor
            }
          })
          this.table = res
          this.showTable = true
        });

        break;

      case 'entradasSaidas':
        this.estoqueService.getMovimentacaoEstoque(this.formRelatorio.value).subscribe((res) => {
          res = res.map((e:any) => {
            return {
              data: this.datePipe.transform(new Date(e.data), 'dd/MM/yyyy'),
              evento: e.evento == 'S' ? 'SAÍDA' : 'ENTRADA',
              produto: e.peca,
              tamanho: e.tamanho.toUpperCase(),
              quantidade: e.qtd,
              fornecedor: e.fornecedor 
            }
          })

          this.table = res
          this.showTable = true
        })

        break;

      case 'vendas':
        this.vendasService.getVendasRelatorio(this.formRelatorio.value).subscribe((res) => {
          res = res.map((e: any) => {
            return {
              data: this.datePipe.transform(new Date(e.to_char), 'dd/MM/yyyy'),
              ['valor total']: e.valor_total.replace('$', ''),
              ['valor desconto']: e.valor_desconto.replace('$', ''),
              cliente: e.cliente
            }
          })
          this.table = res
          this.showTable = true
        })
        break;
      default:
        break;
    }
  }


  public setDarkMode() {
    let isDarkMode = localStorage.getItem('isDarkMode');

    return isDarkMode == 'true' ? 'dark' : '';
  };

  public exportexcel(): void {
    const fileName = `Relatorio_${this.formRelatorio.get('tipoRelatorio')?.value}.xlsx`

    /* pass here the table id */
    let element = document.getElementById('excel-table');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, this.formRelatorio.get('tipoRelatorio')?.value);

    /* save to file */
    XLSX.writeFile(wb, fileName);

  }

  public tipoRelatorioChange() {
    this.showTable = false;
  }
}
