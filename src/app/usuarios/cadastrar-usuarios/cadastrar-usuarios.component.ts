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
    cpf: new FormControl('', [Validators.required, Validators.minLength(11)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    celular: new FormControl('', [Validators.required, Validators.minLength(11)]),
    senha: new FormControl('', [Validators.required,]),
  })

  constructor(private usuariosService: UsuariosService) {}

  public teste() {
console.log(this.formUsuario);
console.log(this.formUsuario.controls['usuario'].touched);

    
  }
  public cadastrar() {
    if(this.formUsuario.valid){
      this.usuariosService.cadastrar(this.formUsuario.value).subscribe((res) => {
        console.log(res);
        
        alert(res.msg)
        this.formUsuario.reset();
      }) 
    } else {
       alert('Verifique se todos os campos estão preenchidos')
    }
    
  }

  public cancelar() {
    this.formUsuario.reset();
  }

  public cpfValidation() {
    if (this.formUsuario.get('cpf')?.value.length >= 1 && this.formUsuario.get('cpf')?.value.length < 14) return 'is-invalid'
    if (this.formUsuario.get('cpf')?.value.length >= 14) return 'is-valid'
    return
  }

  public phoneValidation() {
    if (this.formUsuario.get('celular')?.value.length >= 1 && this.formUsuario.get('celular')?.value.length < 14) return 'is-invalid'
    if (this.formUsuario.get('celular')?.value.length >= 14) return 'is-valid'
    return
  }
}