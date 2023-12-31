import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.scss']
})
export class ListaClienteComponent implements OnInit {

  public clienteLoaded: boolean = false
  public clientes: any = []
  public formPesquisarCliente: FormGroup = new FormGroup({
    filtro: new FormControl('', Validators.required)
  })

  @Output() editarClick = new EventEmitter<any>();

  constructor(private clienteService: ClienteService) { }
  ngOnInit(): void {
    this.getAllClientes();

    this.formPesquisarCliente.get('filtro')?.valueChanges.subscribe((value) => {
      if (value == '') {
        this.getAllClientes();
      } else {
        this.pesquisarCliente();
      }
    })
  }

  public getAllClientes() {
    this.clienteService.getAllClientes().subscribe(res => {
      this.clientes = res
      this.clienteLoaded = true      
    })
  }

  public pesquisarCliente() {
    let data = this.formPesquisarCliente.get('filtro')?.value

    if (data != '' && data != undefined) {
      this.clienteService.getAllClientes().subscribe((clientes) => {
        this.clientes = clientes.filter((cliente: any) => {
          return cliente.cliente.match(data) || cliente.cpf.match(data) || cliente.endereco.match(data) || cliente.email.match(data) || cliente.celular.match(data)
        })
      })
    }
  }

  public confirmDelete(cliente: any) {
    if(confirm(`Tem certeza que deseja deletar o(a) cliente ${cliente.cliente}?` )) {
      this.deleteCliente(cliente.id)
    } 
  }


  public deleteCliente(idCliente: any) {
    this.clienteService.deleteCliente(idCliente).subscribe((res) => {
      alert(res.msg)
      this.clienteLoaded = false
      this.getAllClientes();
      
    })    
  }

  public editarCliente(cliente:any ) {
    this.editarClick.emit(cliente)
  }
}
