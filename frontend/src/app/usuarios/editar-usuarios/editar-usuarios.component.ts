import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.scss']
})
export class EditarUsuariosComponent implements OnInit, OnDestroy {

  @Input() usuarioEdit: any;
  @Output() usuarioEditChange = new EventEmitter<any>();

  public user = {}
  public isUserLoaded: boolean = false;
  public loading: boolean = false;
  public msgBusca = 'Ultilize o filtro para buscar o usuário que deseja editar'
  public isLoadingSalvar: boolean = false;

  public formBuscar: FormGroup = new FormGroup({
    tipoBusca: new FormControl('usuario', Validators.required),
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


  ngOnInit(): void {
    if (this.usuarioEdit != undefined) {
      this.formEditUsuario.patchValue(this.usuarioEdit)
      this.isUserLoaded= true;
    }
  }

  ngOnDestroy(): void {
    this.usuarioEdit = undefined;
    this.usuarioEditChange.emit(this.usuarioEdit);
  }

  public buscarUsuario() {
    if (this.formBuscar.get('filtro')?.value == '' || this.formBuscar.get('tipoBusca')?.value == '') {
      alert('Preencha o filtro de busca')
      this.formEditUsuario.controls['celular'].dirty
      return;
    }
    this.isUserLoaded = false;
    this.loading = true;
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
      this.loading = false;

    })
  }

  public cancelarEdicao() {
    this.formEditUsuario.reset();
    this.formBuscar.reset();
    this.isUserLoaded = false;
    this.msgBusca = 'Ultilize o filtro para buscar o usuário que deseja editar'
    this.usuarioEdit = undefined;
    this.usuarioEditChange.emit(this.usuarioEdit)
  }

  public salvarEdicao() {
    this.isLoadingSalvar = true;
    this.usuarioService.editarUsuario(this.formEditUsuario.value).subscribe((res) => {
      alert(res.msg)
    this.isLoadingSalvar = false;

    })

  }

  public changeFiltro() {
    const filtro = this.formBuscar.get('filtro')?.value;
    if (filtro == '') this.isUserLoaded = false;
  }

  public phoneValidation() {
    if (this.formEditUsuario.controls['celular'].dirty) {
      if (this.formEditUsuario.get('celular')?.value.length >= 1 && this.formEditUsuario.get('celular')?.value.length < 14) return 'is-invalid'
      if (this.formEditUsuario.get('celular')?.value.length >= 14) return 'is-valid'
      return
    }
    return ''
  }
}
