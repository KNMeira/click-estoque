import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.scss']
})
export class ListaClienteComponent implements OnInit{

public clienteLoaded: boolean = false
public clientes:any = []

constructor(private clienteService: ClienteService){}
  ngOnInit(): void {
    this.getAllClientes()
  }

public getAllClientes(){
  this.clienteService.getAllClientes().subscribe(res =>{
    this.clientes = res
    this.clienteLoaded = true
  })
}

}
