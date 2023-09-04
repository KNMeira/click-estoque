import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-cadastrar-usuarios',
  templateUrl: './cadastrar-usuarios.component.html',
  styleUrls: ['./cadastrar-usuarios.component.scss']
})
export class CadastrarUsuariosComponent {

  public formUsuario: FormGroup = new FormGroup({
    usuario: new FormControl('', Validators.required),
    cpf: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    celular: new FormControl('', [Validators.required,]),
    senha: new FormControl('', [Validators.required,]),
  })

  constructor(private usuariosService: UsuariosService) {}

  public cadastrar() {
    if(this.formUsuario.valid){
      this.usuariosService.cadastrar(this.formUsuario.value).subscribe((res) => {
        alert(res.msg)
        this.formUsuario.reset();
      }) 
    } else {
       alert('Verifique se todos os campos estão preenchidos')
    }
    
  }
}
