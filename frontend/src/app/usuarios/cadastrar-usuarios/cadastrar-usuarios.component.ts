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
    cpf: new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    celular: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]),
    senha: new FormControl('', [Validators.required,]),
  })

  public isLoadingCadastrar: boolean = false;

  constructor(private usuariosService: UsuariosService) { }

  public cadastrar() {
    this.isLoadingCadastrar = true;

    if (this.formUsuario.valid) {
      this.usuariosService.cadastrar(this.formUsuario.value).subscribe((res) => {
        
        alert(res.msg)
        this.formUsuario.reset();
        this.isLoadingCadastrar = false;
      })
    } else {
      alert('Verifique se todos os campos estão preenchidos')
      this.isLoadingCadastrar = false;

    }

  }

  public cancelar() {
    this.formUsuario.reset();
  }

}