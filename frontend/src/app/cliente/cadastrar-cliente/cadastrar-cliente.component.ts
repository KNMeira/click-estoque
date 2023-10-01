import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.scss']
})
export class CadastrarClienteComponent {
  public formCadastroCliente: FormGroup = new FormGroup ({
    cliente: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    enderecoCliente: new FormControl('', Validators.required),
    emailCliente: new FormControl('', Validators.required),
    celularCliente: new FormControl('', Validators.required)
  })

  public isLoadingCadastrar: boolean = false

  constructor(private clienteService: ClienteService) {}

  public cadastrarCliente(){
    this.isLoadingCadastrar = true
    this.clienteService.saveCliente(this.formCadastroCliente.value).subscribe((res) =>{
      alert(res.msg)
      this.isLoadingCadastrar = false
      this.formCadastroCliente.reset()
    })
  }

}
