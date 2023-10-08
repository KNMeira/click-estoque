import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FornecedoresService } from '../fornecedores.service';

@Component({
  selector: 'app-cadastrar-fornecedores',
  templateUrl: './cadastrar-fornecedores.component.html',
  styleUrls: ['./cadastrar-fornecedores.component.scss']
})
export class CadastrarFornecedoresComponent {

  public formFornecedores: FormGroup = new FormGroup({
    fornecedor: new FormControl('', Validators.required),
    cnpj: new FormControl('', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]),
    endereco: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    celular: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]),
  })
  public isLoadingCadastrar: boolean = false;

  constructor(private fornecedoresService: FornecedoresService) { }

  public cadastrar() {
    this.isLoadingCadastrar = true;
    this.fornecedoresService.saveFornecedor(this.formFornecedores.value).subscribe((data) => {
      alert(data.msg);
      this.isLoadingCadastrar = false;
    }
    );
  }

  public cancelar() {
    this.formFornecedores.reset();
  }

}
