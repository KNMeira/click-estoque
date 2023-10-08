import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FornecedoresService } from '../fornecedores.service';

@Component({
  selector: 'app-editar-fornecedores',
  templateUrl: './editar-fornecedores.component.html',
  styleUrls: ['./editar-fornecedores.component.scss']
})
export class EditarFornecedoresComponent implements OnInit, OnDestroy {

  @Input() fornecedorEdit: any;
  @Output() fornecedorEditChange = new EventEmitter<any>();

  public formPesquisarFornecedor: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required])
  })

  public formEditFornecedor: FormGroup = new FormGroup({
    id: new FormControl({ value: '', disabled: true }, [Validators.required]),
    fornecedor: new FormControl('', [Validators.required]),
    cnpj: new FormControl({ value: '', disabled: true }, [Validators.required]),
    endereco: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    celular: new FormControl('', [Validators.required])
  })

  public fornecedor = [];
  public isLoadingSalvar = false;
  public isFornecedorLoaded = false;
  public loading = false;
  public msgBusca = 'Ultilize o filtro para buscar o ID do fornecedor que deseja editar'

  constructor(private fornecedoresService: FornecedoresService) { }

  ngOnInit(): void {
    if (this.fornecedorEdit != undefined) {
      this.formEditFornecedor.patchValue(this.fornecedorEdit)
      this.isFornecedorLoaded = true;
    }
  }

  ngOnDestroy(): void {
    this.fornecedorEdit = undefined;
    this.fornecedorEditChange.emit(this.fornecedorEdit);
  }

  public buscarFornecedor() {
    if (this.formPesquisarFornecedor.get('filtro')?.value == '' || this.formPesquisarFornecedor.get('tipoBusca')?.value == '') {
      alert('Preencha o filtro de busca')
      this.formEditFornecedor.controls['celular'].dirty
      return;
    }
    this.loading = true;
    this.isFornecedorLoaded = false

    this.fornecedoresService.getFornecedor(this.formPesquisarFornecedor.value).subscribe((fornecedor) => {
      if (fornecedor[0]) {
        this.fornecedor = fornecedor[0]
        this.formEditFornecedor.patchValue(this.fornecedor);
        this.isFornecedorLoaded = true;
      } else {
        this.isFornecedorLoaded = false
        this.msgBusca = 'Nenhum resultado encontrado'
        //        alert(`Nenhum resultado encontrado`)
      }
      this.loading = false;

    })
  }

  public editFornecedor() {
    this.isLoadingSalvar = true;
    const data = {
      ...this.formEditFornecedor.value,
      id: this.formEditFornecedor.get('id')?.value,
      cnpj: this.formEditFornecedor.get('cnpj')?.value
    }
    this.fornecedoresService.editFornecedor(data).subscribe((data) => {
      alert(data.msg)
      this.isLoadingSalvar = false;
    })
  }

  public phoneValidation() {
    if (this.formEditFornecedor.controls['celular'].dirty) {
      if (this.formEditFornecedor.get('celular')?.value.length >= 1 && this.formEditFornecedor.get('celular')?.value.length < 14) return 'is-invalid'
      if (this.formEditFornecedor.get('celular')?.value.length >= 14) return 'is-valid'
      return
    }
    return ''
  }

  public cancelarEdicao(){ 
    this.isFornecedorLoaded = false;
    this.fornecedorEdit = undefined;
    this.formPesquisarFornecedor.reset();
    this.fornecedorEditChange.emit(this.fornecedorEdit)
  }
}
