import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class EditarClienteComponent implements OnInit, OnDestroy{

  @Input() editCliente: any;
  @Output() editClienteChange = new EventEmitter<any>();


  //tela
  public isClienteLoaded: boolean = false;
  public loading: boolean = false;

  //botao Editar
  public isLoadingEdit: boolean = false; 

  public msgBusca: string = 'Ultilize o filtro para buscar o ID do cliente que deseja editar';

  public editFormCliente: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}, Validators.required),
    cliente: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    endereco: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    celular: new FormControl('', Validators.required),
  })

  public pesquisarClienteEditar: FormGroup = new FormGroup({
    filtro: new FormControl('', Validators.required)
  })

  constructor(private clienteService: ClienteService) {}
  
  ngOnDestroy(): void {
    this.editCliente = undefined;
    this.editClienteChange.emit(this.editCliente);
  }

  ngOnInit(): void {
    if (this.editCliente != undefined) {
      this.editFormCliente.patchValue(this.editCliente)
      this.isClienteLoaded = true;
    }    
  }

  public pesquisarCliente() {
    if (this.pesquisarClienteEditar.get('filtro')?.value == '' ) {
      alert('Preencha o filtro de busca')
      return;
    }
    this.isClienteLoaded = false;
    this.loading = true;
    const data = {
      id: this.pesquisarClienteEditar.get('filtro')?.value
    }
    this.clienteService.getCliente(data).subscribe((cliente) => {      
      if (cliente[0]) {
        this.editCliente = cliente[0]
        this.editFormCliente.patchValue(this.editCliente);
        this.isClienteLoaded = true;
      } else {
        this.isClienteLoaded = false
        this.msgBusca = 'Nenhum resultado encontrado'
      }      
      this.loading = false;
    })
  }

  public editarCliente() {
    this.isLoadingEdit = true;
    let data = {
      ...this.editFormCliente.value,
      id: this.editFormCliente.get('id')?.value
    }
    
    this.clienteService.editCliente(data).subscribe((res)=> {
    this.isLoadingEdit = false;
      
      alert(res.msg)
    })
  }

  public cancelarEdit(){ 
    this.isClienteLoaded = false;
    this.editCliente = undefined;
    this.pesquisarClienteEditar.reset();
    this.editClienteChange.emit(this.editCliente)
  }

}
