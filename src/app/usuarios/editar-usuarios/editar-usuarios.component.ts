import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.scss']
})
export class EditarUsuariosComponent {

  public user = {}
  public isUserLoaded: boolean = false;
  public msgBusca = 'Ultilize o filtro para buscar o usuário que deseja editar'

  public formBuscar: FormGroup = new FormGroup({
    tipoBusca: new FormControl('', Validators.required),
    filtro: new FormControl('', Validators.required)
  })

  public formEditUsuario: FormGroup = new FormGroup({
    usuario: new FormControl('', Validators.required),
    cpf: new FormControl({ value: '', disabled: true }, [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    celular: new FormControl('', [Validators.required,]),
    senha: new FormControl('', [Validators.required,]),
  })

  constructor(private usuarioService: UsuariosService) { }

  public buscarUsuario() {
    if(this.formBuscar.get('filtro')?.value == '') {
      alert('Preencha o filtro de busca')
      return;
    }

    this.usuarioService.getUsuario(this.formBuscar.value).subscribe((usuario) => {
      if (usuario[0]) {
        this.user = usuario[0]
        this.formEditUsuario.patchValue(this.user);
        this.isUserLoaded = true;
      } else {
        this.isUserLoaded = false
        this.msgBusca = 'Nenhum resultado encontrado'
        //        alert(`Nenhum resultado encontrado`)
      }
    })
  }

  public cancelarEdicao() {
    this.formEditUsuario.reset();
    this.formBuscar.reset();
    this.isUserLoaded = false;
    this.msgBusca = 'Ultilize o filtro para buscar o usuário que deseja editar'


  }

  public salvarEdicao() {
    this.usuarioService.editarUsuario(this.formEditUsuario.value).subscribe((res) => {
      alert(res.msg)
    })

  }

  public changeFiltro() {
    const filtro = this.formBuscar.get('filtro')?.value;
    if(filtro == '') this.isUserLoaded = false;
  }
}
