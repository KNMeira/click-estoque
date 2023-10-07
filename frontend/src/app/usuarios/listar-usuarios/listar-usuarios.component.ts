import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss']
})
export class ListarUsuariosComponent implements OnInit {

  public usuarios: any = [];
  public usuariosLoaded: boolean = false;

  public formPesquisarUsuario: FormGroup = new FormGroup({
    filtro: new FormControl('')
  })

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.getUsuarios();

    this.formPesquisarUsuario.get('filtro')?.valueChanges.subscribe((value) => {
      if (value == '') {
        this.getUsuarios();
      }
      else {
        this.filterUsuario();
      }


    })
  }
  
  public filterUsuario(){
    let termoPesquisa = this.formPesquisarUsuario.get('filtro')?.value;
    this.usuariosService.getAllUsuarios().subscribe((allUsers: any) => {
      
      if (termoPesquisa != '' && termoPesquisa != undefined) {
        this.usuarios = allUsers.filter((user: any) => {
          return user.email.match(termoPesquisa) || user.usuario.match(termoPesquisa) || user.celular.match(termoPesquisa) || user.cpf.match(termoPesquisa)
        })
      }
    })  
  }

  private getUsuarios() {
    this.usuariosService.getAllUsuarios().subscribe((cadastros) => {
      this.usuarios = cadastros;
      this.usuariosLoaded = true;
    });
  }
}
